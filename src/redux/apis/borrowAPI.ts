import type {  Borrow, BorrowDetails } from "@/types/model.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const borrowAPI = createApi({
  reducerPath: "borrowAPI",
  tagTypes: ["borrows"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-backend-gules.vercel.app/api/",
  }),
  endpoints: (builder) => ({
    getBorrowBooks: builder.query<
      { success: boolean; message: string; data: BorrowDetails[] },
      void
    >({
      query: () => "borrow",
    }),
    createBorrowBook: builder.mutation({
      query: (body: Borrow) => ({
        url: "borrow",
        method: "POST",
        body
      })
    })
  }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true
});

export const { useGetBorrowBooksQuery, useCreateBorrowBookMutation } = borrowAPI;

export default borrowAPI;
