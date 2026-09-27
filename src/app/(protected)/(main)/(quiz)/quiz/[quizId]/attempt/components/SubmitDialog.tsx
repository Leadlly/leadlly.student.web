import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

type Props = { quizId: string };
const SubmitDialog = ({ quizId }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="rounded-xl bg-leadlly px-4 py-2 text-sm font-bold text-white">
        Submit
      </AlertDialogTrigger>
      <AlertDialogContent className="max-md:max-w-56 rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to submit ?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. No changes will be allowed after
            submission.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Link href={`/quiz/${quizId}/report`}>Yes, Submit</Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default SubmitDialog;
