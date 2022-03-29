import { FC } from 'react'
import Link from 'next/link'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@apollo/client'
import { GQLM_LOGIN } from '@entities'
import { GqlMLogin, GqlMLoginVariables } from '@lib/gqlTypes/lsp'
import { useTranslation } from 'react-i18next'
import { BandeauLineAlert, InputText, Button } from '@lib/components'
import { lspAppRoutes } from '@lib/constants'

interface ILoginFormProps {
  oidcInteractionUid?: string
}

export const LoginForm: FC<ILoginFormProps> = ({ oidcInteractionUid }) => {
  const { t } = useTranslation(`auth`)

  const [signIn, { error, loading }] = useMutation<
    GqlMLogin,
    GqlMLoginVariables
  >(GQLM_LOGIN, {
    onCompleted: ({ login: { auth } }) => {
      window.location = auth.returnTo as unknown as Location
    },
  })

  const formik = useFormik({
    initialValues: {
      email: ``,
      password: ``,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t(`invalid-email-error`))
        .required(t(`email-required`)),
      password: Yup.string()
        .min(7, t(`password-length-error`))
        .required(t(`password-required`)),
    }),
    onSubmit: (values) =>
      signIn({
        variables: {
          ...values,
          oidcInteractionUid,
        },
      }).catch(console.error),
  })

  return (
    <>
      <form
        data-testid="loginUser"
        className="flex flex-col pt-3 md:pt-8"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col pt-4 mb-5">
          <InputText
            label={t(`email`)}
            name="email"
            type="email"
            placeholder={t(`email`)}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={
              formik.touched.email && formik.errors.email && formik.errors.email
            }
            required={formik.touched.email && formik.errors.email && true}
          />
        </div>
        <div className="flex flex-col pt-4 mb-5">
          <InputText
            label={t(`password`)}
            name="password"
            type="password"
            placeholder={t(`password`)}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={
              formik.touched.password &&
              formik.errors.password &&
              formik.errors.password
            }
            required={formik.touched.password && formik.errors.password && true}
          />
        </div>
        {/* <div className=" mt-4 cursor-pointer">
          <Link
            href={`${lspAppRoutes.resetPassword}?Iuid=${oidcInteractionUid}`}
          >
            <span className="text-primary font-size-h6 font-weight-bolder text-hover-primary pt-5 mouseCursor">
              {t(`forgot-password`)}
            </span>
          </Link>
        </div> */}
        <div className="text-center">
          <Button
            label={t(`sign-in`)}
            color="gray"
            submit={true}
            isFat={true}
            isLoading={loading}
            className="mt-5"
          />
        </div>
      </form>
      {error && error.graphQLErrors[0] && (
        <BandeauLineAlert
          title={error.graphQLErrors[0].message}
          borderColor="border-red-600"
          color="text-red-500"
        />
      )}
    </>
  )
}
//
