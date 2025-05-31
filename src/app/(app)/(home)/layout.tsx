// commented as trpc is configured 
// import { getPayload } from "payload"
// import ConfigPromise from "@payload-config"
// import { Category } from "@/payload-types"

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient, trpc } from "@/trpc/server"
import { Suspense } from 'react';

import Footer from "./Footer"
import { Navbar } from "./Navbar"
import { SearchFilters } from "./search-filters"
import {SearchFiltersLoading} from "./search-filters/index"


interface PropType{
  readonly  children:React.ReactNode
}

const layout = async ({children}:PropType) => {
  //  const payload=await getPayload({config:ConfigPromise}) 
  //-- Commented out since trpc is involved in fetching the data
  
  // const data = await payload.find({
  //   collection: 'categories',
  //   depth:1,                //subcategory[0] will be a type of "Category"
  //   pagination:false,
  //   where:{
  //     parent:{
  //       exists:false
  //     }
  //   },sort:'name'
  // })

  // const formattedDoc = data.docs.map((doc) => ({
  //   ...doc,
  //   subcategories:
  //   //Because of 'depth:1' we can be sure the subcategory doc will be of type "Category" and it fixes the ts warning as explained at 2:41:20
  //     doc?.subcategories?.docs ?? [].map((doc) => ({ ...(doc as Category),subcategories:null })) 
  // }));

  // console.log(formattedDoc);
  

  const queryClient=getQueryClient()
  //await to avoid hydration error 
    await queryClient.prefetchQuery(  
    trpc.categories.getMany.queryOptions())

  return (

    
    
    <div className="flex flex-col min-h-screen">
        <Navbar/>
        <HydrationBoundary state={dehydrate(queryClient)} >
          <Suspense fallback={<SearchFiltersLoading/>}>
          <SearchFilters/>

          </Suspense>
        </HydrationBoundary>
        <div className="flex-1">
        {children}

        </div>
        <Footer/>
    </div>
  )
}

export default layout