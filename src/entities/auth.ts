import { gql } from '@apollo/client'

// Mutations
export const GQLM_REGISTER = gql`
  mutation GqlMRegister(
    $email: String!
    $firstName: String!
    $lastName: String!
    $oidcInteractionUid: String!
    $password: String!
  ) {
    register(
      email: $email
      firstName: $firstName
      lastName: $lastName
      oidcInteractionUid: $oidcInteractionUid
      password: $password
    ) {
      auth {
        returnTo
        success
      }
      user {
        email
        firstName
        id
        lastName
        organizations {
          createdAt
          id
          name
          updatedAt
          users {
            email
            firstName
            id
            lastName
            organizations {
              createdAt
              id
              name
              updatedAt
            }
            status
          }
        }
        status
      }
    }
  }
`

export const GQLM_LOGIN = gql`
  mutation GqlMLogin(
    $email: String!
    $oidcInteractionUid: String!
    $password: String!
  ) {
    login(
      email: $email
      oidcInteractionUid: $oidcInteractionUid
      password: $password
    ) {
      auth {
        returnTo
        success
      }
      user {
        email
        firstName
        id
        lastName
        organizations {
          createdAt
          id
          name
          updatedAt
          users {
            email
            firstName
            id
            lastName
            organizations {
              createdAt
              id
              name
              updatedAt
            }
            status
          }
        }
        status
      }
    }
  }
`
