import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"

interface SearchInputProps{
    isDisabled?:boolean
}

const SearchInput = ({isDisabled}:SearchInputProps) => {
  return (

    <div className="w-full gap-2 flex items-center ">
        <div className="w-full relative gap-3">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2  size-5 text-neutral-500   "/>
            <Input className="pl-8"  placeholder="Search Products" disabled={isDisabled}/>
            <div>
              {/* Todo Add Categories view All button  */}
              {/* Todo Add to library button */}
            </div>
        </div>
    </div>
  )
}

export default SearchInput