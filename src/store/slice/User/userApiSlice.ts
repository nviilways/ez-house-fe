import { LoginAuth, RegisterAuth, TokenAuth } from "../../../interface/auth";
import { UpdateProfileInput } from "../../../interface/input";
import Pagination from "../../../interface/pagination";
import IProfile from "../../../interface/profile";
import IReservation from "../../../interface/reservation";
import StandardResponse from "../../../interface/response";
import ITransaction from "../../../interface/transaction";
import { apiSlice } from "../api/apiSlice";
import { IHouseFilter } from "../House/houseFilterSlice";
import { ResFilter } from "../Reservation/reservationSlice";

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
    getTransaction: builder.query<StandardResponse<Pagination<ITransaction[]>>, {token: string, filter: Pick<IHouseFilter, "limit" | "page">}>({
      query: (data) => ({
        url: `/transactions?page=${data.filter.page}&limit=${data.filter.limit}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
      providesTags: ["Transaction"],
    }),
    getHistory: builder.query<StandardResponse<Pagination<IReservation[]>>, {token: string, filter: ResFilter}>({
      query: (data) => ({
        url: `/reservations/history?page=${data.filter.page}&limit=${data.filter.limit}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
      providesTags: [{ type: "Reservation", id: "LIST" }],
    }),
    updateProfile: builder.mutation<
      StandardResponse<IProfile>,
      { input: UpdateProfileInput; token: string; id: number }
    >({
      query: (data) => ({
        url: `/users/${data.id}`,
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
        url: "/users/host",
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["User"],
    }),
    userTopup: builder.mutation<
      StandardResponse<ITransaction>,
      { amount: number; token: string }
    >({
      query: (data) => ({
        url: "/transactions/topup",
        method: "POST",
        body: JSON.stringify({
          amount: data.amount
        }),
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }), invalidatesTags: ["User"]
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
  useUpgradeRoleMutation,
  useUserTopupMutation
} = userApiSlice;
