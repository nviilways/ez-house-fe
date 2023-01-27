import { apiSlice } from "../api/apiSlice";
import StandardResponse from "../../../interface/response";
import IHouse from "../../../interface/house";
import { IHouseFilter } from "./houseFilterSlice";

export const houseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHouseByVacancy: builder.query<StandardResponse<IHouse[]>, IHouseFilter>({
      query: (filter) =>
        `/houses?checkin=${filter.dateIn}&checkout=${filter.dateOut}&sort=${filter.sortCol}&sortBy=${filter.sortBy}`,
      providesTags: ['House']
    }),
  }),
});

export const { useGetHouseByVacancyQuery } = houseApiSlice
