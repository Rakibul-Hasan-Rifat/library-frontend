import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { BookOpen } from "lucide-react"
import BorrowBook from "./BorrowBook"
import type { Book } from "@/types/model.type"

interface IProps {
    book: Book,
    btnText?: string
}

export function BorrowDialog({ book, btnText }: IProps) {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button className="cursor-pointer" size="sm" variant="outline">
                        {
                            btnText ? btnText : <BookOpen className="w-4 h-4 text-primary" />
                        }
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <BorrowBook book={book} />
                </DialogContent>
            </form>
        </Dialog>
    )
}
