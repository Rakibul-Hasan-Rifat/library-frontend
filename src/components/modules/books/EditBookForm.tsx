import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Book } from '@/types/model.type';
import { useGetBookByIdQuery, useUpdateBookMutation } from '@/redux/apis/bookAPI';
import { Label } from '@radix-ui/react-label';
import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate, useParams } from 'react-router';
import { Textarea } from '@/components/ui/textarea';
import { PencilIcon } from 'lucide-react';
import { toast, Toaster } from 'sonner';


// interface EditBookFormProps {
//     book: Book;
// }

const EditBookForm = () => {

    const { bookId } = useParams<{ bookId: string }>()
    const navigate = useNavigate();
    const [updateBook] = useUpdateBookMutation();
    const { data, isLoading } = useGetBookByIdQuery(bookId)

    const { data: book } = data || {};

    const [form, setForm] = useState<Book>({
        title: book?.title || "",
        author: book?.author || "",
        genre: book?.genre || "FICTION",
        isbn: book?.isbn || "",
        description: book?.description || "",
        copies: book?.copies || 1,
    });

    useEffect(() => {
        setForm({ ...book })
    }, [book])

    console.log(book, form, bookId);

    const handleChange = (field: string, value: string | number) => {
        setForm(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updateDoc = {
            ...form,
            available: form.copies === 0 ? false : true,
        };

        console.log('updateDoc', updateDoc);

        try {
            await updateBook({ bookId, updateDoc }).unwrap();
            toast.success("✅ Book updated successfully!");
            navigate("/books");
        } catch (error) {
            if (error && typeof error === "object" && "message" in error) {
                toast.error("❌ Something went wrong!");
                console.error((error as { message: string }).message);
            } else {
                console.error(error);
            }
        }
    };

    if (isLoading) return <div className="text-center py-10">Loading book...</div>;

    return (
        <>
            <Toaster />
            <div className="max-w-xl mx-auto p-8 space-y-6">
                <h2 className="text-2xl font-bold text-foreground">📘 Add New Book</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label className="mb-2" htmlFor="title">Title</Label>
                        <Input id="title" value={form.title} onChange={(e) => handleChange("title", e.target.value)} required />
                    </div>

                    <div>
                        <Label className="mb-2" htmlFor="author">Author</Label>
                        <Input id="author" value={form.author} onChange={(e) => handleChange("author", e.target.value)} required />
                    </div>

                    <div className="flex gap-4 w-full">
                        <div className="w-1/2">
                            <Label className="mb-2" htmlFor="genre">Genre</Label>
                            <Select onValueChange={(value: string) => handleChange("genre", value)}>
                                <SelectTrigger id="genre" className="w-full">
                                    <SelectValue placeholder="Select genre" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="FICTION">Fiction</SelectItem>
                                    <SelectItem value="NONFICTION">Nonfiction</SelectItem>
                                    <SelectItem value="SCIENCE">Science</SelectItem>
                                    <SelectItem value="FANTASY">Fantasy</SelectItem>
                                    <SelectItem value="HISTORY">History</SelectItem>
                                    <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-1/2">
                            <Label className="mb-2" htmlFor="copies">Copies</Label>
                            <Input
                                id="copies"
                                type="number"
                                min={0}
                                value={form.copies}
                                className="w-full"
                                onChange={(e) => handleChange("copies", Number(e.target.value))}
                            />
                        </div>
                    </div>

                    <div>
                        <Label className="mb-2" htmlFor="isbn">ISBN</Label>
                        <Input id="isbn" value={form.isbn} onChange={(e) => handleChange("isbn", e.target.value)} required />
                    </div>

                    <div>
                        <Label className="mb-2" htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={form.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                        />
                    </div>
                    <div>
                    </div>
                    <Button type="submit" className="w-full bg-primary text-white">
                        <PencilIcon /> Update
                    </Button>
                </form>
            </div>
        </>
    );
};

export default EditBookForm;
