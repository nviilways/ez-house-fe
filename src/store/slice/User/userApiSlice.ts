import { LoginAuth, RegisterAuth, TokenAuth } from "../../../interface/auth";
import { UpdateProfileInput } from "../../../interface/input";
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
      invalidatesTags: ["User"],
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
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["User"],
    }),
    me: builder.query<StandardResponse<IProfile>, string>({
      query: (token) => ({
        url: "/me",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["User"],
    }),
    getTransaction: builder.query<StandardResponse<ITransaction[]>, string>({
      query: (token) => ({
        url: "/transactions",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["Transaction"],
    }),
    getHistory: builder.query<StandardResponse<IReservation[]>, string>({
      query: (token) => ({
        url: "/reservations/history",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: [{ type: "Reservation", id: "LIST" }],
    }),
    updateProfile: builder.mutation<
      StandardResponse<IProfile>,
      { input: UpdateProfileInput; token: string }
    >({
      query: (data) => ({
        url: "/update",
        method: "PATCH",
        body: data.input,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
      invalidatesTags: ["User"],
    }),
    upgradeRole: builder.mutation<void, string>({
      query: (token) => ({
        url: "/update/role",
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useMeQuery,
  useGetTransactionQuery,
  useGetHistoryQuery,
  useLogoutMutation,
  useUpdateProfileMutation,
  useUpgradeRoleMutation
} = userApiSlice;
