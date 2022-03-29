import { gql } from '@apollo/client'

export const GQLM_DELETE_DEV_PROJECT = gql`
  mutation GqlMDeleteDevProject($_id: ObjectId!) {
    deleteDevProject(_id: $_id) {
      message
      success
    }
  }
`

export const GQLM_DEV_PROJECT = gql`
  mutation GqlMDevProject(
    $orgId: Uuid!
    $projectName: String!
    $webhookUrl: String
  ) {
    devProject(
      orgId: $orgId
      projectName: $projectName
      webhookUrl: $webhookUrl
    ) {
      _id
      createdAt
      orgId
      projectName
      secretKey
      updatedAt
      userId
      webhookUrl
    }
  }
`

export const GQLM_UPDATE_DEV_PROJECT = gql`
  mutation GqlMUpdateDevProject(
    $_id: ObjectId!
    $projectName: String
    $webhookUrl: String
  ) {
    updateDevProject(
      _id: $_id
      projectName: $projectName
      webhookUrl: $webhookUrl
    ) {
      _id
      createdAt
      orgId
      projectName
      secretKey
      updatedAt
      userId
      webhookUrl
    }
  }
`

export const GQL_DEV_PROJECT = gql`
  query GqlDevProject($_id: ObjectId!) {
    devProject(_id: $_id) {
      _id
      createdAt
      orgId
      projectName
      secretKey
      updatedAt
      userId
      webhookUrl
    }
  }
`

export const GQL_DEV_PROJECTS = gql`
  query GqlDevProjects(
    $filter: FilterDevProjectArgsDto
    $pagination: PaginationDto
  ) {
    devProjects(filter: $filter, pagination: $pagination) {
      _id
      createdAt
      orgId
      projectName
      secretKey
      updatedAt
      userId
      webhookUrl
    }
  }
`
