import ICity from "../../../interface/city";
import StandardResponse from "../../../interface/response";
import { apiSlice } from "../api/apiSlice";

export const cityApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCity: builder.query<StandardResponse<ICity[]>, void>({
            query: () => '/cities'
        })
    })
})

export const { useGetAllCityQuery } = cityApiSlice