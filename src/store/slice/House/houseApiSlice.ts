import { apiSlice } from "../api/apiSlice";
import StandardResponse from "../../../interface/response";
import IHouse from "../../../interface/house";
import { IHouseFilter } from "./houseFilterSlice";
import Pagination from "../../../interface/pagination";

export const houseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHouseByVacancy: builder.query<StandardResponse<Pagination<IHouse[]>>, IHouseFilter>({
      query: (filter) =>
        `/houses?checkin=${filter.dateIn}&checkout=${filter.dateOut}&sort=${filter.sortCol}&sortBy=${filter.sortBy}&guest=${filter.guest}`,
      providesTags: ['House']
    }),
  }),
});

export const { useGetHouseByVacancyQuery } = houseApiSlice
