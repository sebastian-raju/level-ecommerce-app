import { PRODUCTS_URL, UPLOAD_URL } from "../../services/constants";
import { apiSlice } from "./apiSlice";



export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (searchData) => ({
        url: `${PRODUCTS_URL}?search=${searchData}`
      }),
      providesTags: ['Products'],
      keepUnusedDataFor: 5,
    }),
    getTopRatedProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/top-rated`
      }),
      providesTags: ['Products'],
      keepUnusedDataFor: 5,
    }),
    getFeaturedProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/featured`
      }),
      providesTags: ['Products'],
      keepUnusedDataFor: 5,
    }),
    getMenProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/men`
      }),
      providesTags: ['Products'],
      keepUnusedDataFor: 5,
    }),
    getWomenProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/women`
      }),
      providesTags: ['Products'],
      keepUnusedDataFor: 5,
    }),
    getReviews: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/reviews`
      }),
      providesTags: ['Products'],
      keepUnusedDataFor: 5,
    }),


    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`
      }),
      keepUnusedDataFor:5,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }),
      invalidatesTags: ['Product'],
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/add`,
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ['Product'],
    })
  })
});


export const { useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation, useUpdateProductMutation, useUploadProductImageMutation, useDeleteProductMutation, useAddProductMutation, useCreateReviewMutation, useGetTopRatedProductsQuery, useGetFeaturedProductsQuery, useGetMenProductsQuery, useGetWomenProductsQuery, useGetReviewsQuery } = productsApiSlice;