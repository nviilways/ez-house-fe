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
        `/houses?checkin=${filter.dateIn}&checkout=${filter.dateOut}&sort=${filter.sortCol}&sortby=${filter.sortBy}&guest=${filter.guest}&searchname=${filter.name}&searchcity=${filter.city}`,
      providesTags: ["House"],
    }),
  }),
});

export const { useGetHouseByVacancyQuery } = houseApiSlice;