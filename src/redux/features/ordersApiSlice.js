import { ORDERS_URL, PAYPAL_URL } from "../../services/constants";
import { apiSlice } from "./apiSlice";


export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: { ...order }
      })
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }),
      keepUnusedDataFor: 5
    }),
    payOrder:builder.mutation({
      query: ({orderId, details}) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: { ...details },
      })
    }),
    getPayPalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }),
    })
  })
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery, usePayOrderMutation, useGetPayPalClientIdQuery, useGetMyOrdersQuery, useGetOrdersQuery, useDeliverOrderMutation } = ordersApiSlice;