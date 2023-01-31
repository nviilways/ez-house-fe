import { LoginAuth, RegisterAuth, TokenAuth } from "../../../interface/auth";
import IProfile from "../../../interface/profile";
import IReservation from "../../../interface/reservation";
import StandardResponse from "../../../interface/response";
import ITransaction from "../../../interface/transaction";
import { apiSlice } from "../api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<StandardResponse<TokenAuth>, LoginAuth>({
      query: (login) => ({
        url: "/login",
        method: "POST",
        body: login,
      }),
    }),
    register: builder.mutation<StandardResponse<IProfile>, RegisterAuth>({
      query: (register) => ({
        url: "/register",
        method: "POST",
        body: register,
      }),
    }),
    logout: builder.mutation<void, string>({
      query: (token) => ({
        url: "/logout",
        method: "POST",
        headers: {
          "Authorization" : `Bearer ${token}`
        }
      })
    }),
    me: builder.query<StandardResponse<IProfile>, string>({
      query: (token) => ({
        url: "/me",
        method: "GET",
        headers: {
          "Authorization" : `Bearer ${token}`
        }
      })
    }),
    getTransaction: builder.query<StandardResponse<ITransaction[]>, string>({
      query: (token) => ({
        url: "/transactions",
        method: "GET",
        headers: {
          "Authorization" : `Bearer ${token}`
        }
      })
    }),
    getHistory: builder.query<StandardResponse<IReservation[]>, string>({
      query: (token) => ({
        url: "/reservations/history",
        method: "GET",
        headers: {
          "Authorization" : `Bearer ${token}`
        }
      })
    })
  }),
});

export const { useLoginMutation, useRegisterMutation, useMeQuery, useGetTransactionQuery, useGetHistoryQuery, useLogoutMutation } = userApiSlice;
