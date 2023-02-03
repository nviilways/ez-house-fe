import { CreateReservationInput } from "../../../interface/input";
import IPickup from "../../../interface/pickup";
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
    createPickup: builder.mutation<StandardResponse<IPickup>, {user_id: number, reservation_id: number, token: string}>({
      query: (data) => ({
        url: '/pickups',
        method: "POST",
        body: {user_id: data.user_id, reservation_id: data.reservation_id},
        headers: {
          Authorization: `Bearer ${data.token}`
        }
      }), invalidatesTags: (res, error, data) => [{type: "Reservation", id: data.reservation_id}]
    })
  }),
});

export const { useCreateReservationMutation, useGetReservationByIdQuery, useCreatePickupMutation } = reserveApiSlice;
