import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

interface CommentProps {
    username: string;
    commentText: string;
    avatarSrc: string;
}


const ActionButtons: React.FC = () => (
    <div className="flex gap-2">
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
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
        </Button>
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
    </div>
);

const Comment: React.FC<CommentProps> = ({ username, commentText, avatarSrc }) => {
    return (
        <div className="grid gap-6 mt-5 ">
            <div className="text-sm flex items-start gap-4">
                <Avatar className="w-10 h-10 border">
                    <AvatarImage alt={`@${username}`} src={avatarSrc} />
                    <AvatarFallback>{username.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1.5">
                    <div className="flex items-center gap-2">
                        <div className="font-semibold">@{username}</div>
                    </div>
                    <div>{commentText}</div>
                    <ActionButtons />
                </div>
            </div>
        </div>
    );
}

export default Comment;
