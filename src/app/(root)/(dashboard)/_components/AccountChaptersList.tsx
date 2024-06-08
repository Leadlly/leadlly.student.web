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
import { Edit3, FileText } from "lucide-react";
import Link from "next/link";

const AccountChaptersList = () => {
  return (
    <Table>
      <TableHeader className="bg-[#f2f2f2]">
        <TableRow className="border-none">
          <TableHead className="w-96 flex items-center gap-2 text-lg font-medium leading-3">
            <FileText className="w-5 h-5" />
            List of chapters
          </TableHead>
          <TableHead className="text-lg text-center font-medium leading-3">
            Topics covered
          </TableHead>
          <TableHead className="text-lg text-center font-medium leading-3">
            Difficulty level
          </TableHead>
          <TableHead className="text-lg text-center font-medium leading-3">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableCell className="text-xl leading-3">
            1. {capitalizeFirstLetter("vectors algebra")}
          </TableCell>
          <TableCell className="text-center text-xl leading-3">All</TableCell>
          <TableCell className="text-center text-xl leading-3">Hard</TableCell>
          <TableCell className="grid grid-cols-2 gap-3">
            <Link
              href={"#"}
              className="flex items-center justify-center gap-x-1 text-lg font-medium border rounded">
              <Edit3 className="w-3 h-3" />
              Edit
            </Link>

            <Button className="bg-primary/10 hover:bg-primary/20 text-primary text-lg font-medium">
              Remove
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default AccountChaptersList;
