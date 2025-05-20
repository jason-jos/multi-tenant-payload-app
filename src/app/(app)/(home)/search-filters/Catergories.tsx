import { Category } from "@/payload-types"
import CategoryDropDown from "./CategoryDropDown"

interface CategoriesPropTypes{
    data:any
}


const Catergories = ({data}:CategoriesPropTypes) => {
  return (
    <div className="relative w-full ">
        <div className="flex flex-nowrap items-end">

        {
            data.map((category:Category)=>(
                <div key={category.id}>
                <CategoryDropDown 
                category={category}
                isActive={false}
                isNavigationHovered={false}
                />

            </div>
            
        ))}
        </div>
    </div>
  )
}

export default Catergories