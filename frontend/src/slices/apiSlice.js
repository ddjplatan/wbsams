import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://wbasms.onrender.com",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Pet"],
  endpoints: (builder) => ({}),
});
