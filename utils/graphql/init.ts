import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
const GRAPHQL_API = 'http://20.26.200.100:4000/';
// Initialize Apollo Client
const client = new ApolloClient({
  uri: GRAPHQL_API, // Replace with your server's GraphQL endpoint
  cache: new InMemoryCache(),
});

export const ADD_COMMENT = gql`
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

export const GET_ALL_COMMENTS = gql`
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
