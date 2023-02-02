import { createSlice } from "@reduxjs/toolkit"
import jwtDecode from "jwt-decode"
import { userApiSlice } from "./userApiSlice"

export interface Claim {
    id: number
    wallet_id: number
    role_id: number
}

const initialState: Claim = {
    id: 0,
    wallet_id: 0,
    role_id: 0
}

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setUserID: (state, action) => {
            return {...state, id: action.payload}
        },
        setWalletID: (state, action) => {
            return {...state, wallet_id: action.payload}
        },
        setRoleID: (state, action) => {
            return {...state, role_id: action.payload}
        },
        setAuth: (state, action) => {
            return {...state, id: action.payload.id, role_id: action.payload.role_id, wallet_id: action.payload.wallet_id}
        },
        setUserStateAll: (state, action) => {
            return {...state, id: action.payload, wallet_id: action.payload, role_id: action.payload}
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            userApiSlice.endpoints.login.matchFulfilled, (state, action) => {
                state.id = (jwtDecode(action.payload.data?.token as string) as Claim).id;
                state.wallet_id = (jwtDecode(action.payload.data?.token as string) as Claim).wallet_id;
                state.role_id = (jwtDecode(action.payload.data?.token as string) as Claim).role_id;
            }
        )
    }
})

export const { setUserID, setRoleID, setWalletID, setAuth, setUserStateAll } = userSlice.actions
export default userSlice.reducer