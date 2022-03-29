import { FC } from 'react'
export const ClickableBadge: FC = () => {
  return (
    <button
      type="button"
      className="w-full flex items-center px-4 py-2  text-base rounded-full text-red-600 bg-red-200 hover:bg-red-300"
    >
      Starter
    </button>
  )
}
