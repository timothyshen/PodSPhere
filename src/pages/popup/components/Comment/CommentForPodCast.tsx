import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { UseReactionToggle } from "./UseReactionToggle";
import { UseCommentToggle } from "./UseCommentToggle";

interface CommentProps {
    username: string;
    commentText: string;
    platform: string;
}


const ActionButtons: React.FC = () => (
    <div className="flex gap-2">
        <UseReactionToggle />
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
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M8 16H3v5" />
            </svg>
        </Button>
        <UseCommentToggle publication="publication" />
    </div>
);

const Comment: React.FC<CommentProps> = ({ username, commentText, platform }) => {
    return (
        <div className="grid gap-6 mt-5 ">
            <div className="text-sm flex items-start gap-4">
                <Avatar className="w-10 h-10 border">
                    <AvatarImage alt={`@${username}`} />
                    <AvatarFallback>{username.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1.5">
                    <div className="flex items-center gap-2">
                        <div className="font-semibold">@{username}</div>
                    </div>
                    <div>{commentText}</div>
                    <div className="text-xs text-gray-500">{platform}</div>
                    <ActionButtons />
                </div>
            </div>
        </div>
    );
}

export default Comment;
