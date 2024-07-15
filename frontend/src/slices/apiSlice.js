import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Post', 'User'],
  endpoints: (builder) => ({
    forgetPassword: builder.mutation({
      query: ({email}) => ({
        url: '/api/forget-password',
        method: 'POST',
        body: {email},
      }),
    }),
  }),
});

export const { useForgetPasswordMutation } = apiSlice;
