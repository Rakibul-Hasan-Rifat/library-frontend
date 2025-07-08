import { Separator } from "@/components/ui/separator";

const Footer = () => {
    return (
        <footer className="w-full bg-muted text-muted-foreground mt-16 py-6 border-t">
            <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-center md:text-left">
                    © {new Date().getFullYear()} <span className="font-medium text-primary">BookStack</span>. Built for book lovers & borrowers 📚
                </p>
                <nav className="flex gap-4 text-sm text-muted-foreground">
                    <a href="/books" className="hover:text-primary transition-colors">All Books</a>
                    <Separator orientation="vertical" className="h-4" />
                    <a href="/borrow-summary" className="hover:text-primary transition-colors">Borrow Summary</a>
                    <Separator orientation="vertical" className="h-4" />
                    <a href="/create-book" className="hover:text-primary transition-colors">Add Book</a>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
