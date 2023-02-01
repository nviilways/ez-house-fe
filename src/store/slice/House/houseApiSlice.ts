import { apiSlice } from "../api/apiSlice";
import StandardResponse from "../../../interface/response";
import IHouse from "../../../interface/house";
import { IHouseFilter } from "./houseFilterSlice";
import Pagination from "../../../interface/pagination";

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
      providesTags: (result, error, id) => [{ type: "House", id }],
      transformErrorResponse: (response, meta, arg) => response.data,
    }),
    createHouse: builder.mutation<StandardResponse<IHouse>, {input: FormData, token: string}>({
      query: (data) => ({
        url: '/houses',
        method: "POST",
        body: data.input,
        headers: {
          "Authorization" : `Bearer ${data.token}`
        }
      }), invalidatesTags: [{type: "House", id: "LIST"}]
    }),
    updateHouse: builder.mutation<StandardResponse<IHouse>, {input: FormData, token: string, id: number}>({
      query: (data) => ({
        url: `/houses/${data.id}`,
        method: "PATCH",
        body: data.input,
        headers: {
          "Authorization" : `Bearer ${data.token}`
        }
      }), invalidatesTags: [{type: "House", id: "LIST"}]
    }),
    deleteHouse: builder.mutation<StandardResponse<IHouse>, {token: string, id: number}>({
      query: (data) => ({
        url: `/houses/${data.id}`,
        method: "DELETE",
        headers: {
          "Authorization" : `Bearer ${data.token}`
        }
      }), invalidatesTags: [{type: "House", id: "LIST"}]
    })
  }),
});

export const { useGetHouseByVacancyQuery, useGetHouseByIdQuery } =
  houseApiSlice;
