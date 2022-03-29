/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.
import * as GraphqlScalarType from '@lib/graphql/types'

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum MediaState {
  COMPLETED = "COMPLETED",
  ERROR = "ERROR",
  PROCESSING = "PROCESSING",
}

export enum MediaType {
  AUDIO = "AUDIO",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
}

export enum MediaUploadRequestPurpose {
  lsp_USER_PROFILE_PICTURE = "lsp_USER_PROFILE_PICTURE",
  DEFAULT = "DEFAULT",
}

export enum MediaUploadRequestState {
  COMPLETED = "COMPLETED",
  ERROR = "ERROR",
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  UPLOADED = "UPLOADED",
}

export enum ScriptLanguage {
  html = "html",
}

export enum SocialProvider {
  GOOGLE = "GOOGLE",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  TERMINATED = "TERMINATED",
  UNVERIFIED = "UNVERIFIED",
}

export interface FilterDevProjectArgsDto {
  orgId?: GraphqlScalarType.Uuid | null;
  projectName?: string | null;
  userId?: GraphqlScalarType.Uuid | null;
}

export interface FilterScriptArgsDto {
  language?: ScriptLanguage | null;
  orgId?: GraphqlScalarType.Uuid | null;
  public?: boolean | null;
  title?: string | null;
  userId?: GraphqlScalarType.Uuid | null;
}

export interface PaginationDto {
  limit: number;
  page: number;
}

export interface SearchFileStorageReqDto {
  mediaType?: MediaType | null;
  query?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
