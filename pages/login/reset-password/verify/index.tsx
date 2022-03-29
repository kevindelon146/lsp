import { FC } from 'react'
import { ResetPasswordVerifyForm } from '@components/forms/reset-password/verify-form'
import { useRouter } from 'next/router'
import { parseUrlQueryParam } from '@utils/browser'
import { oidcSignIn } from '@utils/auth'
import { lspAppRoutes } from '@lib/constants'

const ResetPasswordVerify: FC = () => {
  const router = useRouter()
  const oidcInteractionUid = parseUrlQueryParam(router, `Iuid`)
  const OTP = parseUrlQueryParam(router, `OTP`)
  const EmailVerificationRequestID = parseUrlQueryParam(
    router,
    `EmailVerificationRequestID`,
  )

  if (!OTP || !EmailVerificationRequestID) {
    router.push(`/404`)
  }

  const onSuccess = () => {
    oidcInteractionUid
      ? router.push(`${lspAppRoutes.login}?Iuid=${oidcInteractionUid}`)
      : oidcSignIn()
  }
  return (
    <div className="flex flex-wrap w-full h-screen">
      <div className="flex flex-col w-full md:w-1/2">
        <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
          <ResetPasswordVerifyForm
            EmailVerificationRequestID={EmailVerificationRequestID}
            OTP={OTP}
            onSuccess={onSuccess}
          />
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
export default ResetPasswordVerify
