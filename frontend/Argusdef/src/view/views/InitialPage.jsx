import Homecomponent from '../components/Homecomponent'
import Sidebar from "../components/Sidebar";
import Aibot from "../components/Aibot";

export default function InitialPage() {
 return(
     <div className="flex min-h-screen">
         <Sidebar />
         <div className="flex-1 p-6">
             <Homecomponent />
         </div>

     </div>


 )
}