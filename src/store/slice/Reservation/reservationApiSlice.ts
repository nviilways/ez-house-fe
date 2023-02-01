import { CreateReservationInput } from "../../../interface/input";
import IReservation from "../../../interface/reservation";
import StandardResponse from "../../../interface/response";
import { apiSlice } from "../api/apiSlice";

export const reserveApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReservation: builder.mutation<
      StandardResponse<IReservation>,
      {input: CreateReservationInput; token: string}
    >({
      query: (data) => ({
        url: "/reservations",
        method: "POST",
        body: data.input,
        headers: {
            "Authorization" : `Bearer ${data.token}`
        }
      }),
      invalidatesTags: [{ type: "Reservation", id: "LIST" }],
    }),
  }),
});

export const { useCreateReservationMutation } = reserveApiSlice