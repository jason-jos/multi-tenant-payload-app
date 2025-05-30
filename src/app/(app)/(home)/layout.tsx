import { getPayload } from "payload"
import ConfigPromise from "@payload-config"

import Footer from "./Footer"
import { Navbar } from "./Navbar"
import { SearchFilters } from "./search-filters"
import { Category } from "@/payload-types"

interface PropType{
  readonly  children:React.ReactNode
}

const layout = async ({children}:PropType) => {
   const payload=await getPayload({config:ConfigPromise})
  
  const data = await payload.find({
    collection: 'categories',
    depth:1,                //subcategory[0] will be a type of "Category"
    pagination:false,
    where:{
      parent:{
        exists:false
      }
    },sort:'name'
  })

  const formattedDoc = data.docs.map((doc) => ({
    ...doc,
    subcategories:
    //Because of 'depth:1' we can be sure the subcategory doc will be of type "Category" and it fixes the ts warning as explained at 2:41:20
      doc?.subcategories?.docs ?? [].map((doc) => ({ ...(doc as Category),subcategories:null })) 
  }));

  // console.log(formattedDoc);
  

  return (

    
    
    <div className="flex flex-col min-h-screen">
        <Navbar/>
        <SearchFilters data={formattedDoc}/>
        <div className="flex-1">
        {children}

        </div>
        <Footer/>
    </div>
  )
}

export default layout