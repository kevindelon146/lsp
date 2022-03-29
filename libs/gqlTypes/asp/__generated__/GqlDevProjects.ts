/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

import { FilterDevProjectArgsDto, PaginationDto } from "./globalTypes";

// ====================================================
// GraphQL query operation: GqlDevProjects
// ====================================================

export interface GqlDevProjects_devProjects {
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

export interface GqlDevProjects {
  devProjects: GqlDevProjects_devProjects[];
}

export interface GqlDevProjectsVariables {
  filter?: FilterDevProjectArgsDto | null;
  pagination?: PaginationDto | null;
}
