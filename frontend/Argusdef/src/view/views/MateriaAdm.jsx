import ListMaterias from "../components/ListMaterias";
import CreateMateria from "../components/CreateMateria";
import BackButton from "../components/BackButton";

export default function MateriaAdm(){
    return (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-100">

            <div className="p-6 ml-4">
                <h1 className="
                text-white
                bg-blue-900
                p-4 rounded-xl justify-center items-center
                text-xl
                font-bold

                "> Sistema de Gerenciamento De Matérias</h1>
            </div>
            <ListMaterias>
            </ListMaterias>

            <CreateMateria>
            </CreateMateria>

            <BackButton></BackButton>
        </div>
    )

}