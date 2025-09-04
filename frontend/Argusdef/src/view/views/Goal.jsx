import GoalSetter from "../components/GoalSetter";
import Sidebar from "../components/Sidebar";


export default function Goal() {
    return (
        <div className="flex min-h-screen p-1">
            <Sidebar></Sidebar>
            <div className="flex-1 p-1">
                <GoalSetter></GoalSetter>
            </div>
        </div>

    )


}