import gql from 'graphql-tag';


const ALLUSERS = gql`
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

const CREATEUSERS = gql`
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            id 
            name
            username
            email
        }
    }`;
  

const UPDATEUSERS = gql`
    mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
        updateUser(id: $id, input: $input) {
            id 
            name
            username
            email
        }
    }`;

const DELETEUSERS = gql`
    mutation DeleteUser($id: ID!) {
        deleteUser(id: $id)
    }
`;

export {
    ALLUSERS,
    CREATEUSERS,
    UPDATEUSERS,
    DELETEUSERS
}
