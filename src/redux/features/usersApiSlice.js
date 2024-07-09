import { USERS_URL } from "../../services/constants";
import { apiSlice } from "./apiSlice";



export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: data,
      }),
      keepUnusedDataFor: 5,
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: data,
      })
    }),
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }),
      providesTags: ['Users'],
      keepUnusedDataFor: 5
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        method:'DELETE',
      }),
    }),
    getUserDetails: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ['Users'],
    })
  })
});


export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation, useGetUsersQuery, useDeleteUserMutation, useGetUserDetailsQuery, useUpdateUserMutation
 } = usersApiSlice;