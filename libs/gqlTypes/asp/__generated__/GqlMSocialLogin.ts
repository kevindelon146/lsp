/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

import { SocialProvider, UserStatus } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: GqlMSocialLogin
// ====================================================

export interface GqlMSocialLogin_socialLogin_auth {
  __typename: "AuthResponseDto";
  returnTo: string;
  success: boolean;
}

export interface GqlMSocialLogin_socialLogin_user_organizations_users_organizations {
  __typename: "OrganizationDto";
  createdAt: GraphqlScalarType.DateTime;
  id: GraphqlScalarType.Uuid;
  name: string;
  updatedAt: GraphqlScalarType.DateTime;
}

export interface GqlMSocialLogin_socialLogin_user_organizations_users {
  __typename: "UserDto";
  email: string;
  firstName: string;
  id: GraphqlScalarType.Uuid;
  lastName: string;
  organizations: (GqlMSocialLogin_socialLogin_user_organizations_users_organizations | null)[] | null;
  status: UserStatus;
}

export interface GqlMSocialLogin_socialLogin_user_organizations {
  __typename: "OrganizationDto";
  createdAt: GraphqlScalarType.DateTime;
  id: GraphqlScalarType.Uuid;
  name: string;
  updatedAt: GraphqlScalarType.DateTime;
  users: (GqlMSocialLogin_socialLogin_user_organizations_users | null)[] | null;
}

export interface GqlMSocialLogin_socialLogin_user {
  __typename: "UserDto";
  email: string;
  firstName: string;
  id: GraphqlScalarType.Uuid;
  lastName: string;
  organizations: (GqlMSocialLogin_socialLogin_user_organizations | null)[] | null;
  status: UserStatus;
}

export interface GqlMSocialLogin_socialLogin {
  __typename: "AuthorizeResponseDto";
  auth: GqlMSocialLogin_socialLogin_auth;
  user: GqlMSocialLogin_socialLogin_user;
}

export interface GqlMSocialLogin {
  socialLogin: GqlMSocialLogin_socialLogin;
}

export interface GqlMSocialLoginVariables {
  accessToken: string;
  oidcInteractionUid: string;
  socialProvider: SocialProvider;
}
