import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/sonner';
import { useCreateBorrowBookMutation } from '@/redux/apis/borrowAPI';
import type { Book } from '@/types/model.type';
import { Label } from '@radix-ui/react-label';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

interface IProps {
    book: Book;
}

const BorrowBook = ({ book }: IProps) => {
    const [quantity, setQuantity] = useState(1);
    const [dueDate, setDueDate] = useState(new Date()); // Default to today
    const navigate = useNavigate();
    const [createBorrowBook] = useCreateBorrowBookMutation();

    const availableCopies: number = book.copies;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (quantity > availableCopies) {
            toast("Insufficient copies");
            return;
        }

        try {
            await createBorrowBook({ book: book?._id as string, quantity, dueDate }).unwrap();
            toast("✅ Book borrowed successfully!");
            navigate("/borrow-summary");
        } catch (err) {
            toast("❌ Something went wrong!");
            if (err && typeof err === "object" && "message" in err) {
                console.log((err as { message: string }).message);
            }
        }
    };
    return (
        <>
            <Toaster />
            <div className="max-w-md mx-auto p-8 space-y-6">
                <h2 className="text-xl font-bold">📖 Borrow: {book.title}</h2>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div>
                        <Label htmlFor="quantity">Quantity (Max: {availableCopies})</Label>
                        <Input
                            id="quantity"
                            type="number"
                            min={1}
                            max={availableCopies}
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="dueDate">Due Date</Label>
                        <Input
                            id="dueDate"
                            type="date"
                            value={dueDate ? dueDate.toISOString().split("T")[0] : ""}
                            onChange={(e) => setDueDate(e.target.value ? new Date(e.target.value) : new Date())}
                            required
                        />
                    </div>

                    <Button type="submit" disabled={availableCopies < 1} className="cursor-pointer">
                        Borrow Book
                    </Button>
                </form>
            </div>
        </>
    )
}

export default BorrowBook