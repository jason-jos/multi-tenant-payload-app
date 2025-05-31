"use client"

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"

import { CustomCategory } from "../types"
import Catergories from "./Catergories"
import SearchInput from "./Search-Input"



export const SearchFilters=()=>{
    const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
    return (
        <div className="w-full px-4 py-8 lg:px-12 border-b flex flex-col gap-4" style={{backgroundColor:"#F5F5F5"}}>
            {/*TODO*/ /*Add mobile/small screen button t=15216 */}
            <SearchInput />
            <Catergories data={data}/>
           
        </div>
    )
}

export const SearchFiltersLoading=()=>{
    return (
        <div className="w-full px-4 py-8 lg:px-12 border-b flex flex-col gap-4"
        style={{backgroundColor:"#F5F5F5"}}
        >
            {/*TODO*/ /*Add mobile/small screen button t=15216 */}
            <SearchInput isDisabled={true} />
            <div className="hidden lg:block">
            <div className="h-11"/>

            </div>
           
        </div>

    )
}