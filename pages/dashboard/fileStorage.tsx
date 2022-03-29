import { FC } from 'react'
import { useRouter } from 'next/router'
import { lspAppRoutes } from '@lib/constants'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import { DashBoardLayout } from '@components/dashboard/layout'
import { FileStorage } from '@lib/fileStorage'
import { ObjectId, Uuid } from '@lib/graphql'
import { ParsedUrlQueryInput } from 'querystring'
import { isValidObjectId } from '@lib/graphql/types/objectId'
import { MediaType } from '@lib/gqlTypes/lsp'

const FileStoragePage: FC = () => {
  const router = useRouter()

  const args = router.query

  const { user, currentOrganization, myOrganizationList } = useSelector(
    (state: RootState) => state.userReducer,
  )

  const orgIdFromArg: Uuid =
    args && args.orgId ? new Uuid(args.orgId as string) : undefined

  const orgId: Uuid =
    currentOrganization && orgIdFromArg ? currentOrganization.id : undefined

  const fileStorageId: ObjectId =
    args && args.fileStorageId && isValidObjectId(args.fileStorageId as string)
      ? (args.fileStorageId as ObjectId)
      : undefined

  const showAccountSelection: boolean =
    !args ||
    (args.account !== `user` &&
      orgId === undefined &&
      fileStorageId === undefined)

  const updateFileStorageUrl = (query: ParsedUrlQueryInput = {}) => {
    router.push(
      {
        pathname: lspAppRoutes.fileStorage,
        query,
      },
      undefined,
      { shallow: true },
    )
    return true
  }

  const fileStorageChangeHandler = (
    _fileStorageId?: ObjectId,
    _orgId?: Uuid,
    isRoot = false,
  ): boolean => {
    if (isRoot) return updateFileStorageUrl()
    if (_fileStorageId)
      return updateFileStorageUrl({
        fileStorageId: _fileStorageId,
        orgId: _orgId?.uuid,
      })
    if (_orgId) return updateFileStorageUrl({ orgId: _orgId.uuid })
    return updateFileStorageUrl({ account: `user` })
  }

  const onFileStorageSelect = (mediaType: MediaType, uri: string) => {
    window.open(uri, `_blank`)
  }

  if (!user || showAccountSelection === undefined) return <></>

  return (
    <DashBoardLayout>
      <FileStorage
        showAccountSelection={showAccountSelection}
        orgId={orgId}
        user={user}
        organizationList={myOrganizationList}
        fileStorageId={fileStorageId}
        onFileStorageChange={fileStorageChangeHandler}
        onFileStorageSelect={onFileStorageSelect}
      />
    </DashBoardLayout>
  )
}
export default FileStoragePage
