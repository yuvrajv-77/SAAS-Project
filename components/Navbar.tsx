"use client"
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button'

const Navbar = () => {

    const pathname = usePathname();
    const navItems = [
        {
            name: "Home",
            link: "/"
        },
        {
            name: "Learning Companions",
            link: "/companions"
        },
        {
            name: "My Journey",
            link: "/my-journey"
        }
    ]
    return (
        <nav className=' border w-full bg-white ' >
            <div className='container px-5 md:px-10 lg:px-20 border mx-auto flex items-center justify-between py-4'>
                <Link href={"/"} className='text-primary font-semibold text-xl'>
                    SaaS
                </Link>
                <div className='flex gap-10'>
                    <div className='hidden md:flex items-center gap-6'>
                        {navItems.map(({ name, link }) => (
                            <Link href={link} className={cn(pathname === link ? "text-primary font-semibold" : "")}>{name}</Link>
                        ))}
                    </div>
                    <div>
                        <Button>Sign in</Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar