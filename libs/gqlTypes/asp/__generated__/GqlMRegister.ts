/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

import { UserStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: GqlMRegister
// ====================================================

export interface GqlMRegister_register_auth {
  __typename: "AuthResponseDto";
  returnTo: string;
  success: boolean;
}

export interface GqlMRegister_register_user_organizations_users_organizations {
  __typename: "OrganizationDto";
  createdAt: GraphqlScalarType.DateTime;
  id: GraphqlScalarType.Uuid;
  name: string;
  updatedAt: GraphqlScalarType.DateTime;
}

export interface GqlMRegister_register_user_organizations_users {
  __typename: "UserDto";
  email: string;
  firstName: string;
  id: GraphqlScalarType.Uuid;
  lastName: string;
  organizations: (GqlMRegister_register_user_organizations_users_organizations | null)[] | null;
  status: UserStatus;
}

export interface GqlMRegister_register_user_organizations {
  __typename: "OrganizationDto";
  createdAt: GraphqlScalarType.DateTime;
  id: GraphqlScalarType.Uuid;
  name: string;
  updatedAt: GraphqlScalarType.DateTime;
  users: (GqlMRegister_register_user_organizations_users | null)[] | null;
}

export interface GqlMRegister_register_user {
  __typename: "UserDto";
  email: string;
  firstName: string;
  id: GraphqlScalarType.Uuid;
  lastName: string;
  organizations: (GqlMRegister_register_user_organizations | null)[] | null;
  status: UserStatus;
}

export interface GqlMRegister_register {
  __typename: "AuthorizeResponseDto";
  auth: GqlMRegister_register_auth;
  user: GqlMRegister_register_user;
}

export interface GqlMRegister {
  register: GqlMRegister_register;
}

export interface GqlMRegisterVariables {
  email: string;
  firstName: string;
  lastName: string;
  oidcInteractionUid: string;
  password: string;
}
