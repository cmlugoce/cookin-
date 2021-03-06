import {gql} from 'apollo-boost';

export const GET_ALL_RECIPES = gql`

  query{
      getAllRecipes {
          _id
          name
          description
          instructions
          category
          likes
          username
      }
  }

`;

export const GET_RECIPE = gql`

query($_id: ID!){
  getRecipe(_id: $_id){
    _id
    name
    category
    instructions
    description
    createdDate
    likes
  }
}

`;
/* Mutations */

export const ADD_RECIPE = gql`

mutation($name: String!, $description: String!, 
  $category: String!, $instructions: String!,
   $username: String){
  addRecipe(name: $name, 
    description: $description,
    instructions: $instructions,
    category: $category,
    username: $username ){

      _id
      name
      description
      instructions
      category
      likes
      username
      createdDate

  }
}


`;

/* User queries */

export const GET_CURRENT_USER = gql`

 query{

  getCurrentUser {
    username
    joinDate
    email
  }

 }


`;

/* User mutations */

export const SIGNUP_USER = gql`
mutation($username: String!, $email: String!, $password: String!){
    signupUser(username: $username, email: $email, password: $password){
    token
    }
  }


`;

export const SIGNIN_USER = gql`
mutation($username: String!,  $password: String!){
    signinUser(username: $username, password: $password){
    token
    }
  }
`;