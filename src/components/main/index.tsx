import { FC } from 'react'
import Head from 'next/head'
import { lspDocument, BaseDocument } from '@lib/constants'
import { Router } from '@components/router'
import { StyledThemeProvider } from '@definitions/styled-components'
import '../../../locales/i18n'
interface IMainProps {
  children: React.ReactNode
}

export const Main: FC<IMainProps> = (props: IMainProps) => {
  const { children } = props
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,height=device-height"
        />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>{lspDocument.title}</title>
        <link rel="shortcut icon" href={BaseDocument.logo} />
      </Head>
      <StyledThemeProvider>
        <Router>{children}</Router>
      </StyledThemeProvider>
    </>
  )
}
