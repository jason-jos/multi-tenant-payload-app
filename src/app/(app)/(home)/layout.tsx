import Footer from "./Footer"
import { Navbar } from "./Navbar"

interface PropType{
  readonly  children:React.ReactNode
}
const layout = ({children}:PropType) => {
  return (
    <div className="flex flex-col min-h-screen">
        <Navbar/>
        <div className="flex-1">
        {children}

        </div>
        <Footer/>
    </div>
  )
}

export default layout