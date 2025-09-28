"use client"
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button'
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs';
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
            name: "Pricing",
            link: "/subscriptions"
        },
        

    ]
    return (
        <nav className='  w-full bg-white shadow' >
            <div className='container px-5 md:px-10 lg:px-20  mx-auto flex items-center justify-between py-4'>
                <Link href={"/"} className='text-primary font-semibold text-xl'>
                    SaaS
                </Link>
                <div className='flex items-center gap-10 '>
                    <div className='hidden md:flex items-center gap-6 text-sm'>
                        {navItems.map(({ name, link }, i) => (
                            <Link key={i} href={link} className={cn(pathname === link ? "text-primary font-semibold" : "")}>{name}</Link>
                        ))}
                        <SignedIn>
                            <Link href={"/my-journey"} className={cn(pathname === "/my-journey" ? "text-primary font-semibold" : "")}>My Journey</Link>
                        </SignedIn>
                    </div>
                    <div className='flex items-center'>

                        <SignedOut >
                            <div className='flex items-center gap-2'>
                                <Link href="/sign-in">
                                    <Button>Sign in</Button>
                                </Link>
                                {/* <Link href="/sign-up">
                                    <Button >Sign in</Button>
                                </Link> */}
                            </div>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar