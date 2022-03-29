import { FC } from 'react'
import {
  ILeftSideBarLink,
  SidebarLink,
  SidebarWithGradient,
} from '@lib/components'
import { LEFT_SIDEBAR_LINKS } from '@constants/sidebar'
import { useAuth } from 'oidc-react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@redux/reducers'
import { lspAppRoutes } from '@lib/constants'
import { GqlInitialUserData_myOrganizationList } from '@lib/gqlTypes/lsp'
import { setCurrentOrganization } from '@redux/actions'
import { lsp_FRONTEND_URL } from '@config'

interface LeftSideBarProps {
  isVisible?: boolean | true
}

export const LeftSideBar: FC<LeftSideBarProps> = (props) => {
  const dispatch = useDispatch()
  const auth = useAuth()

  const { user, currentOrganization } = useSelector(
    (state: RootState) => state.userReducer,
  )
  const userName = user?.firstName + ` ` + user?.lastName

  const LinkElement = (link: ILeftSideBarLink) => {
    if (link.route === lspAppRoutes.fileStorage && currentOrganization)
      link = {
        ...link,
        lspath: `${link.route}?orgId=${currentOrganization.id.uuid}`,
      }

    return <SidebarLink key={link.name} link={link} />
  }

  const { myOrganizationList } = useSelector(
    (state: RootState) => state.userReducer,
  )
  const setOrganization = (org: GqlInitialUserData_myOrganizationList) => {
    dispatch(setCurrentOrganization(org))
  }

  return (
    <SidebarWithGradient
      myOrganizationList={myOrganizationList}
      setOrganization={setOrganization}
      hidden={props.isVisible}
      signout={() => auth.signOutRedirect(lsp_FRONTEND_URL)}
      userInfo={userName}
    >
      {LEFT_SIDEBAR_LINKS.map((link: ILeftSideBarLink) => LinkElement(link))}
    </SidebarWithGradient>
  )
}
