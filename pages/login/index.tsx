import { FC } from 'react'
import { LoginForm } from '@components/forms/login-form'
import { useRouter } from 'next/router'
import { parseUrlQueryParam } from '@utils/browser'
import { oidcSignIn } from '@utils/auth'
import { useTranslation } from 'react-i18next'
import { lspAppRoutes, GoogleDeveloperAppId } from '@lib/constants'
import Link from 'next/link'
import SocialButton from '@lib/components/layout/socialButton'
import { toastify } from '@lib/utils'
import { useMutation } from '@apollo/client'
import { SocialProvider } from '@lib/gqlTypes/lsp'
import { GQLM_SOCIAL_LOGIN } from '@lib/entities'
import { GoogleIcon } from '@public/icons/googleIcon'
import {
  GqlMSocialLogin,
  GqlMSocialLoginVariables,
} from '@lib/gqlTypes/lsp/__generated__/GqlMSocialLogin'

const LoginPage: FC = () => {
  const router = useRouter()
  const oidcInteractionUid = parseUrlQueryParam(router, `Iuid`)
  if (process.browser && !oidcInteractionUid) oidcSignIn()

  if (!oidcInteractionUid) {
    router.push(`/404`)
  }
  const { t } = useTranslation(`auth`)

  const [socialLogin] = useMutation<GqlMSocialLogin, GqlMSocialLoginVariables>(
    GQLM_SOCIAL_LOGIN,
    {
      onCompleted({ socialLogin: { auth } }) {
        window.location = auth.returnTo as unknown as Location
      },
      onError(error) {
        toastify.Error(error.message)
      },
    },
  )

  const handleSocialLogin = (user) => {
    socialLogin({
      variables: {
        accessToken: user._token.accessToken,
        socialProvider: SocialProvider.GOOGLE,
        oidcInteractionUid: oidcInteractionUid,
      },
    })
  }

  const handleSocialLoginFailure = (err) => {
    toastify.Error(err.message)
  }

  return (
    <div className="flex flex-wrap w-full h-screen">
      <div className="flex flex-col w-full md:w-1/2 bg-gray-100">
        <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
          <div className="mb-5">
            <p className="text-3xl text-center">{t(`sign-in`)}</p>
          </div>
          <LoginForm oidcInteractionUid={oidcInteractionUid} />
          <div className="pt-5">
            <SocialButton
              icon={
                <div className="mr-3">
                  <GoogleIcon />
                </div>
              }
              label={t(`continue-with-google`)}
              provider="google"
              appId={GoogleDeveloperAppId}
              onLoginSuccess={handleSocialLogin}
              onLoginFailure={handleSocialLoginFailure}
            ></SocialButton>
          </div>
          <div className="py-5 text-center">
            <p>
              {t(`new-here`)} &nbsp;
              <Link
                href={`${lspAppRoutes.register}?Iuid=${oidcInteractionUid}`}
              >
                <span className="font-semibold underline cursor-pointer">
                  {t(`create-account`)}
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="w-1/2 shadow-2xl h-screen md:block">
        <img
          className="hidden object-cover w-full"
          src="/images/backgrounds/lamp.jpg"
        />
      </div>
    </div>
  )
}
export default LoginPage
