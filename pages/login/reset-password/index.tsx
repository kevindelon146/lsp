import { FC } from 'react'
import { ResetPasswordForm } from '@components/forms/reset-password'

const LoginPage: FC = () => {
  return (
    <div className="flex flex-wrap w-full h-screen">
      <div className="flex flex-col w-full md:w-1/2">
        <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
          <ResetPasswordForm />
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
