import {
  FileStorageUpdateType,
  FileStorageItemType,
  IMediaResolution,
  IFileStorageAction,
} from '../types'

import * as lsp_GQL_TYPES from '@lib/gqlTypes/lsp'

import { ObjectId, Uuid } from '@lib/graphql'
import { FetchResult, MutationFunctionOptions } from '@apollo/client'

export const pasteFileStorageItem = (
  fileStorageAction: IFileStorageAction,
  fileStorageId: ObjectId,
  orgId: Uuid,
  copyFileStorage?: (
    options?: MutationFunctionOptions<
      lsp_GQL_TYPES.GqlMCopyFileStorage,
      lsp_GQL_TYPES.GqlMCopyFileStorageVariables
    >,
  ) => Promise<FetchResult>,
  moveFileStorage?: (
    options?: MutationFunctionOptions<
      lsp_GQL_TYPES.GqlMMoveFileStorage,
      lsp_GQL_TYPES.GqlMMoveFileStorageVariables
    >,
  ) => Promise<FetchResult>,
  copyFileStorageFile?: (
    options?: MutationFunctionOptions<
      lsp_GQL_TYPES.GqlMCopyFileStorageFile,
      lsp_GQL_TYPES.GqlMCopyFileStorageFileVariables
    >,
  ) => Promise<FetchResult>,
  moveFileStorageFile?: (
    options?: MutationFunctionOptions<
      lsp_GQL_TYPES.GqlMMoveFileStorageFile,
      lsp_GQL_TYPES.GqlMMoveFileStorageFileVariables
    >,
  ) => Promise<FetchResult>,
): void => {
  switch (fileStorageAction.fileStorageItemType) {
    case FileStorageItemType.FILE_STORAGE:
      switch (fileStorageAction.fileStorageUpdateType) {
        case FileStorageUpdateType.COPY:
          copyFileStorage({
            variables: {
              _id: fileStorageAction.id,
              targetFileStorageId: fileStorageId,
              targetOrgId: orgId,
            },
          })
          break
        case FileStorageUpdateType.MOVE:
          moveFileStorage({
            variables: {
              _id: fileStorageAction.id,
              targetFileStorageId: fileStorageId,
              targetOrgId: orgId,
            },
          })
          break
      }
      break
    case FileStorageItemType.FILE_STORAGE_FILE:
      switch (fileStorageAction.fileStorageUpdateType) {
        case FileStorageUpdateType.COPY:
          copyFileStorageFile({
            variables: {
              _id: fileStorageAction.id,
              targetFileStorageId: fileStorageId,
              targetOrgId: orgId,
            },
          })
          break
        case FileStorageUpdateType.MOVE:
          moveFileStorageFile({
            variables: {
              _id: fileStorageAction.id,
              targetFileStorageId: fileStorageId,
              targetOrgId: orgId,
            },
          })
          break
      }
      break
  }
}

export const getMediaTypeFromFileContentType = (
  file: File,
): lsp_GQL_TYPES.MediaType => {
  const mediaType = file.type?.split(`/`)[0]

  switch (mediaType) {
    case `image`:
      return lsp_GQL_TYPES.MediaType.IMAGE
    case `video`:
      return lsp_GQL_TYPES.MediaType.VIDEO
    case `audio`:
      return lsp_GQL_TYPES.MediaType.AUDIO
  }
}

export const getMediaResolution = (
  mediaList: lsp_GQL_TYPES.GqlFileStorage_fileStorage_files_media_files[],
): IMediaResolution => {
  const mediaResolutions: IMediaResolution = {
    icon: null,
    large: null,
    medium: null,
    original: null,
    thumbnail: null,
    originalSize: 0,
  }
  for (const media of mediaList) {
    const mediaHeight = (
      media.data as lsp_GQL_TYPES.GqlFileStorage_fileStorage_files_media_files_data_MediaFileImageMimeDataDto
    ).height

    if (media.original) {
      mediaResolutions.original = media.s3SignedUrl
      mediaResolutions.originalSize = media.size
    }

    if (mediaHeight <= 100) {
      mediaResolutions.icon = media.s3SignedUrl
      mediaResolutions.large = media.s3SignedUrl
      mediaResolutions.medium = media.s3SignedUrl
      mediaResolutions.thumbnail = media.s3SignedUrl
      mediaResolutions.original = mediaResolutions.original ?? media.s3SignedUrl
      mediaResolutions.originalSize =
        mediaResolutions.originalSize ?? media.size
    }
    if (mediaHeight > 100 && mediaHeight <= 360) {
      mediaResolutions.icon = mediaResolutions.icon ?? media.s3SignedUrl
      mediaResolutions.medium = media.s3SignedUrl
      mediaResolutions.thumbnail = media.s3SignedUrl
      mediaResolutions.original = mediaResolutions.original ?? media.s3SignedUrl
      mediaResolutions.originalSize =
        mediaResolutions.originalSize ?? media.size
    }
    if (mediaHeight > 360 && mediaHeight <= 720) {
      mediaResolutions.icon = mediaResolutions.icon ?? media.s3SignedUrl
      mediaResolutions.large = media.s3SignedUrl
      mediaResolutions.medium = media.s3SignedUrl
      mediaResolutions.thumbnail =
        mediaResolutions.thumbnail ?? media.s3SignedUrl
      mediaResolutions.original = mediaResolutions.original ?? media.s3SignedUrl
      mediaResolutions.originalSize =
        mediaResolutions.originalSize ?? media.size
    }
    if (mediaHeight > 720) {
      mediaResolutions.icon = mediaResolutions.icon ?? media.s3SignedUrl
      mediaResolutions.large = media.s3SignedUrl
      mediaResolutions.medium = mediaResolutions.medium ?? media.s3SignedUrl
      mediaResolutions.thumbnail =
        mediaResolutions.thumbnail ?? media.s3SignedUrl
      mediaResolutions.original = mediaResolutions.original ?? media.s3SignedUrl
      mediaResolutions.originalSize =
        mediaResolutions.originalSize ?? media.size
    }
  }
  return mediaResolutions
}
