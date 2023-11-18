import Comment from './Comment'; // Ensure you import the Comment component correctly

//TODO: Get all comments from the server

const data = [
    {
        username: "user1",
        commentText: "This is a comment from user1.",
        avatarSrc: "/placeholder-user.jpg",
    },
    // You can add more comment objects here
];

const CommentList = () => {
    return (
        <div>
            {data.map((comment, index) => (
                <Comment
                    key={index} // It's important to provide a unique key for each child in a list
                    username={comment.username}
                    commentText={comment.commentText}
                    avatarSrc={comment.avatarSrc}
                />
            ))}
        </div>
    );
};

export default CommentList;
