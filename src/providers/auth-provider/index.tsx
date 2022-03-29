import { FC, useEffect } from 'react'
import { AuthProvider as OidcAuthProvider, useAuth } from 'oidc-react'
import { useDispatch } from 'react-redux'
import {
  setCurrentOrganization,
  setMyOrganizationList,
  setUser,
  unsetMyOrganizationList,
  unsetUser,
} from '@redux/actions'
import { lsp_BACKEND_APP_URI } from '@config'
import { useLazyQuery } from '@apollo/client'
import { UserManager } from '@services'
import {
  GqlInitialUserData,
  GqlInitialUserData_myOrganizationList,
} from '@lib/gqlTypes/lsp'
import { GQL_INITIAL_USER_DATA } from '@lib/entities'
import { useRouter } from 'next/router'
import { Uuid } from '@lib/graphql'
import _ from 'lodash'
import {
  lspAppRoutes,
  lspRoutesThatIgnoreOrgIdQueryParam,
} from '@lib/constants'

interface IAuthProviderProps {
  children: React.ReactNode
}

const AuthHandler = ({ children }) => {
  let isUserLoaded = false
  const dispatch = useDispatch()
  const auth = useAuth()

  const router = useRouter()
  const args = router.query
  const orgId: Uuid =
    args && args.orgId ? new Uuid(args.orgId as string) : undefined

  const _getCurrentOrganization = (
    myOrganizationList: GqlInitialUserData_myOrganizationList[],
  ): null | GqlInitialUserData_myOrganizationList => {
    if (myOrganizationList.length === 0) return null

    const org = orgId
      ? myOrganizationList.find((org) => org.id.uuid === orgId.uuid)
      : myOrganizationList[0]

    if (
      !lspRoutesThatIgnoreOrgIdQueryParam.includes(router.route as lspAppRoutes)
    ) {
      delete router.query.orgId
      router.replace(router)
    }
    return org
  }

  const [setInitialUserData] = useLazyQuery<GqlInitialUserData>(
    GQL_INITIAL_USER_DATA,
    {
      onCompleted: (data: GqlInitialUserData) => {
        if (!data) return
        const { user, myOrganizationList } = data
        dispatch(setMyOrganizationList(myOrganizationList))
        dispatch(
          setCurrentOrganization(_getCurrentOrganization(myOrganizationList)),
        )
        dispatch(setUser(user))
      },
    },
  )

  const { events } = auth.userManager

  const renewAccessToken = async () => {
    try {
      await auth.userManager.signinSilent({
        resource: lsp_BACKEND_APP_URI,
      })
    } catch (error) {
      console.error(`Error (Renewing Token):`, error)
      auth.signOut()
    }
  }

  const loadInitialUserData = () => {
    if (auth.userData && isUserLoaded === false) {
      setInitialUserData()
      isUserLoaded = true
    }
  }

  const postLogoutHandler = () => {
    dispatch(unsetUser())
    dispatch(unsetMyOrganizationList())
  }

  const onSilentRenewError = (error) => {
    console.error(`onSilentRenewError`, error)
    auth.signOut()
  }
  const onUserLoaded = loadInitialUserData
  const onAccessTokenExpired = renewAccessToken
  const onAccessTokenExpiring = renewAccessToken
  const onUserUnloaded = postLogoutHandler
  const onUserSignedOut = postLogoutHandler
  const onUserSignedIn = loadInitialUserData

  events.addUserLoaded(onUserLoaded)
  events.addSilentRenewError(onSilentRenewError)
  events.addAccessTokenExpired(onAccessTokenExpired)
  events.addAccessTokenExpiring(onAccessTokenExpiring)
  events.addUserUnloaded(onUserUnloaded)
  events.addUserSignedOut(onUserSignedOut) // This dosent work (make them work and call store.dispatch(unsetUser()) in here)
  events.addUserSignedIn(onUserSignedIn) // TODO: [lsp-32]  This dosent work (make them work and call setUserQuery in here)

  useEffect(loadInitialUserData, [auth.userData])

  return <>{children}</>
}

const AuthProvider: FC<IAuthProviderProps> = ({
  children,
}: IAuthProviderProps) => {
  if (!process.browser) return <>{children}</>
  return (
    <OidcAuthProvider userManager={UserManager} autoSignIn={false}>
      <AuthHandler>{children}</AuthHandler>
    </OidcAuthProvider>
  )
}

export { AuthProvider }
