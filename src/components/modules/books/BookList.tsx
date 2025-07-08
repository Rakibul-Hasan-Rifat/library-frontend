// src/pages/BookList.tsx
"use client";


import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { useGetBooksQuery } from "@/redux/apis/bookAPI";
import BookRow from "./BookRow";
import type { Book } from "@/types/model.type";
import { useNavigate } from "react-router";

export function BookList() {
    const { data, isLoading } = useGetBooksQuery();
    const navigate = useNavigate();
    console.log(data);


    if (isLoading) return <div className="text-center py-10">Loading books...</div>;

    return (
        <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">📚 Book List</h2>
                <Button className="cursor-pointer" onClick={() => navigate("/create-book")}>+ Add New Book</Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Genre</TableHead>
                        <TableHead>ISBN</TableHead>
                        <TableHead>Copies</TableHead>
                        <TableHead>Availability</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.isArray(data?.data) && data?.data!.map((book: Book) => (
                        <BookRow key={book._id} book={book} />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
