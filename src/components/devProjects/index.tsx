import React, { useEffect, useState } from 'react'
import {
  BoxGridList,
  Button,
  InputText,
  LayoutHeader,
  Modal,
  ScrollBarDiv,
  Spinner,
} from '@lib/components'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { DevProjectCard } from './DevProjectCard'
import { ObjectId, Uuid } from '@lib/graphql'
import { useLazyQuery, useMutation } from '@apollo/client'

import * as lsp_GQL_TYPES from '@lib/gqlTypes/lsp'
import * as lsp_GQL_ENTITIES from '@lib/entities/lsp'
import { toastify } from '@lib/utils'

export interface IDevProjectGridItemProps {
  item: lsp_GQL_TYPES.GqlDevProjects_devProjects
  editHandler: () => void
  deleteHandler: () => void
}

interface IDevProjectProps {
  orgId: Uuid
}

export const DevProject: React.FC<IDevProjectProps> = (props) => {
  const { t } = useTranslation(`developer`)
  const [showDevProjectModal, setShowDevProjectModal] = useState<boolean>(false)
  const [devProjectTitle, setDevProjectTitle] = useState<string>(``)
  const [devProjectWebhookUrl, setDevProjectWebhookUrl] = useState<string>(``)
  const [modalFor, setModalFor] = useState<string>(``)
  const [devProjectId, setDevProjectId] = useState<ObjectId>()

  const [devProjects, setDevProjects] = useState<
    lsp_GQL_TYPES.GqlDevProjects_devProjects[]
  >([])
  const [searchQuery, setSearchQuery] = useState(``)

  const devProjectsBoxGridItemRenderer = (
    devProjects: lsp_GQL_TYPES.GqlDevProjects_devProjects[],
  ): IDevProjectGridItemProps[] => {
    return devProjects.map((item: lsp_GQL_TYPES.GqlDevProjects_devProjects) => {
      return {
        item,
        deleteHandler: () => {
          deleteDevProject({
            variables: {
              _id: item._id,
            },
          })
          setDevProjectId(item._id)
        },
        editHandler: () => {
          setShowDevProjectModal(true)
          setModalFor(`update`)
          setDevProjectId(item._id)
        },
      }
    })
  }

  const [fetchDevProjects] = useLazyQuery<
    lsp_GQL_TYPES.GqlDevProjects,
    lsp_GQL_TYPES.GqlDevProjectsVariables
  >(lsp_GQL_ENTITIES.GQL_DEV_PROJECTS, {
    fetchPolicy: `cache-and-network`,
    onCompleted(data) {
      setDevProjects(data.devProjects)
    },
    onError(error) {
      toastify.Error(error.message)
    },
  })

  const [createDevProject, { loading }] = useMutation<
    lsp_GQL_TYPES.GqlMDevProject,
    lsp_GQL_TYPES.GqlMDevProjectVariables
  >(lsp_GQL_ENTITIES.GQLM_DEV_PROJECT, {
    onCompleted(data) {
      const oldDevProject = _.cloneDeep(devProjects)
      const updatedDevProject = [data.devProject, ...oldDevProject]
      setDevProjects(updatedDevProject)
      setShowDevProjectModal(false)
      setDevProjectTitle(``)
      setDevProjectWebhookUrl(``)
    },
    onError(error) {
      setShowDevProjectModal(false)
      toastify.Error(error.message)
    },
  })

  const [deleteDevProject] = useMutation<
    lsp_GQL_TYPES.GqlMDeleteDevProject,
    lsp_GQL_TYPES.GqlMDeleteDevProjectVariables
  >(lsp_GQL_ENTITIES.GQLM_DELETE_DEV_PROJECT, {
    onCompleted(data) {
      toastify.Success(`Project deleted!`)
      const updatedDevProjects = _.cloneDeep(devProjects)
      const devProjectIndex = updatedDevProjects.findIndex(
        (item) => item._id === devProjectId,
      )
      updatedDevProjects.splice(devProjectIndex, 1)
      setDevProjects(updatedDevProjects)
    },
    onError(error) {
      toastify.Error(error.message)
    },
  })

  const [updateDevProject] = useMutation<
    lsp_GQL_TYPES.GqlMUpdateDevProject,
    lsp_GQL_TYPES.GqlMUpdateDevProjectVariables
  >(lsp_GQL_ENTITIES.GQLM_UPDATE_DEV_PROJECT, {
    onCompleted(data) {
      const oldDevProject = _.cloneDeep(devProjects)
      const updatedDevProject = oldDevProject.map(
        (item: lsp_GQL_TYPES.GqlMUpdateDevProject_updateDevProject) =>
          item._id === data.updateDevProject._id
            ? (item.projectName = data.updateDevProject.projectName) && item
            : item,
      )

      setDevProjects(updatedDevProject)
      setShowDevProjectModal(false)
      setDevProjectTitle(``)
      setDevProjectWebhookUrl(``)
    },
    onError(error) {
      toastify.Error(error.message)
      setShowDevProjectModal(false)
    },
  })

  const _fetchDevProjects = () => {
    fetchDevProjects({
      variables: {
        filter: {
          projectName: searchQuery || undefined,
          orgId: props.orgId,
        },
      },
    })
  }

  const _createDevProject = () => {
    createDevProject({
      variables: {
        orgId: props.orgId,
        webhookUrl: devProjectWebhookUrl || undefined,
        projectName: devProjectTitle,
      },
    })
  }
  const _updateDevProject = () => {
    updateDevProject({
      variables: {
        _id: devProjectId,
        webhookUrl: devProjectWebhookUrl || undefined,
        projectName: devProjectTitle,
      },
    })
  }

  useEffect(() => {
    searchQuery.length === 0 ? _fetchDevProjects() : null
  }, [searchQuery])

  return (
    <>
      {showDevProjectModal && (
        <Modal
          title={t(modalFor === `create` ? `Create Project` : `Update`)}
          hideModal={() => setShowDevProjectModal(false)}
        >
          <div className="">
            <div className="my-2">
              <div className="text-gray-700 text-base mb-1">
                Project Title:*
              </div>
              <InputText
                placeholder={t(`Emeezo`)}
                onChange={(e) => setDevProjectTitle(e.target.value)}
              />
            </div>
            <div className="my-2">
              <div className="text-gray-700 text-base mb-1">Webhook Url:</div>
              <InputText
                placeholder={`https://some-url`}
                onChange={(e) => setDevProjectWebhookUrl(e.target.value)}
              />
            </div>
            <div className="my-2">
              <Button
                label={t(modalFor === `create` ? `Create` : `Update`)}
                className="w-2"
                isLoading={loading}
                disabled={loading}
                color={`primary`}
                onClick={
                  modalFor === `create` ? _createDevProject : _updateDevProject
                }
              />
            </div>
          </div>
        </Modal>
      )}
      <ScrollBarDiv className="h-full">
        <LayoutHeader
          title={t(`Dev Project`)}
          icon={<i className="fal fa-scroll-old fa-2x text-gray-700" />}
        >
          <div className="flex gap-2">
            <Button
              label={t(`create`)}
              color={`primary`}
              icon={<i className={`fa fa-plus pr-2`} />}
              className="py-2 px-4 flex"
              onClick={() => {
                setModalFor(`create`)
                setShowDevProjectModal(true)
              }}
            />
          </div>
          <InputText
            className="rounded-none"
            name="search"
            type="text"
            placeholder={t(`common:search`)}
            onEnter={_fetchDevProjects}
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            icon={
              loading ? (
                <Spinner />
              ) : (
                <i className="fas fa-search" onClick={_fetchDevProjects} />
              )
            }
          />
          {searchQuery && (
            <div
              className="border-2 bg-white rounded-md text-red-400 cursor-pointer flex items-center"
              onClick={() => {
                setSearchQuery(``)
              }}
            >
              <i className="far fa-times px-3"></i>
            </div>
          )}
        </LayoutHeader>
        <div className="my-2 ">
          <BoxGridList<IDevProjectGridItemProps>
            Card={DevProjectCard}
            list={devProjectsBoxGridItemRenderer(devProjects)}
          />
        </div>
      </ScrollBarDiv>
    </>
  )
}
