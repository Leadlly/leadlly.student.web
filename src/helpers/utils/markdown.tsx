"use client";

import { Geist_Mono } from "next/font/google";
import { highlight } from "sugar-high";
import Link from "next/link";
import Marked, { ReactRenderer } from "marked-react";
import React, {
  useCallback,
  useMemo,
  useState,
  Fragment,
  useEffect,
  useRef,
} from "react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Check, Copy, WrapText, ArrowLeftRight } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
  isUserMessage?: boolean;
}

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  preload: true,
  display: "swap",
});

const isValidUrl = (str: string) => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};

const generateStableKey = (content: string, index: number): string => {
  let hash = 0;
  const str = `${content.slice(0, 50)}-${index}`;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return `key-${Math.abs(hash)}-${index}`;
};

interface CodeBlockProps {
  language: string | undefined;
  children: string;
  elementKey: string;
}

const CodeBlock: React.FC<CodeBlockProps> = React.memo(
  ({ language, children, elementKey }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [isWrapped, setIsWrapped] = useState(false);

    const [highlightedCode, setHighlightedCode] = useState<string>(() => {
      return highlight(children);
    });

    const lineCount = useMemo(() => children.split("\n").length, [children]);

    useEffect(() => {
      let cancelled = false;

      const performHighlight = async () => {
        if (children.length >= 5000) {
          await new Promise((resolve) => setTimeout(resolve, 0));
        }

        if (!cancelled) {
          setHighlightedCode(highlight(children));
        }
      };

      performHighlight();

      return () => {
        cancelled = true;
      };
    }, [children]);

    const handleCopy = useCallback(async () => {
      try {
        await navigator.clipboard.writeText(children);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (error) {
        console.error("Failed to copy code:", error);
      }
    }, [children]);

    const toggleWrap = useCallback(() => {
      setIsWrapped((prev) => !prev);
    }, []);

    return (
      <div className="group relative my-4 rounded-md border border-border bg-accent overflow-hidden">
        <div className="flex items-center justify-between px-3 py-1.5 bg-accent border-b border-border">
          <div className="flex items-center gap-2">
            {language && (
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {language}
              </span>
            )}
            <span className="text-xs text-muted-foreground">
              {lineCount} lines
            </span>
          </div>

          <div className="flex gap-1">
            <button
              onClick={toggleWrap}
              className={cn(
                "p-1 rounded border border-border bg-background shadow-sm transition-colors",
                isWrapped
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              title={isWrapped ? "Disable wrap" : "Enable wrap"}
            >
              {isWrapped ? (
                <ArrowLeftRight size={12} />
              ) : (
                <WrapText size={12} />
              )}
            </button>
            <button
              onClick={handleCopy}
              className={cn(
                "p-1 rounded border border-border bg-background shadow-sm transition-colors",
                isCopied
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              title={isCopied ? "Copied!" : "Copy code"}
            >
              {isCopied ? <Check size={12} /> : <Copy size={12} />}
            </button>
          </div>
        </div>

        <div className="relative">
          <div
            className={cn(
              "font-mono text-sm leading-relaxed p-2",
              isWrapped && "whitespace-pre-wrap break-words",
              !isWrapped && "whitespace-pre overflow-x-auto"
            )}
            style={{
              fontFamily: geistMono.style.fontFamily,
            }}
            dangerouslySetInnerHTML={{
              __html: highlightedCode,
            }}
          />
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.children === nextProps.children &&
      prevProps.language === nextProps.language &&
      prevProps.elementKey === nextProps.elementKey
    );
  }
);

CodeBlock.displayName = "CodeBlock";

const InlineCode: React.FC<{ code: string; elementKey: string }> = React.memo(
  ({ code }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = useCallback(async () => {
      try {
        await navigator.clipboard.writeText(code);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1500);
      } catch (error) {
        console.error("Failed to copy code:", error);
      }
    }, [code]);

    return (
      <code
        className={cn(
          "inline rounded px-1 py-0.5 font-mono text-[0.9em]",
          "bg-muted/50",
          "text-foreground/85",
          "before:content-none after:content-none",
          "hover:bg-muted/70 transition-colors duration-150 cursor-pointer",
          "align-baseline",
          isCopied && "ring-1 ring-primary/30 bg-primary/5"
        )}
        style={{
          fontFamily: geistMono.style.fontFamily,
          fontSize: "0.85em",
          lineHeight: "inherit",
        }}
        onClick={handleCopy}
        title={isCopied ? "Copied!" : "Click to copy"}
      >
        {code}
      </code>
    );
  }
);

InlineCode.displayName = "InlineCode";

const MarkdownTableWithActions: React.FC<{ children: React.ReactNode }> =
  React.memo(({ children }) => {
    return (
      <div className="relative group my-4 overflow-x-auto">
        <Table className="!border !rounded-lg !m-0">{children}</Table>
      </div>
    );
  });

MarkdownTableWithActions.displayName = "MarkdownTableWithActions";

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  isUserMessage = false,
}) => {
  const elementIndices = useRef({
    paragraph: 0,
    code: 0,
    heading: 0,
    list: 0,
    listItem: 0,
    blockquote: 0,
    table: 0,
    tableRow: 0,
    tableCell: 0,
    link: 0,
    text: 0,
    hr: 0,
  });

  useEffect(() => {
    elementIndices.current = {
      paragraph: 0,
      code: 0,
      heading: 0,
      list: 0,
      listItem: 0,
      blockquote: 0,
      table: 0,
      tableRow: 0,
      tableCell: 0,
      link: 0,
      text: 0,
      hr: 0,
    };
  }, [content]);

  const renderer: Partial<ReactRenderer> = useMemo(
    () => ({
      text(text: string) {
        return text;
      },
      hr() {
        const key = generateStableKey("hr", elementIndices.current.hr++);
        return <hr key={key} className="my-4 border-border" />;
      },
      paragraph(children) {
        const key = generateStableKey(
          String(children).slice(0, 50),
          elementIndices.current.paragraph++
        );

        return (
          <p
            key={key}
            className={cn(
              "my-3 leading-relaxed text-foreground",
              isUserMessage && "!m-0"
            )}
          >
            {children}
          </p>
        );
      },
      code(children, language) {
        const key = generateStableKey(
          String(children).slice(0, 50),
          elementIndices.current.code++
        );
        return (
          <CodeBlock language={language} elementKey={key} key={key}>
            {String(children)}
          </CodeBlock>
        );
      },
      codespan(code) {
        const codeString = typeof code === "string" ? code : String(code || "");
        const key = generateStableKey(
          codeString,
          elementIndices.current.code++
        );
        return <InlineCode key={key} elementKey={key} code={codeString} />;
      },
      link(href, text) {
        const key = generateStableKey(href, elementIndices.current.link++);

        if (href.startsWith("mailto:")) {
          const email = href.replace("mailto:", "");
          return (
            <span key={key} className="break-all">
              {email}
            </span>
          );
        }

        if (isUserMessage) {
          const linkText = typeof text === "string" ? text : href;
          return (
            <span key={key} className="break-all text-primary">
              {linkText}
            </span>
          );
        }

        return (
          <Link
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium"
          >
            {text}
          </Link>
        );
      },
      heading(children, level) {
        const key = generateStableKey(
          String(children).slice(0, 50),
          elementIndices.current.heading++
        );
        const headingTag = `h${level}`;
        const sizeClasses =
          {
            1: "text-xl font-bold mt-4 mb-3",
            2: "text-lg font-semibold mt-3 mb-2",
            3: "text-base font-semibold mt-3 mb-2",
            4: "text-sm font-medium mt-2 mb-1",
            5: "text-sm font-medium mt-2 mb-1",
            6: "text-xs font-medium mt-2 mb-1",
          }[level] || "";

        return React.createElement(
          headingTag,
          {
            key,
            className: `${sizeClasses} text-foreground tracking-tight`,
          },
          children
        );
      },
      list(children, ordered) {
        const key = generateStableKey("list", elementIndices.current.list++);
        const ListTag = ordered ? "ol" : "ul";
        return (
          <ListTag
            key={key}
            className={`my-3 pl-5 space-y-1 text-foreground ${ordered ? "list-decimal" : "list-disc"}`}
          >
            {children}
          </ListTag>
        );
      },
      listItem(children) {
        const key = generateStableKey(
          "listitem",
          elementIndices.current.listItem++
        );
        return (
          <li key={key} className="pl-1 leading-relaxed">
            {children}
          </li>
        );
      },
      blockquote(children) {
        const key = generateStableKey(
          "blockquote",
          elementIndices.current.blockquote++
        );
        return (
          <blockquote
            key={key}
            className="my-4 border-l-4 border-primary/30 pl-4 py-1 text-foreground italic bg-muted/50 rounded-r-md"
          >
            {children}
          </blockquote>
        );
      },
      table(children) {
        const key = generateStableKey("table", elementIndices.current.table++);
        return (
          <MarkdownTableWithActions key={key}>{children}</MarkdownTableWithActions>
        );
      },
      tableRow(children) {
        const key = generateStableKey(
          "tablerow",
          elementIndices.current.tableRow++
        );
        return <TableRow key={key}>{children}</TableRow>;
      },
      tableCell(children, flags) {
        const key = generateStableKey(
          "tablecell",
          elementIndices.current.tableCell++
        );
        const alignClass = flags.align ? `text-${flags.align}` : "text-left";
        const isHeader = flags.header;

        return isHeader ? (
          <TableHead
            key={key}
            className={cn(
              alignClass,
              "border-r border-border last:border-r-0 bg-muted/50 font-semibold !p-2"
            )}
          >
            {children}
          </TableHead>
        ) : (
          <TableCell
            key={key}
            className={cn(
              alignClass,
              "border-r border-border last:border-r-0 !p-2"
            )}
          >
            {children}
          </TableCell>
        );
      },
      tableHeader(children) {
        const key = generateStableKey(
          "tableheader",
          elementIndices.current.table++
        );
        return <TableHeader key={key}>{children}</TableHeader>;
      },
      tableBody(children) {
        const key = generateStableKey(
          "tablebody",
          elementIndices.current.table++
        );
        return <TableBody key={key}>{children}</TableBody>;
      },
    }),
    [isUserMessage]
  );

  return (
    <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none text-foreground">
      <Marked renderer={renderer}>{content}</Marked>
    </div>
  );
};

export const CopyButton = React.memo(({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = React.useCallback(async () => {
    if (!navigator.clipboard) {
      return;
    }
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }, [text]);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      className="h-8 px-2 text-xs rounded-full"
    >
      {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </Button>
  );
});

CopyButton.displayName = "CopyButton";

export { MarkdownRenderer };
