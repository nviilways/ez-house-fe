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
            return {...state, UserID: action.payload}
        },
        setRoleID: (state, action) => {
            return {...state, RoleID: action.payload}
        },
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

export const { setUserID, setRoleID } = userSlice.actions
export default userSlice.reducer