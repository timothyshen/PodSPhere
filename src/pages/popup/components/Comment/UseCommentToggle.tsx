import { Dialog, DialogTrigger } from "../ui/dialog";
import CommentModal from "../WriteComment/CommentModal";
import { Button } from '../ui/button'; // Import Button if it's a custom component

type CommentToggleProps = {
    publication: string; // Use the appropriate type for 'publication'
};


export function UseCommentToggle({ publication }: CommentToggleProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost">
                    <svg
                        className=" w-4 h-4"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
                    </svg>
                </Button>
            </DialogTrigger>
            <CommentModal publicationText={publication} />
        </Dialog>
    );
}


