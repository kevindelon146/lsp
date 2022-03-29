import { FC } from 'react'
import { ScrollBarDiv } from '@lib/components'
import {
  GqlInitialUserData_myOrganizationList,
  GqlInitialUserData_user,
} from '@lib/gqlTypes/lsp'
import { AccountSelectionItem } from './Item'
import { lspAccountType } from './types'
import { Uuid } from '@lib/graphql'
import { useTranslation } from 'react-i18next'

interface IAccountSelectionProps {
  isSideBar?: boolean
  onChange: (orgId?: Uuid) => void
  user: GqlInitialUserData_user
  organizationList: GqlInitialUserData_myOrganizationList[]
  ignoreUser?: boolean
}
export const AccountSelection: FC<IAccountSelectionProps> = (props) => {
  const { t } = useTranslation(`media`)
  return (
    <div className="w-full h-full">
      <ScrollBarDiv className="h-full">
        <div className="text-center text-gray-700 pt-10 lg:text-3xl md:text-2xl sm:text-lg xs:text-lg">
          {t(`please-select-an-account`)}
        </div>
        <div
          className={`flex flex-wrap m-auto my-10 items-center ${
            props.isSideBar ? `w-full` : `w-3/4`
          }`}
        >
          {!props.ignoreUser && (
            <AccountSelectionItem
              isSideBar={props.isSideBar}
              onChange={props.onChange}
              key={props.user.id.uuid}
              name={props.user.firstName}
              icon={`fal fa-user text-gray-700`}
              accountType={lspAccountType.USER}
            />
          )}
          {props.organizationList?.map(
            (item: GqlInitialUserData_myOrganizationList, index: number) => (
              <AccountSelectionItem
                isSideBar={props.isSideBar}
                onChange={props.onChange}
                key={index}
                id={item.id}
                name={item.name}
                icon={`fal fa-users text-gray-700`}
                accountType={lspAccountType.ORGANIZATION}
              />
            ),
          )}
        </div>
      </ScrollBarDiv>
    </div>
  )
}

export * from './types'
