/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

// ====================================================
// GraphQL mutation operation: GqlMDevProject
// ====================================================

export interface GqlMDevProject_devProject {
  __typename: "DevProject";
  _id: GraphqlScalarType.ObjectId;
  createdAt: GraphqlScalarType.DateTime;
  orgId: GraphqlScalarType.Uuid;
  projectName: string;
  secretKey: string;
  updatedAt: GraphqlScalarType.DateTime;
  userId: GraphqlScalarType.Uuid;
  webhookUrl: string | null;
}

export interface GqlMDevProject {
  devProject: GqlMDevProject_devProject;
}

export interface GqlMDevProjectVariables {
  orgId: GraphqlScalarType.Uuid;
  projectName: string;
  webhookUrl?: string | null;
}
