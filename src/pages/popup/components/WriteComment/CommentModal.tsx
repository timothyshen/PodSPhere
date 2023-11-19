import { textOnly } from '@lens-protocol/metadata';
import { never } from '../../lib/utils';
import { useState } from "react";
import {
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogClose,
    DialogTitle,
} from "../ui/dialog"
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Toolbar from "./Toolbar";
import { publicationId, useCreateComment, usePublication } from '@lens-protocol/react-web';
import { uploadJson } from '../../lib/upload';


const CommentModal = ({ publicationText }: { publicationText: string }) => {
    const [comment, setComment] = useState("");

    const {
        data: publication,
        error: publicationError,
        loading: publicationLoading,
    } = usePublication({ forId: publicationId(publicationText) });

    const { execute, loading, error } = useCreateComment();

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Create post metadata
        const metadata = textOnly({
            content: comment,
        });

        console.log("metadata", metadata);

        // Publish post
        const result = await execute({
            commentOn: publication?.id ?? never('publication is not loaded'),
            metadata: await uploadJson(metadata, 'lighthouse'),
        });

        console.log("result", result);
        //TODO: Add comment create



        // check for failure scenarios
        if (result.isFailure()) {
            console.error(result.error.message);
            return;
        }

        // wait for full completion
        const completion = await result.value.waitForCompletion();
        console.log(completion);

        // check for late failures
        if (completion.isFailure()) {
            console.error(completion.error.message);
            return;
        }

        const post = completion.value;
        console.log(`Post ID: ${post.id}`);
        setComment(""); // Reset comment field after successful submission
    };

    if (publicationLoading) return <div>Loading...</div>;

    if (publicationError) return <div>Error! {publicationError.message}</div>;


    return (
        <>
            <DialogContent className="w-[380px]">
                <DialogHeader>
                    <DialogTitle className="text-left">Create Post</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit}>
                    <div className="flex items-left space-x-2 mb-3">
                        <div className="grid flex-1">
                            <Toolbar />
                            <Textarea
                                className='mb-5'
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
