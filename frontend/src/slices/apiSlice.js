import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [
    "User",
    "Adoption",
    "Donation",
    "Event",
    "Pet",
    "SpayAndNeuter",
    "Vet",
    "Volunteer",
  ],
  endpoints: (builder) => ({}),
});
