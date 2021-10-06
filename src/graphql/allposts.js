import gql from 'graphql-tag';
export const ALLPOST = gql`
    query  {
        posts {
            data {
            id 
            title
            body
            }
        }
    }`;
