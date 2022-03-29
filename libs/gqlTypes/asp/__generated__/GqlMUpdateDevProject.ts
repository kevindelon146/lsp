/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

// ====================================================
// GraphQL mutation operation: GqlMUpdateDevProject
// ====================================================

export interface GqlMUpdateDevProject_updateDevProject {
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

export interface GqlMUpdateDevProject {
  updateDevProject: GqlMUpdateDevProject_updateDevProject;
}

export interface GqlMUpdateDevProjectVariables {
  _id: GraphqlScalarType.ObjectId;
  projectName?: string | null;
  webhookUrl?: string | null;
}
