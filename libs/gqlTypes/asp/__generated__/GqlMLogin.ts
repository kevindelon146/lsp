/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

import { UserStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: GqlMLogin
// ====================================================

export interface GqlMLogin_login_auth {
  __typename: "AuthResponseDto";
  returnTo: string;
  success: boolean;
}

export interface GqlMLogin_login_user_organizations_users_organizations {
  __typename: "OrganizationDto";
  createdAt: GraphqlScalarType.DateTime;
  id: GraphqlScalarType.Uuid;
  name: string;
  updatedAt: GraphqlScalarType.DateTime;
}

export interface GqlMLogin_login_user_organizations_users {
  __typename: "UserDto";
  email: string;
  firstName: string;
  id: GraphqlScalarType.Uuid;
  lastName: string;
  organizations: (GqlMLogin_login_user_organizations_users_organizations | null)[] | null;
  status: UserStatus;
}

export interface GqlMLogin_login_user_organizations {
  __typename: "OrganizationDto";
  createdAt: GraphqlScalarType.DateTime;
  id: GraphqlScalarType.Uuid;
  name: string;
  updatedAt: GraphqlScalarType.DateTime;
  users: (GqlMLogin_login_user_organizations_users | null)[] | null;
}

export interface GqlMLogin_login_user {
  __typename: "UserDto";
  email: string;
  firstName: string;
  id: GraphqlScalarType.Uuid;
  lastName: string;
  organizations: (GqlMLogin_login_user_organizations | null)[] | null;
  status: UserStatus;
}

export interface GqlMLogin_login {
  __typename: "AuthorizeResponseDto";
  auth: GqlMLogin_login_auth;
  user: GqlMLogin_login_user;
}

export interface GqlMLogin {
  login: GqlMLogin_login;
}

export interface GqlMLoginVariables {
  email: string;
  oidcInteractionUid: string;
  password: string;
}
