import TemaPage from "../components/TemaPage";
import {Divide} from "lucide-react";
import BackButton from "../components/BackButton";
import TemaList from "../components/TemaList";

export default function TemaAdm(){
    return (
        <div
        className="fixed w-full h-full bg-gradient-to-r from-white to-purple-200">
            <div>
                <h1 className="p-6 ml-4 mr-4 mb-4 mt-6 rounded-xl  text-white  text-xl bg-purple-600">
                    Sistema de gerenciamento de Temas</h1>
                <TemaList></TemaList>
                <TemaPage>
                </TemaPage>
                <BackButton></BackButton>
            </div>

        </div>
    )
}