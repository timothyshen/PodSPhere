// Import necessary modules
import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, gql, useMutation } from '@apollo/client';

// Initialize Apollo Client

const GRAPHQL_API="http://localhost:4000"
const client = new ApolloClient({
  uri: GRAPHQL_API, // Replace with your server's GraphQL endpoint
  cache: new InMemoryCache(),
});

// Define the addComment mutation
const ADD_COMMENT = gql`
  mutation AddComment($input: AddCommentInput!) {
    addComment(input: $input) {
      id
      episode_title
      profile_id
      content
      comment_hash
      platform
    }
  }
`;

// Create a component that uses the useMutation hook
const CommentForm = () => {
  const [addComment] = useMutation(ADD_COMMENT);

  const handleAddComment = async () => {
    try {
      const input = {
        episode_title: 'your_episode_id', // Replace with the actual episode ID
        profile_id: 'user_profile_id', // Replace with the actual user profile ID
        content: 'Your comment content',
        comment_hash: 'your_generated_hash', // Replace with the actual hash
        platform: 'your_platform', // Replace with the actual platform
      };

      // Call the addComment mutation
      const { data } = await addComment({ variables: { input } });
      console.log('New Comment:', data.addComment);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div>
      <button onClick={handleAddComment}>Add Comment</button>
    </div>
  );
};

// Wrap your app with the ApolloProvider
const App = () => (
  <ApolloProvider client={client}>
    <CommentForm />
  </ApolloProvider>
);

export default App;
