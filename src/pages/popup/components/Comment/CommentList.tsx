import Comment from './Comment';
import { useQuery } from '@apollo/client';
import { GET_ALL_COMMENTS } from '@root/utils/graphql/init';

// Define the type for an individual comment
type CommentType = {
    id: string; // Assuming each comment has a unique ID
    profile_id: string;
    content: string;
    platform: string;
};

const CommentList = () => {
    const { loading, error, data } = useQuery(GET_ALL_COMMENTS);
    console.log(data);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data || !data.getComments) return <p>No comments found.</p>;

    return (
        <div>
            {/* {data.getComments.map((comment: CommentType) => (
                <Comment
                    key={comment.id} // Use unique ID as key
                    username={comment.profile_id}
                    commentText={comment.content}
                    platform={comment.platform}
                />
            ))} */}
            <div>hi</div>
        </div>
    );
};

export default CommentList;
