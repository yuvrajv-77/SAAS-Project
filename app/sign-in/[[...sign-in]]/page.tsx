import { SignIn } from '@clerk/nextjs'
import React from 'react'

const ClerkSignIn = () => {
    return (
        <main className='min-h-[calc(100vh-5rem)] flex items-center justify-center'>
            <SignIn />
        </main>
    )
}

export default ClerkSignIn