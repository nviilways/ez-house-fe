import { apiSlice } from "../api/apiSlice";
import StandardResponse from "../../../interface/response";
import IHouse from "../../../interface/house";
import { IHouseFilter } from "./houseFilterSlice";
import Pagination from "../../../interface/pagination";
import { IHouseHostFilter } from "./houseHostSlice";

export const houseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHouseByVacancy: builder.query<
      StandardResponse<Pagination<IHouse[]>>,
      IHouseFilter
    >({
      query: (filter) =>
        `/houses?checkin=${filter.dateIn}&checkout=${filter.dateOut}&sort=${filter.sortCol}&sortby=${filter.sortBy}&guest=${filter.guest}&searchname=${filter.name}&searchcity=${filter.city}&page=${filter.page}&limit=${filter.limit}`,
      providesTags: [{ type: "House", id: "LIST" }],
    }),

    getHouseById: builder.query<StandardResponse<IHouse>, number>({
      query: (id) => `/houses/${id}`,
      providesTags: (result, error, id) => [{ type: "House", id: id }],
      transformErrorResponse: (response, meta, arg) => response.data,
    }),

    getHouseByHost: builder.query<StandardResponse<Pagination<IHouse[]>>, {token: string, filter: IHouseHostFilter}>({
      query: (data) => ({
        url: `/houses/host?sort=${data.filter.sortCol}&sortby=${data.filter.sortBy}&guest=${data.filter.guest}&searchname=${data.filter.name}&searchcity=${data.filter.city}&page=${data.filter.page}&limit=${data.filter.limit}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
      providesTags: [{ type: "House", id: "HOST" }],
    }),

    createHouse: builder.mutation<
      StandardResponse<IHouse>,
      { input: FormData; token: string }
    >({
      query: (data) => ({
        url: "/houses",
        method: "POST",
        body: data.input,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
      invalidatesTags: [{ type: "House", id: "LIST" }, {type: "House", id: "HOST"}],
    }),

    updateHouse: builder.mutation<
      StandardResponse<IHouse>,
      { input: FormData; token: string; id: number }
    >({
      query: (data) => ({
        url: `/houses/${data.id}`,
        method: "PATCH",
        body: data.input,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
      invalidatesTags: (res, error, data) => [{ type: "House", id: "LIST" }, {type: "House", id: "HOST"}, {type: "House", id: data.id}],
    }),

    deleteHouse: builder.mutation<
      StandardResponse<IHouse>,
      { token: string; id: number }
    >({
      query: (data) => ({
        url: `/houses/${data.id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
      invalidatesTags: [{ type: "House", id: "LIST" }, {type: "House", id: "HOST"}],
    }),
  }),
});

export const { useGetHouseByVacancyQuery, useGetHouseByIdQuery, useGetHouseByHostQuery, useCreateHouseMutation, useUpdateHouseMutation, useDeleteHouseMutation } =
  houseApiSlice;
