import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rutasApi = createApi({
  reducerPath: "rutasApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://93.127.163.40:4000/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage
      if (token) {
        headers.set('Authorization', `Bearer ${token}`); // Attach token
      }
      return headers;
    },
   }),
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3100" }),
  // tagTypes: ['Trips'],
  endpoints: (builder) => ({
    getTrips: builder.query({
      query: (query) => ({
       url:  `/upcoming-trips/`,
       params: query 
      })
    }),

    getReport: builder.query({
      query: (query) => ({
       url:  `/upcoming-trips/getReport`,
       params: query 
      })
    }),
    getPrivateTrip: builder.query({
      query: (id) => `/private-trips/${id}`,
    }),


    getPrivateTrips: builder.query({
      query: () => "/private-trips",
    }),

    getTrip: builder.query({
      query: (id) => `/upcoming-trips/${id}`,
    }),

    // getImage: builder.query({
    //   query: (imageId) => ({
    //     url: `/upcoming-trips/download/${imageId}`,
    //     method: "GET",
    //   }),
    //   queryFn: async ({ baseQuery, url }) => {
    //     const response = await baseQuery(url, { responseType: "blob" });
    //     const file = new Blob([response.data]);
    //     const fileUrl = window.URL.createObjectURL(file);
    //     // window.URL.crea/teObjectURL(new Blob([response.data]));
    //     return { data: fileUrl };
    //   },
    // }),
    updateTrip: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/upcoming-trips/${id}`,
        method: "PATCH",
        body: formData, // Send the updated fields correctly
      }),
    }),
    
    deleteTrip: builder.mutation({
      query: (id) => ({
        url: `upcoming-trips/${id.id}`,
        method: "DELETE",
      }),
      // invalidatesTags: ['Trips'],
    }),
    // Login endpoint (to authenticate and get a token)
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login", // Update with your actual login endpoint
        method: "POST",
        body: credentials, // { username, password }
      }),
    }),

     // Logout endpoint (to clear the stored token)
     logout: builder.mutation({
      query: () => ({
        url: "/auth/logout", // Update with your actual logout endpoint
        method: "POST",
      }),
    }),
  }),
});
export const {
  useGetTripsQuery,
  useGetReportQuery,
  useGetTripQuery,
//   // useGetImageQuery,
  useUpdateTripMutation,
  useDeleteTripMutation,
  useGetPrivateTripsQuery,
  useGetPrivateTripQuery,
  useLoginMutation, // Hook for login
  useLogoutMutation, // Hook for logout
} = rutasApi;
