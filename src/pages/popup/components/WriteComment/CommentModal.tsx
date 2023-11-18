import { useState, useEffect } from "react";
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogClose,
    DialogTitle,
} from "../ui/dialog"
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Toolbar from "./Toolbar";
import { publicationId, useCreateComment, usePublication } from '@lens-protocol/react-web';
import { useAuth } from '../../context/AuthContext';
import Loading from '../ui/Loading';
import ErrorMessage from '../ui/ErrorMessage';
import toast from 'react-hot-toast';

const CommentModal = () => {
    const [comment, setComment] = useState("");

    const {
        data: publication,
        error: publicationError,
        loading: publicationLoading,
    } = usePublication({ forId: publicationId('0x04-0x0b') });

    const { execute, loading, error } = useCreateComment();

    const onSubmit = async (event) => {
        event.preventDefault();

        // Create post metadata
        const metadata = textOnly({
            content: comment,
        });

        // Publish post
        const result = await execute({
            commentOn: publication?.id ?? never('publication is not loaded'),
            metadata: await uploadJson(metadata),
        });

        //TODO: lighthouse
        //TODO: backend DB

        // Handle response
        if (result.isFailure()) {
            console.error(result.error.message);
            return;
        }

        const completion = await result.value.waitForCompletion();
        if (completion.isFailure()) {
            toast.error(completion.error.message);
            return;
        }

        const post = completion.value;
        toast.success(`Post ID: ${post.id}`);
        setComment(""); // Reset comment field after successful submission
    };

    if (publicationLoading) return <Loading />;
    if (publicationError) return <ErrorMessage error={publicationError} />;

    return (
        <>
            <DialogContent className="w-[380px]">
                <DialogHeader>
                    <DialogTitle className="text-left">Create Post</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit}>
                    <div className="flex items-left space-x-2">
                        <div className="grid flex-1">
                            <Toolbar />
                            <Textarea
                                onChange={(e) => setComment(e.target.value)}
                                value={comment}
                                disabled={loading}
                            />
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="submit" disabled={loading}>
                                Post
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                    {!loading && error && <pre>{error.message}</pre>}
                </form>
            </DialogContent>
        </>
    );
}

export default CommentModal;
