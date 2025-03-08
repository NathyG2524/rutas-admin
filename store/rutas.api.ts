import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rutasApi = createApi({
  reducerPath: "rutasApi",
  tagTypes:['faq'],
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.rutasdeserendipia.com/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage
      if (token) {
        headers.set('Authorization', `Bearer ${token}`); // Attach token
      }
      return headers;
    },
   }),
 
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
    createFaq: builder.mutation({
      query: (formData) => ({
        url: "/upcoming-trip-info",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ['faq'],
    }),
    getFaqByTripId: builder.query({
      query: (tripId) => `/upcoming-trip-info/list/upcomingTripId/${tripId}`,
      providesTags: ['faq']
    }),
    getFaqById: builder.query({
      query: (id) => `/upcoming-trip-info/${id}`,
      providesTags: ['faq'],
    }),
    getTripDetail: builder.query({
      query: (id) => `/reservers/${id}`,
      
    }),
    getReserveList: builder.query({
      query: (id) => `/reservers/list/upcomingTripId/${id}`,
      
    }),
    deleteFaq: builder.mutation({
      query: (faqId) => ({
        url: `/upcoming-trip-info/${faqId}`,
        method: "DELETE",
      }),
      invalidatesTags: ['faq']
    }),
    updateFaq: builder.mutation({
      query: ({ faqId, updatedData }) => ({
        url: `/upcoming-trip-info/${faqId}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ['faq'],
    }),
    
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
  useCreateFaqMutation,
  useGetFaqByTripIdQuery,
  useGetFaqByIdQuery,
  useDeleteFaqMutation,
  useUpdateFaqMutation,
  useGetTripDetailQuery,
  useGetReserveListQuery
} = rutasApi;
