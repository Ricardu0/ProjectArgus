import ConteudoList from "../components/ConteudoList";
import ConteudoPage from "../components/ConteudoPage";
import BackButton from "../components/BackButton";


export default function ConteudoAdm() {


    return(
        <div className="bg-gradient-to-r from-white to-rose-50">
            <div className="flex flex-col b text-center">
            <h1 className="p-4 m-4 bg-gradient-to-r from-orange-500 to-orange-600 font-lg text-white font-bold rounded-xl">Sistema de gerenciamento de conteudos</h1>
            </div>
            <div>
            <ConteudoPage></ConteudoPage>
                <ConteudoList></ConteudoList>
            </div>
            <BackButton></BackButton>
        </div>
    )
}