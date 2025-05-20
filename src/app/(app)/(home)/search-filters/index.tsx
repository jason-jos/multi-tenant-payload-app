import Catergories from "./Catergories"
import SearchInput from "./Search-Input"

interface SearchFilterProps{
    data:any
}

export const SearchFilters=({data}:SearchFilterProps)=>{
    return (
        <div className="w-full px-4 py-8 lg:px-12 border-b flex flex-col gap-4">
            <SearchInput />
            <Catergories data={data}/>
           
        </div>
    )
}