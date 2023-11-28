import { textOnly } from '@lens-protocol/metadata';
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
import { useCreatePost } from '@lens-protocol/react-web';
import { uploadJson } from '../../lib/upload';
import { addComment, AddCommentVariables } from '@root/utils/graphql/init';
import { useAuth } from '../../context/AuthContext';


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

        console.log("metadata", metadata);

        // Publish post
        const result = await execute({
            metadata: await uploadJson(metadata, 'irys'),
        });

        console.log("result", result);
        //TODO: Add comment create

        // const variables: AddCommentVariables =
        // {
        //     content: comment,
        //     episode_title: "test",
        //     commentHash: result as unknown as string,
        //     platform: "spotify",
        //     profileId: profileId,
        // }

        // const commentResult = await addComment(variables);
        // console.log("commentResult", commentResult);

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

    return (
        <>
            <DialogContent className="w-[380px]">
                <DialogHeader>
                    <DialogTitle className="text-left">Comment Post</DialogTitle>
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

export default PostModal;
