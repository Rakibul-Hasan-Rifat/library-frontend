// src/components/Navbar.tsx
"use client";

import { BookMarked, PlusCircle, BarChart3 } from "lucide-react";
import { Link } from 'react-router-dom';
import { ModeToggle } from "../mode-toggle";

export function Navbar() {

    return (
        <nav className="w-full px-6 py-4 bg-background border-b shadow-sm flex justify-between items-center gap-4 flex-col sm:flex-row">
            <Link to="/" className="text-xl font-bold tracking-wide">
                📚 BookStack
            </Link>

            <ul className="flex gap-2 space-x-6 text-sm items-center flex-col sm:flex-row">
                <li>
                    <Link to="/books" className="flex items-center gap-1 hover:text-primary transition">
                        <BookMarked className="h-4 w-4" />
                        All Books
                    </Link>
                </li>
                <li>
                    <Link to="/create-book" className="flex items-center gap-1 hover:text-primary transition">
                        <PlusCircle className="h-4 w-4" />
                        Add Book
                    </Link>
                </li>
                <li>
                    <Link to="/borrow-summary" className="flex items-center gap-1 hover:text-primary transition">
                        <BarChart3 className="h-4 w-4" />
                        Borrow Summary
                    </Link>
                </li>
                <li>{<ModeToggle />}</li>
            </ul>
        </nav>
    );
}
