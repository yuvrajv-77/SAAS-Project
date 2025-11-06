import { getCompanionsById } from '@/actions/companion.actions';
import CompanionComponent from '@/components/CompanionComponent';
import { Button } from '@/components/ui/button';
import { getSubjectColor } from '@/lib/utils';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'

const CompanionSession = async ({ params }: { params: { id: string } }) => {

  const { id } = await params;
  const companion = await getCompanionsById(id);
  console.log("Companion: ", companion);

  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  if (!companion) {
    redirect('/companions');
  }

  return (
    <main className='container px-5 md:px-10 lg:px-50  mx-auto h-screen'>
      <div className='p-5 border rounded-xl flex gap-2 mt-7'>
        <div className='size-14 flex items-center justify-center rounded-sm' style={{ backgroundColor: getSubjectColor(companion.subject) }}>
          <Image src={`/icons/${companion.subject}.svg`} alt={companion.subject} width={25} height={25} className='' />
        </div>
        <div className='flex-1'>
          <div className='flex gap-3 items-center'>
            <h1 className='text-2xl font-bold'>{companion.name}</h1>
            <Button size={'sm'} className="text-xs h-5 capitalize bg-secondary-foreground">{companion.subject}</Button>
          </div>
          <p className='text-sm'>{companion.topic}</p>
        </div>
        <div>
          <p>{companion.duration} mins</p>
        </div>
      </div>
      <CompanionComponent {...companion} userName={user.firstName!} userImage={user.imageUrl} />
    </main>
  )
}

export default CompanionSession