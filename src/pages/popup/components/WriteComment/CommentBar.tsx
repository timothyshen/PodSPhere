import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Input } from "../ui/input";
import CommentModal from "./CommentModal";
import { Dialog, DialogTrigger } from "../ui/dialog";

const CommentBar = () => {
    return (
        <div className="min-h-[50px] w-full flex justify-around items-center bg-zinc-100 border-b-2 px-[10px]">
            <div className="min-w-[40px] h-10 bg-zinc-300 rounded-full flex items-center justify-center hover:bg-zinc-300 cursor-pointer">
            </div>
            <div className="relative flex items-center w-full ml-[10px]">
                <FontAwesomeIcon icon={faPen} className="absolute left-3 text-gray-500 z-10" />
                <Dialog>
                    <DialogTrigger asChild>
                        <Input className="pl-8 py-1 rounded-[20px]" placeholder="Comment" />
                    </DialogTrigger>
                    <CommentModal />
                </Dialog>
            </div>
        </div>
    );
}


export default CommentBar;