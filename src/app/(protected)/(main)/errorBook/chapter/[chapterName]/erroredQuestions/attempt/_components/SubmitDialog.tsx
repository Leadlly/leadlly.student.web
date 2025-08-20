
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
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

type Props = {  onSubmit: () => void };
const SubmitDialog = ({onSubmit}: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="font-normal md:font-semibold px-3 py-1  text-base md:text-xl bg-[#9654F4] text-white rounded-[6px]">
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
            <Button  onClick={onSubmit}>
              Yes, Submit
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default SubmitDialog
// href={`/quiz/${quizId}/report`}