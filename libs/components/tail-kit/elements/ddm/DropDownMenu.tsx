import { FC, useRef, useState } from 'react'
import { HideOnClickOutside } from '@lib/components'

interface Props {
  forceOpen?: boolean
  label?: string
  withDivider?: boolean
  icon?: JSX.Element
  items: IDDMItem[]
  withBackground?: boolean
}

export interface IDDMItem {
  clickHandler?: () => void
  icon?: JSX.Element
  label: string
  desc?: string
  link?: string
}

export const DropDownMenu: FC<Props> = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const openButtonRef = useRef(null)

  const handleClickHandler = (item: IDDMItem) => {
    item.clickHandler()
    setIsOpen(false)
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={` ${
            props.withBackground
              ? `border border-gray-300 bg-white dark:bg-gray-800 shadow-sm`
              : ``
          } flex items-center justify-center w-full rounded-md p-2 text-sm font-medium text-gray-700 dark:text-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-transparent`}
          id="options-menu"
          ref={openButtonRef}
        >
          {props.label}
          {props.icon || (
            <svg
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z" />
            </svg>
          )}
        </button>
      </div>
      <HideOnClickOutside
        show={isOpen}
        handleView={setIsOpen}
        force={props.forceOpen}
        refsIgnored={[openButtonRef]}
      >
        <div className="origin-top-right absolute right-0 w-44 z-30 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
          <div
            className={`py-1 ${
              props.withDivider ? `divide-y divide-gray-100` : ``
            }`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {props.items.map((item: IDDMItem) => {
              return (
                <div
                  key={item.label}
                  onClick={() => handleClickHandler(item)}
                  className={`${
                    item.icon ? `flex items-center` : `block`
                  } block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600`}
                  role="menuitem"
                >
                  {item.icon}
                  <span className="flex flex-col">
                    <span>{item.label}</span>
                    {item.desc && (
                      <span className="text-gray-400 text-xs">{item.desc}</span>
                    )}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </HideOnClickOutside>
    </div>
  )
}
