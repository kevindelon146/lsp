import { ObjectId, Uuid } from '@lib/graphql'
import * as lsp_GQL_TYPES from '@lib/gqlTypes/lsp'
import * as lsp_GQL_ENTITIES from '@lib/entities/lsp'
import { useLazyQuery, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { toastify } from '@lib/utils'
import { useEffect } from 'react'
import {
  BoxGridList,
  Button,
  DropDownMenuFancy,
  InputText,
  ISimpleWithDescriptionPropsListItem,
  LayoutHeader,
  Modal,
  ScrollBarDiv,
  Toggle,
} from '@lib/components'
import { ScriptCard } from './ScriptCard'
import _ from 'lodash'
import { DefaultCodeText, ScriptLoadLimit } from '@lib/constants'
import { ScriptEditor } from './scriptEditor'
import { GqlScript_script, ScriptLanguage } from '@lib/gqlTypes/lsp'
import { useTranslation } from 'react-i18next'

interface IScriptsProps {
  modifiedScripts?: lsp_GQL_TYPES.GqlScripts_scripts
  isMagicTemplateScript?: boolean
  scriptId: ObjectId
  orgId: Uuid
  user: lsp_GQL_TYPES.GqlInitialUserData_user
  onScriptChange?: (scriptId: ObjectId) => boolean
  onAttach?: (script: GqlScript_script) => void
  onScriptUpdate?: (code: string, title: string, _id: ObjectId) => void
}

export interface IScriptsGridItemProps {
  scripts: lsp_GQL_TYPES.GqlScripts_scripts
  copyScript?: () => void
  editScript?: () => void
  deleteScript?: () => void
  onScriptChange?: () => void
  hideOption?: boolean
  removeScript?: () => void
}

export const Scripts: React.FC<IScriptsProps> = (props) => {
  const { t } = useTranslation(`script`)
  const [showScriptModal, setShowScriptModal] = useState<boolean>(false)
  const [script, setScript] = useState<lsp_GQL_TYPES.GqlScripts_scripts>()
  const [scriptId, setScriptId] = useState<ObjectId>(props.scriptId)
  const [deletedScript, setDeletedScript] =
    useState<lsp_GQL_TYPES.GqlScripts_scripts>()
  const [scriptTitle, setScriptTitle] = useState<string>(``)
  const [userScripts, setUserScripts] = useState<
    lsp_GQL_TYPES.GqlScripts_scripts[]
  >([])

  const [scriptType, setScriptType] = useState<boolean>(false)
  const [scriptLanguage, setScriptLanguage] = useState<ScriptLanguage>(
    ScriptLanguage.html,
  )

  const [communityScripts, setCommunityScripts] = useState<
    lsp_GQL_TYPES.GqlScripts_scripts[]
  >([])
  const [userScriptsPage, setUserScriptsPage] = useState<number>(0)
  const [communityScriptsPage, setCommunityScriptsPage] = useState<number>(0)

  const [hideUserLoadMore, setHideUserLoadMore] = useState<boolean>(false)
  const [hideCommunityLoadMore, setHideCommunityLoadMore] =
    useState<boolean>(false)

  const scriptLanguages: ISimpleWithDescriptionPropsListItem[] = [
    {
      label: ScriptLanguage.html.toUpperCase(),
      value: ScriptLanguage.html,
    },
  ]

  const [loadScriptsUser] = useLazyQuery<
    lsp_GQL_TYPES.GqlScripts,
    lsp_GQL_TYPES.GqlScriptsVariables
  >(lsp_GQL_ENTITIES.GQL_SCRIPTS, {
    fetchPolicy: `cache-and-network`,
    onCompleted(data) {
      if (data.scripts.length < ScriptLoadLimit) {
        setHideUserLoadMore(true)
      }
      const newUserScripts = [...userScripts, ...data.scripts]
      setUserScripts(newUserScripts)
      setUserScriptsPage(userScriptsPage + 1)
    },
    onError(error) {
      toastify.Error(error.message)
    },
  })

  const [loadScriptsCommunity] = useLazyQuery<
    lsp_GQL_TYPES.GqlScripts,
    lsp_GQL_TYPES.GqlScriptsVariables
  >(lsp_GQL_ENTITIES.GQL_SCRIPTS, {
    onCompleted(data) {
      if (data.scripts.length < ScriptLoadLimit) {
        setHideCommunityLoadMore(true)
      }
      const newCommunityScripts = [...communityScripts, ...data.scripts]
      setCommunityScripts(newCommunityScripts)
      setCommunityScriptsPage(communityScriptsPage + 1)
    },
    onError(error) {
      toastify.Error(error.message)
    },
  })

  const [deleteScript] = useMutation<
    lsp_GQL_TYPES.GqlMDeleteScript,
    lsp_GQL_TYPES.GqlMDeleteScriptVariables
  >(lsp_GQL_ENTITIES.GQLM_DELETE_SCRIPT, {
    onCompleted(data) {
      toastify.Success(data.deleteScript.message)
      if (data.deleteScript.success) {
        _deleteScript()
      }
    },
    onError(error) {
      toastify.Error(error.message)
    },
  })

  const [cloneScript] = useMutation<
    lsp_GQL_TYPES.GqlMCloneScript,
    lsp_GQL_TYPES.GqlMCloneScriptVariables
  >(lsp_GQL_ENTITIES.GQLM_CLONE_SCRIPT, {
    onCompleted(data) {
      const oldScripts = _.cloneDeep(userScripts)
      const updatedUserScripts = [data.cloneScript, ...oldScripts]
      setUserScripts(updatedUserScripts)
      onScriptChange(data.cloneScript._id)
      toastify.Success(`Cloned`)
    },
    onError(error) {
      toastify.Error(error.message)
    },
  })

  const [createScript, { loading }] = useMutation<
    lsp_GQL_TYPES.GqlMScript,
    lsp_GQL_TYPES.GqlMScriptVariables
  >(lsp_GQL_ENTITIES.GQLM_SCRIPT, {
    onCompleted(data) {
      setShowScriptModal(false)
      onScriptChange(data.script._id)

      const oldUserScript = _.cloneDeep(userScripts)
      const updatedUserScripts = [data.script, ...oldUserScript]
      setUserScripts(updatedUserScripts)

      if (data.script.public) {
        const oldCommunityScript = _.cloneDeep(communityScripts)
        const updatedCommunityScripts = [data.script, ...oldCommunityScript]
        setCommunityScripts(updatedCommunityScripts)
      }
    },
    onError(error) {
      onScriptChange(undefined)

      setShowScriptModal(false)
      toastify.Error(error.message)
    },
  })

  const [loadScript] = useLazyQuery<
    lsp_GQL_TYPES.GqlScript,
    lsp_GQL_TYPES.GqlScriptVariables
  >(lsp_GQL_ENTITIES.GQL_SCRIPT, {
    fetchPolicy: `cache-and-network`,
    onCompleted(data) {
      setScript(data.script)
    },
    onError(error) {
      onScriptChange(undefined)
      toastify.Error(error.message)
    },
  })

  const [updateScript] = useMutation<
    lsp_GQL_TYPES.GqlMUpdateScript,
    lsp_GQL_TYPES.GqlMUpdateScriptVariables
  >(lsp_GQL_ENTITIES.GQLM_UPDATE_SCRIPT, {
    onCompleted(data) {
      toastify.Success(`Script Updated`)
      const oldUserScript = _.cloneDeep(userScripts)
      const updatedUserScripts = oldUserScript.map(
        (item: lsp_GQL_TYPES.GqlScripts_scripts) =>
          item._id === data.updateScript._id
            ? (item.title = data.updateScript.title) && item
            : item,
      )
      setUserScripts(updatedUserScripts)
      if (data.updateScript.public) {
        const oldCommunityScript = _.cloneDeep(communityScripts)
        const updatedCommunityScripts = oldCommunityScript.map(
          (item: lsp_GQL_TYPES.GqlScripts_scripts) =>
            item._id === data.updateScript._id
              ? (item.title = data.updateScript.title) && item
              : item,
        )
        setCommunityScripts(updatedCommunityScripts)
      }
    },
    onError(error) {
      toastify.Error(error.message)
    },
  })

  const _updateScript = (code: string, title: string, _id: ObjectId) => {
    updateScript({
      variables: {
        _id,
        code,
        title,
      },
    })
  }

  const _createScript = () => {
    createScript({
      variables: {
        language: scriptLanguage,
        orgId: props.orgId,
        code: DefaultCodeText,
        public: scriptType,
        title: scriptTitle,
      },
    })
  }

  const _loadScriptsUser = (page: number) => {
    loadScriptsUser({
      variables: {
        filter: {
          userId: props.user.id,
          orgId: props.orgId,
        },
        pagination: {
          limit: ScriptLoadLimit,
          page,
        },
      },
    })
  }

  const _loadScriptsCommunity = (page: number) => {
    loadScriptsCommunity({
      variables: {
        filter: {
          public: true,
        },
        pagination: {
          limit: ScriptLoadLimit,
          page,
        },
      },
    })
  }

  const _deleteScript = () => {
    if (deletedScript && deletedScript.public) {
      const updatedCommunityScript = _.cloneDeep(communityScripts)
      const scriptIndex = updatedCommunityScript.findIndex(
        (item) => item._id === deletedScript._id,
      )
      updatedCommunityScript.splice(scriptIndex, 1)
      setCommunityScripts(updatedCommunityScript)
    }
    const updatedUserScript = _.cloneDeep(userScripts)
    const scriptIndex = updatedUserScript.findIndex(
      (item) => item._id === deletedScript._id,
    )
    updatedUserScript.splice(scriptIndex, 1)
    setUserScripts(updatedUserScript)
  }

  useEffect(() => {
    if (scriptId) {
      loadScript({
        variables: {
          _id: scriptId,
        },
      })
    }
    if (userScriptsPage === 0 && communityScriptsPage === 0) {
      _loadScriptsUser(userScriptsPage)
      _loadScriptsCommunity(communityScriptsPage)
    }
  }, [scriptId])

  const onScriptChange = (_scriptId: ObjectId) => {
    const shouldRoute =
      (props.onScriptChange && props.onScriptChange(_scriptId)) || true
    if (!shouldRoute) return
    setScriptId(_scriptId)
  }

  const scriptBoxGridItemRenderer = (
    scripts: lsp_GQL_TYPES.GqlScripts_scripts[],
  ): IScriptsGridItemProps[] => {
    return scripts.map((item: lsp_GQL_TYPES.GqlScripts_scripts) => {
      return {
        scripts: item,
        copyScript: () => {
          cloneScript({
            variables: {
              _id: item._id,
              orgId: props.orgId,
            },
          })
        },
        editScript: () => onScriptChange(item._id),
        onScriptChange: () => onScriptChange(item._id),
        deleteScript: () => {
          deleteScript({
            variables: {
              _id: item._id,
            },
          }),
            setDeletedScript(item)
        },
      }
    })
  }

  return (
    <>
      {scriptId && (
        <ScriptEditor
          isMagicTemplateScript={props.isMagicTemplateScript}
          onAttach={props.onAttach}
          cloneScript={() => {
            cloneScript({
              variables: {
                _id: scriptId,
                orgId: props.orgId,
              },
            })
          }}
          orgId={props.orgId}
          script={props.isMagicTemplateScript ? props.modifiedScripts : script}
          updateScript={_updateScript}
          onGoBack={() => onScriptChange(undefined)}
        />
      )}
      {showScriptModal && (
        <Modal
          title={t(`create-script`)}
          hideModal={() => setShowScriptModal(false)}
        >
          <div className="text-gray-700">{t(`script-title`)}</div>
          <InputText
            placeholder={t(`script-title`)}
            onChange={(e) => setScriptTitle(e.target.value)}
          />

          <div className="w-full mb-2 flex items-center gap-4">
            <div className="mt-2 flex items-center flex-grow">
              <span className="mr-2 text-gray-700">{t(`language`)}:</span>
              <DropDownMenuFancy<ScriptLanguage>
                list={scriptLanguages}
                activeItemHandler={(item) => setScriptLanguage(item.value)}
              />
            </div>
            <div className="mt-2 text-center">
              <Toggle
                label={t(`public`)}
                check={scriptType}
                onChange={(item) => setScriptType(item)}
              />
            </div>
          </div>
          <Button
            isLoading={loading}
            label={t(`create-script`)}
            color={`primary`}
            className="w-20 mt-3"
            disabled={loading}
            onClick={_createScript}
          />
        </Modal>
      )}
      <ScrollBarDiv className="h-full">
        <LayoutHeader
          title={t(`script`)}
          icon={<i className="fal fa-scroll-old fa-2x text-gray-700" />}
        >
          <div className="w-48">
            <Button
              label={t(`create-script`)}
              color={`primary`}
              icon={<i className={`fa fa-plus pr-2`} />}
              className="py-2 px-8"
              onClick={() => setShowScriptModal(true)}
            />
          </div>
        </LayoutHeader>
        <div className="mb-2">
          <div className="text-xl font-bold mx-5">{t(`my-scripts`)}:</div>
          {userScripts.length === 0 ? (
            <h1 className="text-center font-bold text-red-500 text-xl">
              {t(`no-scripts-available`)}
            </h1>
          ) : (
            <BoxGridList<IScriptsGridItemProps>
              Card={ScriptCard}
              list={scriptBoxGridItemRenderer(userScripts)}
            />
          )}
          {!hideUserLoadMore && (
            <div className="flex items-center justify-center">
              <div className="w-48 ">
                <p
                  className="text-center my-3 text-blue-500 cursor-pointer"
                  onClick={() => _loadScriptsUser(userScriptsPage)}
                >
                  {t(`load-more`)}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="my-2 border-t-2 py-10">
          <div className="text-xl font-bold mx-5">
            {t(`community-scripts`)}:
          </div>
          {communityScripts.length === 0 ? (
            <h1 className="text-center font-bold text-red-500 text-xl">
              {t(`no-scripts-available`)}
            </h1>
          ) : (
            <BoxGridList<IScriptsGridItemProps>
              Card={ScriptCard}
              list={scriptBoxGridItemRenderer(communityScripts)}
            />
          )}
          {!hideCommunityLoadMore && (
            <div className="flex items-center justify-center">
              <div className="w-48 ">
                <p
                  className="text-center my-3 text-blue-500 cursor-pointer"
                  onClick={() => _loadScriptsCommunity(communityScriptsPage)}
                >
                  {t(`load-more`)}
                </p>
              </div>
            </div>
          )}
        </div>
      </ScrollBarDiv>
    </>
  )
}
