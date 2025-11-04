import { getAllCompanions } from '@/actions/companion.actions';
import CompanionCard from '@/components/CompanionCard';
import SearchInput from '@/components/SearchInput';
import { getSubjectColor } from '@/lib/utils';
import React from 'react'

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {


  const filters = await searchParams;
  console.log("filters", filters);
  const subject = filters.subject ? filters.subject : '';
  const topic = filters.topic ? filters.topic : '';

  const companionsData = await getAllCompanions({ subject, topic });
  console.log("companionsData", companionsData);

  const companions = companionsData.companions;

  return (
    <main className='container px-5 md:px-10 lg:px-20  mx-auto'>
      <h1 className='text-3xl font-bold mt-10'>Companions Library</h1>
      <div className='flex justify-end mt-8'>
        <SearchInput />
      </div>
      <div className='mt-5 flex flex-wrap justify-between gap-5'>
        {
          companions.map((companion: Companion) => (
            <CompanionCard key={companion.id} {...companion} color={getSubjectColor(companion.subject)} />
          ))
        }
      </div>
    </main>
  )
}

export default CompanionsLibrary