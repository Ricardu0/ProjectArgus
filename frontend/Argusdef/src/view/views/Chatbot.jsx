import Sidebar from "../components/Sidebar";
import Aibot from "../components/Aibot";

export default function ChatBot() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 p-6">
                <Aibot />
            </div>
        </div>
    );
}
