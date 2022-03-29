import { Button } from '@lib/components'
import SocialLogin from 'react-social-login'

const SocialButton = ({ children, triggerLogin, triggerLogout, ...props }) => {
  return (
    <Button
      className="bg-white w-full py-2.5 text-center flex inline font-semibold capitalize rounded-lg text-gray-700"
      onClick={triggerLogin}
      {...props}
    >
      {children}
    </Button>
  )
}

export default SocialLogin(SocialButton)
