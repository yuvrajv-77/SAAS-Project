import { Bookmark, BookmarkCheck, Clock } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";

interface CompanionCardProps {
    id: string;
    name: string;
    topic: string;
    duration: number;
    subject: string;
    bookmarked: boolean;
    color: string;
}

const CompanionCard = ({
    id,
    name,
    topic,
    duration,
    subject,
    bookmarked,
    color
}: CompanionCardProps) => {


    return (
        <article className="flex  flex-col rounded-4xl p-5 gap-3 w-full min-lg:max-w-[410px] justify-between" style={{ backgroundColor: color }}>
            <div className="flex justify-between items-center">
                <Button size={'sm'} className="text-sm capitalize bg-secondary-foreground">{subject}</Button>
                <Button size={"icon"} className="bg-secondary-foreground">{bookmarked ? <Bookmark /> : <BookmarkCheck />}</Button>
            </div>
            <h3 className="text-2xl font-bold leading-5">{name}</h3>
            <p className="text-sm text-muted-foreground">Topic: {topic}</p>
            <p className="text-sm text-muted-foreground flex items-center gap-1"><Clock size={16} /> {duration} mins duration</p>
            <Link href={`/companions/${id}`} className="w-full">
                <Button className="w-full" size={'lg'}>Launch Lesson</Button>
            </Link>
        </article>
    )
}

export default CompanionCard