import { useGetBorrowBooksQuery } from "@/redux/apis/borrowAPI";

import { Skeleton } from "@/components/ui/skeleton";
import { BookMarked } from "lucide-react";

const BorrowSummary = () => {
    const { data, error, isLoading } = useGetBorrowBooksQuery();
    console.log(data);

    if (isLoading) {
        return (
            <div className="p-8 space-y-4">
                <h2 className="text-2xl font-bold">📦 Borrow Summary</h2>
                {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full rounded-md" />
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-red-500 font-medium">
                ⚠️ Failed to load borrow summary.
            </div>
        );
    }

    return (
        <div className="my-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data?.data?.map((entry, index) => (
                <div
                    key={entry.isbn}
                    className="relative w-full max-w-sm mx-auto p-6 rounded-xl bg-gradient-to-br from-[#0e0c25] via-[#1f1c45] to-[#342e68] text-white shadow-lg border border-indigo-500/20 overflow-hidden animate-fadeSlideIn"
                    style={{
                        animationDelay: `${index * 100}ms`,
                        animationFillMode: "backwards",
                    }}
                >
                    {/* Gradient glow layer */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(147,197,253,0.15),transparent)] blur-2xl pointer-events-none z-0" />

                    {/* Floating Icon */}
                    <div className="absolute top-4 right-4 text-indigo-300/70 z-10">
                        <BookMarked className="w-6 h-6" />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold mb-2 relative z-10 text-cyan-200">
                        {entry.bookTitle}
                    </h3>
                    <p className="text-sm relative z-10">
                        <span className="font-medium text-indigo-200">ISBN:</span> {entry.isbn}
                    </p>
                    <p className="text-sm relative z-10">
                        <span className="font-medium text-pink-300">Total Borrowed:</span> {entry.totalQuantity}
                    </p>
                </div>
            ))}
        </div>

    );
      
}

export default BorrowSummary