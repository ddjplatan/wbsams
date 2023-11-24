import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/user";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    // register: builder.mutation({
    //   query: (data) => ({
    //     url: `${USERS_URL}`,
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
    register: builder.mutation({
      query: (data) => {
        const formData = new FormData();

        Object.keys(data).forEach((key) => {
          if (key !== "img") {
            formData.append(key, data[key]);
          }
          if (key === "img") {
            formData.append("img", data.img);
          }
        });

        return {
          url: `${USERS_URL}`,
          method: "POST",
          body: formData,
        };
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
} = usersApiSlice;
