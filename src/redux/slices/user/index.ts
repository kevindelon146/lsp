import { createSlice } from '@reduxjs/toolkit'
import {
  GqlInitialUserData_myOrganizationList,
  GqlInitialUserData_user,
} from '@lib/gqlTypes/lsp'

interface IUserState {
  user: GqlInitialUserData_user
  myOrganizationList: GqlInitialUserData_myOrganizationList[]
  currentOrganization: GqlInitialUserData_myOrganizationList
  isLoadingUser: boolean
}

const initialState: IUserState = {
  user: null,
  myOrganizationList: [],
  currentOrganization: null,
  isLoadingUser: false,
}

const userSlice = createSlice({
  name: `user`,
  initialState,
  reducers: {
    setUser: (state, { payload }: { payload: GqlInitialUserData_user }) => {
      state.user = payload
      state.isLoadingUser = false
    },
    unsetUser: (state) => {
      state.user = initialState.user
      state.isLoadingUser = false
    },
    loadingUser: (state) => {
      state.isLoadingUser = true
    },
    setMyOrganizationList: (
      state,
      { payload }: { payload: GqlInitialUserData_myOrganizationList[] },
    ) => {
      state.myOrganizationList = payload
    },
    unsetMyOrganizationList: (state) => {
      state.myOrganizationList = initialState.myOrganizationList
    },
    setCurrentOrganization: (
      state,
      { payload }: { payload: GqlInitialUserData_myOrganizationList },
    ) => {
      state.currentOrganization = payload
    },
    unsetCurrentOrganization: (state) => {
      state.currentOrganization = initialState.currentOrganization
    },
  },
})

export const {
  setUser,
  unsetUser,
  loadingUser,
  setMyOrganizationList,
  unsetMyOrganizationList,
  setCurrentOrganization,
  unsetCurrentOrganization,
} = userSlice.actions
export const userReducer = userSlice.reducer
