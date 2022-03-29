/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

// ====================================================
// GraphQL mutation operation: GqlMDeleteScript
// ====================================================

export interface GqlMDeleteScript_deleteScript {
  __typename: "MutationResponseDto";
  message: string | null;
  success: boolean;
}

export interface GqlMDeleteScript {
  deleteScript: GqlMDeleteScript_deleteScript;
}

export interface GqlMDeleteScriptVariables {
  _id: GraphqlScalarType.ObjectId;
}
