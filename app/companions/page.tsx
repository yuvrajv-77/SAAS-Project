import { getAllCompanions } from '@/actions/companion.actions';
import CompanionCard from '@/components/CompanionCard';
import SearchInput from '@/components/SearchInput';
import { getSubjectColor } from '@/lib/utils';
import React from 'react'

const CompanionsLibrary = async ({searchParams}:SearchParams) => {

 
const filters = await searchParams;
console.log("filters", filters);
const subject = filters.subject ? filters.subject : '';
const topic = filters.topic ? filters.topic : '';

const companionsData = await getAllCompanions({subject, topic});
console.log("companionsData", companionsData);

const companions = companionsData.companions;

  return (
    <main>
        <h1 className='text-3xl font-bold'>Companions Library</h1>
        <div>
          <SearchInput/>
        </div>
        <div>
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