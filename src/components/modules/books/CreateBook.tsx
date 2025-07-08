// src/pages/CreateBookForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast, Toaster } from "sonner";
import { useCreateBookMutation } from "@/redux/apis/bookAPI";
import type { Book } from "@/types/model.type";

export function CreateBookForm() {
    const navigate = useNavigate();
    const [createBook] = useCreateBookMutation();

    const [form, setForm] = useState<Book>({
        title: "",
        author: "",
        genre: "FICTION",
        isbn: "",
        description: "",
        copies: 1,
    });

    const handleChange = (field: string, value: string | number) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createBook({ ...form, available: form.copies > 0 }).unwrap();
            toast("✅ Book created successfully!");
            navigate("/books");
        } catch (err) {
            toast("❌ Something went wrong!");
            if (err && typeof err === "object" && "message" in err) {
                console.log((err as { message: string }).message);
            } else {
                console.log(err);
            }
        }
    };

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
                        ➕ Create Book
                    </Button>
                </form>
            </div>
        </>
    );
}
