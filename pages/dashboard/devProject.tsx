import { FC } from 'react'
import { DashBoardLayout } from '@components/dashboard/layout'
import { DevProject } from '@components/devProjects'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import { Uuid } from '@lib/graphql'

const DevProjectPage: FC = () => {
  const { user, currentOrganization } = useSelector(
    (state: RootState) => state.userReducer,
  )

  const orgId: Uuid = currentOrganization ? currentOrganization.id : undefined

  if (!user || currentOrganization === undefined) return <></>

  return (
    <DashBoardLayout>
      <DevProject orgId={orgId} />
    </DashBoardLayout>
  )
}
export default DevProjectPage
