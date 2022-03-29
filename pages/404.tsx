import { FC } from 'react'
import Router from 'next/router'
import { useEffect, useState } from 'react'

const Page404: FC = () => {
  const [isNotFound, setIsNotFound] = useState(false)

  useEffect(() => {
    // Your condition that can validate the URL
    const pathname = window.location.pathname

    // Add your conditions here for slug based paths
    const isCorrectPath = false
    if (isCorrectPath) {
      Router.replace(pathname) // Redirect to the right page...
    } else {
      setIsNotFound(true)
    }
  }, [])

  if (isNotFound) return <h1>404 - Page Not Found</h1>
  return null
}

export default Page404
