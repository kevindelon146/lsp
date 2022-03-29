import { FC } from 'react'
import { useRouter } from 'next/router'
import { lspAppRoutes } from '@lib/constants'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import { DashBoardLayout } from '@components/dashboard/layout'
import { Scripts } from '@lib/scripts'
import { ObjectId, Uuid } from '@lib/graphql'
import { isValidObjectId } from '@lib/graphql/types/objectId'
import { ParsedUrlQueryInput } from 'querystring'

const ScriptsPage: FC = () => {
  const router = useRouter()
  const args = router.query

  const { user, currentOrganization } = useSelector(
    (state: RootState) => state.userReducer,
  )

  const orgId: Uuid = currentOrganization ? currentOrganization.id : undefined

  const scriptId: ObjectId =
    args && args.scriptId && isValidObjectId(args.scriptId as string)
      ? (args.scriptId as ObjectId)
      : undefined

  const updateUrl = (query: ParsedUrlQueryInput = {}) => {
    router.push(
      {
        pathname: lspAppRoutes.scripts,
        query,
      },
      undefined,
      { shallow: true },
    )
    return true
  }

  const scriptChangeHandler = (_scriptId?: ObjectId): boolean => {
    if (_scriptId) return updateUrl({ scriptId: _scriptId })
    return updateUrl()
  }

  if (!user || currentOrganization === undefined) return <></>

  return (
    <DashBoardLayout>
      <Scripts
        orgId={orgId}
        user={user}
        scriptId={scriptId}
        onScriptChange={scriptChangeHandler}
      />
    </DashBoardLayout>
  )
}
export default ScriptsPage
