import { deleteUnrevisedTopics } from "@/actions/studyData_actions";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Chapter, Topic, TRevisionProps } from "@/helpers/types";
import { capitalizeFirstLetter } from "@/helpers/utils";
import { FileText, Loader2, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface ChapterData extends Chapter {
  topics: Topic[];
}

const AccountChaptersList = ({
  unrevisedTopics,
}: {
  unrevisedTopics: TRevisionProps[];
}) => {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const mergedChapterData: ChapterData[] | undefined = unrevisedTopics?.reduce(
    (acc: ChapterData[], curr: TRevisionProps) => {
      const existingChapter = acc.find((ch) => ch.name === curr.chapter.name);

      if (existingChapter) {
        existingChapter.topics.push(curr.topic);
      } else {
        acc.push({
          name: curr.chapter.name,
          topics: [curr.topic],
          studiedAt: curr.chapter.studiedAt,
          level: curr.chapter.level,
          overall_efficiency: curr.chapter.overall_efficiency,
          plannerFrequency: curr.chapter.plannerFrequency,
        });
      }

      return acc;
    },
    []
  );

  const handleDeleteChapter = async (data: { chapterName: string }) => {
    setIsDeleting(data.chapterName);

    try {
      const res = await deleteUnrevisedTopics(data);
      toast.success(res.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsDeleting(data.chapterName);
    }
  };

  return (
    <div className="w-full overflow-y-auto">
      <Table>
        <TableHeader className="bg-[#f2f2f2]">
          <TableRow className="border-none">
            <TableHead className="lg:w-96 flex items-center gap-2 text-sm lg:text-lg font-medium leading-tight sticky top-0 z-30">
              <FileText className="w-5 h-5" />
              List of chapters
            </TableHead>
            <TableHead className="text-sm lg:text-lg text-center font-medium leading-tight sticky top-0 z-30">
              Topics covered
            </TableHead>
            <TableHead className="text-sm lg:text-lg text-center font-medium leading-tight sticky top-0 z-30">
              Difficulty level
            </TableHead>
            <TableHead className="text-sm lg:text-lg text-center font-medium leading-tight sticky top-0 z-30">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {mergedChapterData?.map((item, index) => (
            <TableRow key={item.name}>
              <TableCell className="text-base lg:text-lg leading-tight flex items-start gap-2">
                <span>{index + 1}.</span>{" "}
                <span>{capitalizeFirstLetter(item.name)}</span>
              </TableCell>
              <TableCell className="text-center text-base lg:text-lg leading-tight">
                {item.topics.length}
              </TableCell>
              <TableCell className="text-center text-base lg:text-lg leading-tight capitalize">
                {item.level}
              </TableCell>
              <TableCell className="flex items-center justify-center gap-1 lg:gap-3">
                {/* <Link
              href={"#"}
              className="flex items-center justify-center gap-x-1 text-lg font-medium sm:border rounded"
            >
              <Edit3 className="w-3 h-3" />
              <span className="hidden lg:inline-block">Edit</span>
            </Link> */}

                <Button
                  className="flex items-center justify-center w-7 h-7 lg:w-24 lg:h-8 bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium px-0 lg:px-4"
                  onClick={() =>
                    handleDeleteChapter({ chapterName: item.name })
                  }
                  disabled={isDeleting === item.name}
                >
                  {isDeleting === item.name ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <>
                      <Trash className="w-3 h-3 text-primary lg:hidden" />
                      <span className="hidden lg:inline-block">Remove</span>
                    </>
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AccountChaptersList;
