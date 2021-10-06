import gql from 'graphql-tag';
export const ALLUSERS = gql`
    query  {
        users {
            data {
            id 
            name
            username
            email
            }
        }
    }`;
