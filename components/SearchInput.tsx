"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { Input } from './ui/input';
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';

const SearchInput = () => {

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('topic') || "";

    const [searchQuery, setSearchQuery] = React.useState(query);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {

            if (searchQuery) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "topic",
                    value: searchQuery,
                });
                router.push(newUrl, { scroll: false });

            } else {
                if (pathname === '/companions') {
                    const newUrl = removeKeysFromUrlQuery({
                        params: searchParams.toString(),
                        keysToRemove: ["topic"],
                    });

                    router.push(newUrl, { scroll: false });
                }
            }
        }, 500)
    }, [searchQuery, router, pathname, searchParams]);
    // useEffect(() => {
    //     if (searchQuery) {
    //         const newUrl = formUrlQuery({
    //             params: searchParams.toString(),
    //             key: "topic",
    //             value: searchQuery,
    //         });

    //         router.push(newUrl, { scroll: false });
    //     } else {
    //         if (pathname === '/companions') {
    //             const newUrl = removeKeysFromUrlQuery({
    //                 params: searchParams.toString(),
    //                 keysToRemove: ["your_query_key"],
    //             });

    //             router.push(newUrl, { scroll: false });
    //         }
    //     }
    // }
    //     , [searchQuery, router, pathname, searchParams]);
    return (
        <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="search"
            placeholder="Search..."
        />
    )
}

export default SearchInput