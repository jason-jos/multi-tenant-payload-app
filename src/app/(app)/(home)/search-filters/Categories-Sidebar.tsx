import { useState } from "react"
import { useRouter } from "next/navigation"

import {Sheet,SheetContent,SheetTitle,SheetHeader} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"

import { CustomCategory } from "../types"
import { ChevronLeftIcon, ChevronRight } from "lucide-react"

interface categoriesSidebarProps{
    open:boolean
    onOpenChange:(open:boolean)=>void
    data?:CustomCategory[]//Remove this later
}

  const CategoriesSidebar = ({open,onOpenChange,data}:categoriesSidebarProps) => {
    
  const [parentCategories,setParentCategories] =useState<CustomCategory[] |null>(null)
  const [selectedCategory,setSelectedCategory]=useState<CustomCategory|null>(null)

  const currentCategory=parentCategories??data??[]
  
  const router=useRouter()

  const handlOpenChange=(open:boolean)=>{
    setSelectedCategory(null)
    setParentCategories(null)
    onOpenChange(open)
  }

 const handleCategoryClick=(category:CustomCategory)=>{
  
  if(category.subcategories && category.subcategories.length>0)
    {
      setParentCategories(category.subcategories as CustomCategory[])
      setSelectedCategory(category)
    }else
    {
    if(parentCategories && selectedCategory){
      router.push(`/${selectedCategory.slug}/${category.slug}`)
    }else{
      //This is a main category
      if(category.slug==='all'){
        router.push("/")
      }else{
        router.push(`/${category.slug}`)
      }
    }
    handlOpenChange(false)
    }


 }

  const backgroundColor=selectedCategory?.color||"white"

 const handleBackButton=()=>{
  if(parentCategories){
    setSelectedCategory(null)
    setParentCategories(null)
  }
 }

  return (
    <Sheet open={open} onOpenChange={handlOpenChange} data={data}>
      <SheetContent 
      side="left"
      className="p-0 transition-none"
      style={{backgroundColor:backgroundColor}}
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle>
            Categories
          </SheetTitle>
        </SheetHeader>
        <ScrollArea 
        className="flex flex-col overflow-y-auto h-full pb-2">
          {parentCategories &&(
           
            <button 
            onClick={()=>{handleBackButton()}}
            
            className="w-full p-4 flex items-center text-base font-medium hover:bg-black hover:text-white"
            >
            
              <ChevronLeftIcon className="size-4 mr-2"/>
              Back
            </button>
          )}
          {currentCategory.map((category)=>(
            <button key={category.slug}
            className="w-full p-4 flex justify-between text-base font-medium hover:bg-black hover:text-white cursor-pointer"
            onClick={()=>handleCategoryClick(category)}
            >
              {category.name}
              {category.subcategories && category.subcategories.length>0 &&
              (<ChevronRight className="size-4"/>)}
            </button>
          ))}
        </ScrollArea>
    </SheetContent>
  </Sheet>
  )
}

export default CategoriesSidebar