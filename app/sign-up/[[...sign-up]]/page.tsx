import { SignIn, SignUp } from '@clerk/nextjs'
import React from 'react'

const ClerkSignUp = () => {
    return (
        <main className='min-h-[calc(100vh-5rem)] flex items-center justify-center'>
            <SignUp/>
        </main>
    )
}

export default ClerkSignUp;