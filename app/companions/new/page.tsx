import CompanianForm from '@/components/CompanianForm'
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import React from 'react'

const NewCompanion = async () => {
    const {userId} = await auth();
    console.log("userId from clerk's auth() ",userId);
    
    if(!userId){
        redirect('/sign-in');
    }
    return (
        <main className='bg-secondary/50'>
            <div className='max-w-3/8  py-10  mx-auto'>
                <h1 className='text-3xl font-bold'>Companion Builder</h1>
                <CompanianForm />
            </div>
        </main>
    )
}

export default NewCompanion