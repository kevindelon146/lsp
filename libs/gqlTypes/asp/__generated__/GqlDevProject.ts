/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

// ====================================================
// GraphQL query operation: GqlDevProject
// ====================================================

export interface GqlDevProject_devProject {
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

export interface GqlDevProject {
  devProject: GqlDevProject_devProject;
}

export interface GqlDevProjectVariables {
  _id: GraphqlScalarType.ObjectId;
}
