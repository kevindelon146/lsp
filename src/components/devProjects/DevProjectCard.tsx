import { useLazyQuery } from '@apollo/client'
import { DropDownMenu, IDDMItem, Modal } from '@lib/components'
import { GQL_DEV_PROJECT } from '@lib/entities'
import {
  GqlDevProject,
  GqlDevProjects_devProjects,
  GqlDevProjectVariables,
} from '@lib/gqlTypes/lsp'
import { toastify } from '@lib/utils'
import moment from 'moment'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IDevProjectGridItemProps } from '.'

interface IDevProjectCardProps {
  item: IDevProjectGridItemProps
}

export const DevProjectCard: FC<IDevProjectCardProps> = ({ item }) => {
  const { t } = useTranslation(`developer`)

  const [devProject, setDevProject] = useState<GqlDevProjects_devProjects>()
  const [showDevProjectDetails, setShowDevProjectDetails] =
    useState<boolean>(false)

  const dropdownMenuItems: IDDMItem[] = [
    {
      icon: <i className={`fal fa-pen mr-3`} />,
      label: t(`edit`),
      clickHandler: item.editHandler,
    },
    {
      icon: <i className={`fal fa-trash mr-3`} />,
      label: t(`delete`),
      clickHandler: item.deleteHandler,
    },
  ]

  const [fetchDevProject] = useLazyQuery<GqlDevProject, GqlDevProjectVariables>(
    GQL_DEV_PROJECT,
    {
      fetchPolicy: `cache-and-network`,
      onCompleted(data) {
        setDevProject(data.devProject)
        setShowDevProjectDetails(true)
      },
      onError(error) {
        toastify.Error(error.message)
      },
    },
  )

  return (
    <>
      {showDevProjectDetails && (
        <Modal
          title="Dev Project Details"
          hideModal={() => setShowDevProjectDetails(false)}
        >
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Key
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {devProject &&
                        Object.entries(devProject).map(
                          ([key, value], index) =>
                            key !== `__typename` && (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="text-sm font-medium text-gray-900">
                                      {key}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {key === `userId` || key === `orgId`
                                    ? value.uuid
                                    : value}
                                </td>
                              </tr>
                            ),
                        )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
      <div className="overflow-visible shadow-xl  rounded-lg h-50 w-full cursor-pointer m-auto bg-white">
        <div>
          <div className="relative w-full block h-full">
            <div className="bg-white dark:bg-gray-800 w-full p-4 rounded-lg">
              <div className="grid grid-cols-5 gap-4">
                <div
                  className="col-span-4 flex items-center"
                  onClick={() =>
                    fetchDevProject({
                      variables: {
                        _id: item.item._id,
                      },
                    })
                  }
                >
                  <i className="fal fa-brackets-curly mr-3 text-2xl text-primary" />
                  <p className="text-gray-800 dark:text-white text-xl truncate tracking-tighter">
                    {item.item.projectName}
                  </p>
                </div>
                <div
                  className="text-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <DropDownMenu
                    icon={<i className={`fal fa-ellipsis-v fa-2x`} />}
                    items={dropdownMenuItems}
                  ></DropDownMenu>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mb-3 -m-1.5">
            <p className="text-gray-600 italic mr-7 dark:text-white text-sm mx-1">
              {moment(item.item.createdAt).format(`MMMM Do, YY`)}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
