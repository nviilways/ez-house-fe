import { LoginAuth, RegisterAuth, TokenAuth } from "../../../interface/auth";
import IProfile from "../../../interface/profile";
import StandardResponse from "../../../interface/response";
import { apiSlice } from "../api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<StandardResponse<TokenAuth>, LoginAuth>({
      query: (login) => ({
        url: "/login",
        method: "POST",
        body: JSON.stringify(login),
      }),
    }),
    register: builder.mutation<StandardResponse<IProfile>, RegisterAuth>({
      query: (register) => ({
        url: "/register",
        method: "POST",
        body: JSON.stringify(register),
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = userApiSlice;
