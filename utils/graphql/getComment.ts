// Import necessary modules
import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';

const GRAPHQL_API="http://localhost:4000"
// Initialize Apollo Client
const client = new ApolloClient({
  uri: GRAPHQL_API, // Replace with your server's GraphQL endpoint
  cache: new InMemoryCache(),
});

// Define the query to get all comments
const GET_ALL_COMMENTS = gql`
  query GetAllComments {
    getComments {
      id
      episode_title
      profile_id
      content
      comment_hash
      platform
    }
  }
`;

// Create a component that uses the useQuery hook
const CommentList = () => {
  const { loading, error, data } = useQuery(GET_ALL_COMMENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const comments = data.getComments;

  return (
    <div>
      <h1>All Comments</h1>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <strong>{comment.profile_id}:</strong> {comment.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Wrap your app with the ApolloProvider
const App = () => (
  <ApolloProvider client={client}>
    <CommentList />
  </ApolloProvider>
);

export default App;
