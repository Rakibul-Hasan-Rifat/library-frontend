import type { Book } from "@/types/model.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const bookAPI = createApi({
  reducerPath: "bookAPI",
  tagTypes: ["Books"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-backend-gules.vercel.app/api/",
  }),
  endpoints: (builder) => ({
    getBooks: builder.query<{ success: boolean; message: string; data: Book[] },void>({
      query: () => "books",
      providesTags: ["Books"],
    }),
    getBookById: builder.query({
      query: (bookId) => `books/${bookId}`,
    }),
    createBook: builder.mutation({
      query: (body: Book) => ({
        url: "/books",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation({
      query: ({ bookId, updateDoc }) => ({
        url: `books/${bookId}`,
        method: "PUT",
        body: updateDoc,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `books/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookAPI;

export default bookAPI;
