import { useGetBooksQuery, useDeleteBookMutation } from '@/redux/apis/bookAPI';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // for animation
import { BorrowDialog } from '../borrows/BorrowDialog';

const BookCardGrid = () => {
    const { data, isLoading } = useGetBooksQuery();
    const [deleteBook] = useDeleteBookMutation();
    const navigate = useNavigate();

    const books = data?.data || [];

    const handleEdit = (id: string) => navigate(`/edit-book/${id}`);
    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this book?')) {
            await deleteBook(id);
        }
    };

    if (isLoading) return <Skeleton className="h-64" />;

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-16">
            {books?.map((book) => (
                <motion.div
                    key={book._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card className="bg-card shadow-md hover:shadow-lg transition-shadow p-0">
                        <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-t-md text-center">
                            <h2 className="text-2xl font-semibold animate-pulse">
                                {book.title}
                            </h2>
                            <p className="text-sm opacity-80">{book.author}</p>
                        </CardHeader>

                        <CardContent className="p-4 space-y-2 text-sm">
                            <p><span className="font-medium">Genre:</span> {book.genre}</p>
                            <p><span className="font-medium">ISBN:</span> {book.isbn}</p>
                            <p><span className="font-medium">Copies:</span> {book.copies}</p>
                            <p>
                                <span className="font-medium">Available:</span>{' '}
                                <span
                                    className={`font-semibold ${book.available ? 'text-green-600' : 'text-red-600'
                                        }`}
                                >
                                    {book.available ? 'Yes' : 'No'}
                                </span>
                            </p>

                            <div className="flex gap-2 pt-2">
                                <Button size="sm" variant="outline" onClick={() => handleEdit(book._id as string)}>Edit</Button>
                                <Button size="sm" variant="destructive" onClick={() => handleDelete(book._id as string)}>Delete</Button>
                                {/* <Button size="sm" onClick={() => handleBorrow(book["_id"]!)}>Borrow</Button> */}
                                <BorrowDialog book={book} btnText='Borrow' />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
};

export default BookCardGrid;
