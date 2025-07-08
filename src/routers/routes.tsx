import BookCardGrid from "@/components/modules/books/BookCardGrid";
import { BookList } from "@/components/modules/books/BookList";
import { CreateBookForm } from "@/components/modules/books/CreateBook";
import EditBookForm from "@/components/modules/books/EditBookForm";
import BorrowSummary from "@/components/modules/borrows/BorrowSummary";
import MainLayout from "@/layouts/main.layout";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        Component: BookCardGrid
      },
      {
        path: "/books",
        Component: BookList
      },
      {
        path: "/create-book",
        Component: CreateBookForm
      },
      {
        path: "/edit-book/:bookId",
        Component: EditBookForm,        
      },
      {
        path: "/borrow-summary",
        Component: BorrowSummary
      }
    ]
  }
]);

export default router;