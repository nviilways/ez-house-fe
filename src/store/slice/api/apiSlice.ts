import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: `${process.env.REACT_APP_URL}`}),
    tagTypes: ['House', 'User', 'Cities', 'Reservation', 'Transaction'],
    endpoints: (builder) => ({})
})