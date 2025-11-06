import CompanionCard from '@/components/CompanionCard'
import RecentCompanions from '@/components/RecentCompanions'
import { recentSessions } from '@/constants'
import React from 'react'
import { getAllCompanions } from '@/actions/companion.actions'
import { getSubjectColor } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const Page = async () => {
    const { companions } = await getAllCompanions({ limit: 3 });


    return (
        <main className='container px-5 md:px-10 lg:px-20  mx-auto'>
            <section className='  mt-10'>
                <h1 className='text-3xl font-bold'>Dashboard</h1>
                {/* companinion cards */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8'>
                    {companions?.map((companion) => (
                        <CompanionCard
                            key={companion.id}
                            id={companion.id}
                            name={companion.name}
                            topic={companion.topic}
                            duration={companion.duration || 30}
                            subject={companion.subject}
                            bookmarked={companion.bookmarked || false}
                            color={getSubjectColor(companion.subject)}
                        />
                    ))}
                </div>
            </section>

            <section className='grid grid-cols-1 lg:grid-cols-3 gap-5 mt-8'>
                <RecentCompanions
                    title='Recent Sessions'
                    companions={recentSessions}
                />
                <div className='bg-black/80 rounded-3xl p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden'>
                        <div className="inline-flex px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium">
                            Start learning your way
                        </div>
                        <div className="space-y-4 z-10">
                            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                                Build and Personalize Learning Companion
                            </h2>
                            <p className="text-gray-300 text-sm md:text-base max-w-md">
                                Pick a name, subject, voice, & personality — and start learning through voice conversations that feel natural and fun.
                            </p>
                        </div>
                        <div className="relative w-full h-48 md:h-60">
                            <Image 
                                src="/images/cta.svg" 
                                alt="cta" 
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <Link 
                            href="/companions/new"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
                        >
                            <Image src="/icons/plus.svg" alt="plus" width={12} height={12} />
                            Build a New Companion
                        </Link>
                </div>
            </section>
        </main>
    )
}

export default Page