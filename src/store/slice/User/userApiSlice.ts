import { LoginAuth, TokenAuth } from "../../../interface/auth";
import StandardResponse from "../../../interface/response";
import { apiSlice } from "../api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<StandardResponse<TokenAuth>, LoginAuth>({
            query: (login) => ({
                url: '/login',
                method: 'POST',
                body: JSON.stringify(login)
            }),
        })
    })
})

export const {useLoginMutation} = userApiSlice