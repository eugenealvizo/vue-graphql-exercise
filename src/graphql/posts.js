import gql from 'graphql-tag';
 const ALLPOST = gql`
 query  {
    posts {
        data {
          id 
          title
          body
        }
    }
}`;


//  const CREATEPOST = gql`
//     mutation CreatePost($input: CreatePostInput!) {
//         createPost(input: $input) {
//           data {
//               id 
//               title
//               body
//             }
//         }
//       }`;


// const UPDATEPOST = gql`
//     mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {
//         updatePost(id: $id, input: $input) {
//           data {
//             id 
//             title
//             body
//         }
//     }`;

const DELETEPOST = gql`
    mutation DeletePost($id: ID!) {
        deletePost(id: $id)
    }
`;

export {
    ALLPOST,
    // CREATEPOST,
    // UPDATEPOST,
    DELETEPOST
}
  