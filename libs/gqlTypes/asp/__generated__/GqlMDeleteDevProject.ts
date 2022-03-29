/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

// ====================================================
// GraphQL mutation operation: GqlMDeleteDevProject
// ====================================================

export interface GqlMDeleteDevProject_deleteDevProject {
  __typename: "MutationResponseDto";
  message: string | null;
  success: boolean;
}

export interface GqlMDeleteDevProject {
  deleteDevProject: GqlMDeleteDevProject_deleteDevProject;
}

export interface GqlMDeleteDevProjectVariables {
  _id: GraphqlScalarType.ObjectId;
}
