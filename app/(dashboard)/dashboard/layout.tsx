
import { SideBar } from "../_components/sidebar";
import { Navbar } from "../_components/navbar";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Aviation Altitude Dashbaord",
    description: "Aviation Altitude Dashbaord",
  };

const DashBoardLayout=({children}:{children:React.ReactNode})=>{
    return(<div className="h-full">
        <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
            <Navbar/>

        </div>
        <div className="invisible md:visible md:flex h-full w-56 flex-col fixed inset-y-0 left-0  z-50">
            <SideBar/>
        </div>
        <main className="md:pl-56 pt-[80px] h-full">

        {children}
        </main>
    </div>)
}

export default DashBoardLayout;