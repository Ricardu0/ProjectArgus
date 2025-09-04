import Sidebar from '../components/Sidebar';
import Pomodoro from "../components/Pomodore";


export default function Clock() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 p-1">
                <Pomodoro />
            </div>
        </div>

    )


}