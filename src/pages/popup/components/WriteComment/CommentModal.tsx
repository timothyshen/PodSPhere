import { textOnly } from '@lens-protocol/metadata';
import { never } from '../../lib/utils';
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
import { uploadJson } from '../../lib/upload';

const CommentModal = () => {
    const [comment, setComment] = useState("");
    const { profileId } = useAuth();

    const {
        data: publication,
        error: publicationError,
        loading: publicationLoading,
    } = usePublication({ forId: profileId });

    const { execute, loading, error } = useCreateComment();

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Create post metadata
        const metadata = textOnly({
            content: comment,
        });

        // Publish post
        const result = await execute({
            commentOn: publication?.id ?? never('publication is not loaded'),
            metadata: await uploadJson(metadata, 'lighthouse'),
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
            console.error(completion.error.message);
            return;
        }

        const post = completion.value;
        console.log(`Post ID: ${post.id}`);
        setComment(""); // Reset comment field after successful submission
    };

    if (publicationLoading) return <div>Loading...</div>;
    if (publicationError) return <div>Error: {publicationError.message}</div>;

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
