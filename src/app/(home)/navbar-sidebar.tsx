import { Sheet,SheetContent,SheetHeader,SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"


interface NavbarItem{
    href:string
    children:React.ReactNode
}

interface Props{
    items:NavbarItem[]
    open:boolean
    onOpenChange:(open:boolean)=>void
}



const NavbarSidebar = ({items,open,onOpenChange}:Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center">
            <SheetTitle >Menu</SheetTitle>
          </div>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={()=>{onOpenChange(false)}}
              
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center justify-center text-base font-medium"
            >
              {item.children}
            </Link>
          ))}
          <div className="border-t">
            <Link
              href={"/sign-in"}
              className="text-left p-4 w-full hover:text-white hover:bg-black flex justify-center items-center text-base font-medium"
            >
              Sign In
            </Link>

            <Link href={"/sign-up"}
            className="w-full p-4 text-left hover:bg-black hover:text-white  flex justify-center items-center font-medium text-base"
            >Start Selling</Link>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

export default NavbarSidebar