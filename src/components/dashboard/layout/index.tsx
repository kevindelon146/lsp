import { FC, ReactNode, useState } from 'react'
import { SideBarTop, Button } from '@lib/components'
import { BaseDocument } from '@lib/constants'
import { LeftSideBar } from '../left-sidebar'

interface IDashBoardLayoutProps {
  children?: ReactNode
}
export const DashBoardLayout: FC<IDashBoardLayoutProps> = (props) => {
  const [openMenu, setOpenMenu] = useState(false)

  const buttonIcon = (openMenu: boolean) => {
    return openMenu ? (
      <i className={`fal fa-bars fa-lg`} />
    ) : (
      <i className={`fad fa-arrow-from-right fa-lg`} />
    )
  }

  return (
    <>
      <SideBarTop imgSrc={BaseDocument.logo}>
        <Button
          color="gray"
          icon={buttonIcon(openMenu)}
          onClick={() => setOpenMenu(!openMenu)}
        />
      </SideBarTop>
      <div className="flex h-screen">
        <LeftSideBar isVisible={openMenu} />
        <div className="w-full h-full relative overflow-hidden bg-gray-100">
          {props.children}
        </div>
      </div>
    </>
  )
}
