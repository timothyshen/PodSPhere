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
import { useCreatePost, usePublication } from '@lens-protocol/react-web';
import { useAuth } from '../../context/AuthContext';
import { uploadJson } from '../../lib/upload';
import { ADD_COMMENT } from '@root/utils/graphql/init';
import { useMutation } from '@apollo/client';

const PostModal = () => {
    const [comment, setComment] = useState("");
    const { profileId } = useAuth();



    const { execute, loading, error } = useCreatePost();

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Create post metadata
        const metadata = textOnly({
            content: comment,
        });

        // Publish post
        const result = await execute({
            metadata: await uploadJson(metadata, 'lighthouse'),
        });

        //TODO: Add comment create

        const [addComment] = useMutation(ADD_COMMENT);
        try {
            const input = {
                episode_title: 'your_episode_id', // Replace with actual data
                profile_id: profileId, // Replace with actual data
                content: comment, // Use the state comment
                comment_hash: result, // Generate or obtain this hash
                platform: 'your_platform', // Specify the platform
            };

            // Call the addComment mutation
            const { data } = await addComment({ variables: { input } });
            console.log('New Comment:', data.addComment);
            // Reset comment field and handle any UI updates
            setComment("");
            // Optionally, show success message to user
        } catch (error) {
            console.error('Error adding comment:', error);
            // Handle error in the UI
        }

        // check for failure scenarios
        if (result.isFailure()) {
            console.error(result.error.message);
            return;
        }

        // wait for full completion
        const completion = await result.value.waitForCompletion();

        // check for late failures
        if (completion.isFailure()) {
            console.error(completion.error.message);
            return;
        }

        const post = completion.value;
        console.log(`Post ID: ${post.id}`);
        setComment(""); // Reset comment field after successful submission
    };

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

export default PostModal;
