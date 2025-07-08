import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Book } from "@/types/model.type";
import { Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router";
import { BorrowDialog } from "../borrows/BorrowDialog";
import { useDeleteBookMutation } from "@/redux/apis/bookAPI";

interface IProps {
    book: Book;
}

const BookRow = ({ book }: IProps) => {
    const navigate = useNavigate();
    const [deleteBook] = useDeleteBookMutation();
    console.log(book);

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this book?")) {
            // deleteBook(id); // from useDeleteBookMutation()
            deleteBook(id)
                .unwrap()
                .then(() => {
                    console.log("Book deleted successfully");
                })
                .catch((error) => {
                    console.error("Failed to delete book: ", error);
                });
            console.log(id);
        }
    };

    return (
        <TableRow>
            <TableCell>{book.title}</TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell>{book.genre}</TableCell>
            <TableCell>{book.isbn}</TableCell>
            <TableCell>{book.copies}</TableCell>
            <TableCell>
                <Badge variant={book.copies > 0 ? "default" : "destructive"}>
                    {book.copies > 0 ? "Available" : "Unavailable"}
                </Badge>
            </TableCell>
            <TableCell className="space-x-2 text-right flex justify-end">
                <Button className="cursor-pointer hover:bg-gray-300" variant="ghost" size="icon" onClick={() => navigate(`/edit-book/${book._id}`)}>
                    <Pencil className="w-4 h-4" />
                </Button>
                {/* <Button className="cursor-pointer hover:bg-gray-300" variant="ghost" size="icon"> */}
                    <BorrowDialog book={book} />
                {/* </Button> */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(book._id as string)}
                    className="text-destructive cursor-pointer hover:bg-red-500 hover:text-white"
                >
                    <Trash className="w-4 h-4" />
                </Button>
            </TableCell>
        </TableRow>
    )
}

export default BookRow