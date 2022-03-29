import React, { FC, useState } from 'react'
import { RegisterForm } from '@components/forms/register-form'
import { useRouter } from 'next/router'
import { parseUrlQueryParam } from '@utils/browser'
import { oidcSignIn } from '@utils/auth'
import { Button } from '@lib/components'
import Link from 'next/link'
import SocialButton from '@lib/components/layout/socialButton'
import { toastify } from '@lib/utils'

import { lspAppRoutes, GoogleDeveloperAppId } from '@lib/constants'
import { useTranslation } from 'react-i18next'
import { GoogleIcon } from '@public/icons/googleIcon'
import { useMutation } from '@apollo/client'
import { GQLM_SOCIAL_LOGIN } from '@lib/entities'
import {
  GqlMSocialLogin,
  GqlMSocialLoginVariables,
} from '@lib/gqlTypes/lsp/__generated__/GqlMSocialLogin'
import { SocialProvider } from '@lib/gqlTypes/lsp'

const RegisterPage: FC = () => {
  const router = useRouter()
  const oidcInteractionUid = parseUrlQueryParam(router, `Iuid`)
  if (process.browser && !oidcInteractionUid) oidcSignIn()

  if (!oidcInteractionUid) {
    router.push(`/404`)
  }
  const { t } = useTranslation(`auth`)
  const [showSocialButton, setShowSocialButton] = useState(false)

  const [socialSignUp] = useMutation<GqlMSocialLogin, GqlMSocialLoginVariables>(
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
    socialSignUp({
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
          <div className="mb-7">
            <div className="text-2xl text-center">
              <h3 className="font-weight-bolder text-dark display5">
                Join the
                <span className="text-secondary font-bold">
                  {` `}
                  Design Revolution!
                </span>
              </h3>
            </div>
          </div>
          {showSocialButton ? (
            <RegisterForm oidcInteractionUid={oidcInteractionUid} />
          ) : (
            <div className="text-center">
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
              <div className="flex items-center my-5">
                <div className="border-2  flex-1" />
                <p className="text-black-400 px-3 ">{t(`or`)}</p>
                <div className="border-2 flex-1" />
              </div>
              <Button
                onClick={() => setShowSocialButton(!showSocialButton)}
                label={t(`continue-with-email`)}
                className="bg-gray-200 w-full py-3.5 text-center font-semibold capitalize rounded-lg bg-gray-700"
              />
            </div>
          )}
          <div className="pt-12 pb-12 text-center">
            <p>
              {t(`have-account`)} &nbsp;
              <Link href={`${lspAppRoutes.login}?Iuid=${oidcInteractionUid}`}>
                <span className="font-semibold underline cursor-pointer">
                  {t(`sign-in`)}
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="w-1/2 shadow-2xl hidden md:block">
        <img
          className="object-cover w-full h-screen"
          src="/images/backgrounds/lamp.jpg"
        />
      </div>
    </div>
  )
}
export default RegisterPage
