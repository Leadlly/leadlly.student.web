import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { capitalizeFirstLetter } from "@/helpers/utils";
import { Edit3, FileText, Trash } from "lucide-react";
import Link from "next/link";

const AccountChaptersList = () => {
  return (
    <Table>
      <TableHeader className="bg-[#f2f2f2]">
        <TableRow className="border-none">
          <TableHead className="lg:w-96 flex items-center gap-2 text-sm lg:text-lg font-medium leading-tight">
            <FileText className="w-5 h-5" />
            List of chapters
          </TableHead>
          <TableHead className="text-sm lg:text-lg text-center font-medium leading-tight">
            Topics covered
          </TableHead>
          <TableHead className="text-sm lg:text-lg text-center font-medium leading-tight">
            Difficulty level
          </TableHead>
          <TableHead className="text-sm lg:text-lg text-center font-medium leading-tight">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableCell className="text-base lg:text-lg leading-tight">
            1. {capitalizeFirstLetter("vectors algebra")}
          </TableCell>
          <TableCell className="text-center text-base lg:text-lg leading-3">
            All
          </TableCell>
          <TableCell className="text-center text-base lg:text-lg leading-3">
            Hard
          </TableCell>
          <TableCell className="grid grid-cols-2 gap-1 lg:gap-3">
            <Link
              href={"#"}
              className="flex items-center justify-center gap-x-1 text-lg font-medium sm:border rounded"
            >
              <Edit3 className="w-3 h-3" />
              <span className="hidden lg:inline-block">Edit</span>
            </Link>

            <Button className="flex items-center justify-center bg-transparent sm:bg-primary/10 hover:bg-primary/20 text-primary text-lg font-medium px-0 lg:px-4">
              <Trash className="w-3 h-3 text-primary lg:hidden" />
              <span className="hidden lg:inline-block">Remove</span>
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default AccountChaptersList;
