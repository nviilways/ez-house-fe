import { CreateReservationInput } from "../../../interface/input";
import IReservation from "../../../interface/reservation";
import StandardResponse from "../../../interface/response";
import { apiSlice } from "../api/apiSlice";

export const reserveApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReservation: builder.mutation<
      StandardResponse<IReservation>,
      { input: CreateReservationInput; token: string }
    >({
      query: (data) => ({
        url: "/reservations",
        method: "POST",
        body: data.input,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
      invalidatesTags: [{ type: "Reservation", id: "LIST" }],
    }),
    getReservationById: builder.query<
      StandardResponse<IReservation>,
      { id: number; token: string }
    >({
      query: (data) => ({
        url: `reservations/${data.id}`,
        method: "GET",
        headers: {
          Authorization : `Bearer ${data.token}`
        }
      }), providesTags: (res, error, data) => [{type: "Reservation", id: data.id}]
    }),
  }),
});

export const { useCreateReservationMutation, useGetReservationByIdQuery } = reserveApiSlice;
