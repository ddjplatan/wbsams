import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Posts'],
  endpoints: (build) => ({
    getPosts: build.query({
      query: () => 'posts',
      providesTags: (result) =>
        result ? result.map(({ id }) => ({ type: 'Posts', id })) : [],
    }),
    addPost: build.mutation({
      query: (body) => ({
        url: `posts`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
})

// Auto-generated hooks
export const { useGetPostsQuery, useAddPostMutation } = api

// Possible exports
export const { endpoints, reducerPath, reducer, middleware } = api
// reducerPath, reducer, middleware are only used in store configuration
// endpoints will have:
// endpoints.getPosts.initiate(), endpoints.getPosts.select(), endpoints.getPosts.useQuery()
// endpoints.addPost.initiate(), endpoints.addPost.select(), endpoints.addPost.useMutation()
// see `createApi` overview for _all exports_