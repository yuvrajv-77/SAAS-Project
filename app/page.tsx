import CompanionCard from '@/components/CompanionCard'
import RecentCompanions from '@/components/RecentCompanions'
import { recentSessions } from '@/constants'
import React from 'react'

const Page = () => {
    return (
        <main className='container px-5 md:px-10 lg:px-20  mx-auto'>
            <section className='  mt-10'>
                <h1 className='text-3xl font-bold'>Dashboard</h1>
                {/* companinion cards */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8'>
                    <CompanionCard
                        id='101'
                        name="Neura the Brainy Explorer"
                        topic="Neural Network of the Brain"
                        duration={45}
                        subject="science"
                        bookmarked={false}
                        color='#FFDA6E'
                    />
                    <CompanionCard
                        id='102'
                        name="Countsy the Number Wizard"
                        topic="Neural Network of the Brain"
                        duration={45}
                        subject="maths"
                        bookmarked={true}
                        color='#E5D0FF'
                    />
                    <CompanionCard
                        id='103'
                        name="Verba the Vocabulary Builder"
                        topic="Topic: English Literature "
                        duration={20}
                        subject="Language"
                        bookmarked={false}
                        color='#BDE7FF'
                    />

                </div>
            </section>

            <section className='grid grid-cols-1 lg:grid-cols-3 gap-5 mt-8'>
                <RecentCompanions
                    title='Recent Sessions'
                    companions= {recentSessions}
                />
                <div>

                </div>
            </section>
        </main>
    )
}

export default Page