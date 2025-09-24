import CompanianForm from '@/components/CompanianForm'
import React from 'react'

const NewCompanion = () => {
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