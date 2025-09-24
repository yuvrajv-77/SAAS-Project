import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from 'next/link';
import Image from 'next/image';
import { subjects } from '@/constants';
import { getSubjectColor } from '@/lib/utils';
import { Button } from './ui/button';

interface CompanionsListProps {
    title: string;
    companions?: Companion[];
    className?: string;

}
const RecentCompanions = ({ title, companions, className }: CompanionsListProps) => {
    return (
        <div className='bg-secondary/50 rounded-4xl p-6 col-span-2'>
            <h1 className='text-3xl font-bold'>{title}</h1>
            <Table className='mt-5'>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-2/3 font-medium  ">Lessons</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead className='text-right'>Duration</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        companions?.map((companion) => (
                            <TableRow key={companion.id}>
                                <TableCell className="font-medium group">
                                    <Link href={`/companions/${companion.id}`}>
                                        <div className='flex items-center gap-4'>
                                            <div className='size-14 flex items-center justify-center rounded-sm' style={{ backgroundColor: getSubjectColor(companion.subject) }}>
                                                <Image src={`/icons/${companion.subject}.svg`} alt={companion.subject} width={25} height={25} className='' />
                                            </div>
                                            <div className='group-hover:underline'>
                                                <p className='font-semibold text-lg'>{companion.name}</p>
                                                <p className='text-sm text-muted-foreground'>{companion.topic}</p>
                                            </div>

                                        </div>
                                    </Link>
                                </TableCell>
                                <TableCell className='capitalize text-start'>
                                    <Button size={'sm'} className="text-sm capitalize bg-secondary-foreground">{companion.subject}</Button>
                                </TableCell>
                                <TableCell className="text-right">{companion.duration}</TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default RecentCompanions