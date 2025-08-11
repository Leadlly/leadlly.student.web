"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, XCircle, ChevronDown, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import { ScrollArea } from "./scroll-area";
import { Item, SubItem } from "@/helpers/types";

const multiSelectVariants = cva(
  "m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300",
  {
    variants: {
      variant: {
        default:
          "border-foreground/10 text-foreground bg-card hover:bg-card/80",
        secondary:
          "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        inverted: "inverted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface NestedMultiSelectProps
  extends VariantProps<typeof multiSelectVariants> {
  options: Item[];
  onValueChange: (value: Item[]) => void;
  defaultValue: Item[];
  setSelectedValues: React.Dispatch<React.SetStateAction<Item[]>>;
  selectedValues: Item[];
  placeholder?: string;
  animation?: number;
  maxCount?: number;
  asChild?: boolean;
  className?: string;
}

export const NestedMultiSelect = React.forwardRef<
  HTMLButtonElement,
  NestedMultiSelectProps
>(
  (
    {
      options,
      onValueChange,
      variant,
      defaultValue = [],
      selectedValues,
      setSelectedValues,
      placeholder = "Select options",
      animation = 0,
      maxCount = 2,
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    const isTopicSelected = (option: Item) => {
      const parent = selectedValues.find((v) => v._id === option._id);
      if (!parent) return false;
      const parentSubs = parent.subItems ?? [];
      const optionSubs = option.subItems ?? [];
      if (parentSubs.length === 0) return true; // all selected
      return parentSubs.length === optionSubs.length;
    };

    const isSubtopicSelected = (option: Item, subItem: SubItem) => {
      const parent = selectedValues.find((v) => v._id === option._id);
      if (!parent) return false;
      const parentSubs = parent.subItems ?? [];
      if (parentSubs.length === 0) return true; // all selected
      return parentSubs.some((s) => s._id === subItem._id);
    };

    function checkAndRemoveSubItems(
      item: Item,
      newSelectedValue: Item[]
    ): Item[] {
      return newSelectedValue.map((newValue) => {
        if (newValue._id === item._id && newValue.subItems) {
          const matchedItems = newValue.subItems.filter((subItem) => {
            return item.subItems?.some(
              (itemSubItem) => itemSubItem._id === subItem._id
            );
          });

          if (
            matchedItems.length === item.subItems?.length &&
            matchedItems.length === newValue.subItems.length
          ) {
            return { ...newValue, subItems: [] };
          }
        }
        return newValue;
      });
    }

    const handleInputKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
      }
    };

    const toggleOption = (value: Item) => {
      setSelectedValues((prevValues) => {
        const valueIndex = prevValues.findIndex((v) => v._id === value._id);
        const newSelectedValues =
          valueIndex >= 0
            ? prevValues.filter((_, index) => index !== valueIndex)
            : [...prevValues, value];

        const updatedValues = checkAndRemoveSubItems(value, newSelectedValues);

        onValueChange(updatedValues);
        return newSelectedValues;
      });
    };

    const handleClear = () => {
      setSelectedValues([]);
      onValueChange([]);
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    const clearExtraOptions = () => {
      const newSelectedValues = selectedValues.slice(0, maxCount);
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const toggleAll = () => {
      if (selectedValues.length === options.length) {
        handleClear();
      } else {
        const allValues = options.map((item) => ({
          _id: item._id,
          name: item.name,
          subItems: item.subItems,
        }));
        setSelectedValues(allValues);

        const updatedValues = options.map((item) => ({
          _id: item._id,
          name: item.name,
          subItems: [],
        }));
        onValueChange(updatedValues);
        setIsPopoverOpen(false);
      }
    };

    const handleSelectSubTopic = (item: Item, subItem: SubItem) => {
      setSelectedValues((prevValues) => {
        const valueIndex = prevValues.findIndex((v) => v._id === item._id);
        let newSelectedValue: Item[] = [];

        if (valueIndex !== -1) {
          // Update existing value
          const value = {
            ...prevValues[valueIndex],
            subItems: [...(prevValues[valueIndex].subItems || [])],
          };

          const subItemIndex = value.subItems?.findIndex(
            (v) => v._id === subItem._id
          );

          if (subItemIndex !== -1) {
            // Deselect subItem
            value.subItems = value.subItems.filter(
              (_, index) => index !== subItemIndex
            );

            // If there are no more subItems, deselect the entire item
            if (value.subItems.length === 0) {
              newSelectedValue = [
                ...prevValues.slice(0, valueIndex),
                ...prevValues.slice(valueIndex + 1),
              ];
            } else {
              newSelectedValue = [
                ...prevValues.slice(0, valueIndex),
                value,
                ...prevValues.slice(valueIndex + 1),
              ];
            }
          } else if (value.subItems) {
            // Select subItem
            value.subItems = [...(value.subItems || []), subItem];
            newSelectedValue = [
              ...prevValues.slice(0, valueIndex),
              value,
              ...prevValues.slice(valueIndex + 1),
            ];
          }
        } else {
          // Add new value
          newSelectedValue = [
            ...prevValues,
            {
              _id: item._id,
              name: item.name,
              subItems: [subItem],
            },
          ];
        }

        const updatedValues = checkAndRemoveSubItems(item, newSelectedValue);

        onValueChange(updatedValues);
        return newSelectedValue;
      });
    };

    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            onClick={handleTogglePopover}
            className={cn(
              "flex w-full p-1 rounded-md border min-h-10 h-auto items-center justify-between bg-inherit hover:bg-inherit",
              className
            )}
          >
            {selectedValues.length > 0 ? (
              <div className="flex justify-between items-center w-full">
                <div className="max-w-48 w-full flex flex-wrap items-center">
                  {selectedValues.slice(0, maxCount).map((value) => {
                    const option = options?.find((o) => o._id === value._id);

                    return (
                      <Badge
                        key={value._id}
                        className={cn(
                          "max-w-96 w-full text-left",
                          multiSelectVariants({ variant, className })
                        )}
                      >
                        <span className="w-full truncate">{option?.name}</span>
                        <XCircle
                          className="ml-2 h-4 w-4 cursor-pointer"
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleOption(value);
                          }}
                        />
                      </Badge>
                    );
                  })}
                  {selectedValues.length > maxCount && (
                    <Badge
                      className={cn(
                        "bg-transparent text-foreground border-foreground/1 hover:bg-transparent",

                        multiSelectVariants({ variant, className })
                      )}
                      style={{ animationDuration: `${animation}s` }}
                    >
                      {`+ ${selectedValues.length - maxCount} more`}
                      <XCircle
                        className="ml-2 h-4 w-4 cursor-pointer"
                        onClick={(event) => {
                          event.stopPropagation();
                          clearExtraOptions();
                        }}
                      />
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <XIcon
                    className="h-4 mx-2 cursor-pointer text-muted-foreground"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleClear();
                    }}
                  />
                  <Separator
                    orientation="vertical"
                    className="flex min-h-6 h-full"
                  />
                  <ChevronDown className="h-4 mx-2 cursor-pointer text-muted-foreground" />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full mx-auto">
                <span className="text-sm text-muted-foreground mx-3">
                  {placeholder}
                </span>
                <ChevronDown className="h-4 cursor-pointer text-muted-foreground mx-2" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0"
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
        >
          <Command>
            <CommandInput
              placeholder="Search..."
              onKeyDown={handleInputKeyDown}
            />
            <CommandList className="pb-14 custom__scrollbar">
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  key="all"
                  onSelect={toggleAll}
                  style={{ pointerEvents: "auto", opacity: 1 }}
                  className="cursor-pointer border-b py-2"
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                      selectedValues.length === options?.length
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50 [&_svg]:invisible"
                    )}
                  >
                    <CheckIcon className="h-4 w-4" />
                  </div>
                  <span>(Select All)</span>
                </CommandItem>
                {options?.map((option) => {
                  return (
                    <Accordion
                      key={option?._id}
                      type="single"
                      collapsible
                      className="w-full"
                    >
                      <AccordionItem value={option._id} className="w-full">
                        <AccordionTrigger className="py-2">
                          <CommandItem
                            onSelect={() => toggleOption(option)}
                            style={{
                              pointerEvents: "auto",
                              opacity: 1,
                            }}
                            className="cursor-pointer flex-1"
                          >
                            <div
                              className={cn(
                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                isTopicSelected(option)
                                  ? "bg-primary text-primary-foreground"
                                  : "opacity-50 [&_svg]:invisible"
                              )}
                            >
                              <CheckIcon className="h-4 w-4" />
                            </div>

                            <p className="flex-1 text-left">{option?.name}</p>
                          </CommandItem>
                        </AccordionTrigger>
                        <AccordionContent className="pb-0 p-2 bg-primary/10">
                          <ScrollArea>
                            {option.subItems && option.subItems.length > 0 ? (
                              option.subItems.map((subItem) => {
                                return (
                                  <CommandItem
                                    key={subItem._id}
                                    onSelect={() =>
                                      handleSelectSubTopic(option, subItem)
                                    }
                                  >
                                    <div
                                      className={cn(
                                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                        isSubtopicSelected(option, subItem)
                                          ? "bg-primary text-primary-foreground"
                                          : "opacity-50 [&_svg]:invisible"
                                      )}
                                    >
                                      <CheckIcon className="h-4 w-4" />
                                    </div>

                                    <span>{subItem?.name}</span>
                                  </CommandItem>
                                );
                              })
                            ) : (
                              <CommandEmpty>No Subtopic available</CommandEmpty>
                            )}
                          </ScrollArea>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  );
                })}
              </CommandGroup>
              {/* <CommandSeparator /> */}
              <CommandGroup className="fixed inset-x-0 bottom-0 bg-white py-2 border-t">
                <div className="flex items-center justify-between">
                  {selectedValues.length > 0 && (
                    <>
                      <CommandItem
                        onSelect={handleClear}
                        style={{
                          pointerEvents: "auto",
                          opacity: 1,
                        }}
                        className="flex-1 justify-center cursor-pointer"
                      >
                        Clear
                      </CommandItem>
                      <Separator
                        orientation="vertical"
                        className="flex min-h-6 h-full"
                      />
                    </>
                  )}
                  <CommandSeparator />
                  <CommandItem
                    onSelect={() => setIsPopoverOpen(false)}
                    style={{
                      pointerEvents: "auto",
                      opacity: 1,
                    }}
                    className="flex-1 justify-center cursor-pointer"
                  >
                    Close
                  </CommandItem>
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

NestedMultiSelect.displayName = "NestedMultiSelect";
