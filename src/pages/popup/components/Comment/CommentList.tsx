import Comment from './Comment';
import { getAllComments } from "@root/utils/graphql/init";
import { useEffect, useState } from 'react';


// Define the type for an individual comment
type CommentType = {
    id: string; // Assuming each comment has a unique ID
    profile_id: string;
    content: string;
    platform: string;
};

const CommentList = () => {
    const [comments, setComments] = useState<CommentType[]>([]);

    useEffect(() => {
        getAllComments().then((data) => {
            console.log("data", data);
            setComments(data.data.getComments);
        })
    }, [])


    return (
        <div>
            {comments && comments.map((comment: CommentType) => (
                <Comment
                    key={comment.id} // Use unique ID as key
                    username={comment.profile_id}
                    commentText={comment.content}
                    platform={comment.platform}
                />
            ))}
        </div>
    );
};

export default CommentList;
