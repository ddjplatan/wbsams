import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  // baseUrl: "https://wbasms.onrender.com",
  baseUrl: "http://localhost:3001",

});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Pet"],
  endpoints: (builder) => ({}),
});
