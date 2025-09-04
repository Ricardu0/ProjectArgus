import {useEffect, useState} from "react";
import {getSubtema} from "../../controller/api/getSubtema";
import {deleteSubtema} from "../../controller/api/deleteSubtema";

export default function SubtemaList() {

    const [subtema, setSubtema] = useState([]);

    useEffect(()=>{

        console.log("useEffect disparando!")
        async function fetchSubtema(){
            const response =  await getSubtema();
            console.log(response);
            setSubtema(response);
            const subtema = setSubtema(response);
        }

        fetchSubtema();
    }, [])


    async function handleDelete(id){
        const confirm = window.confirm("deseja realmente?");
        if(!confirm) return;

        try{
            await deleteSubtema(id);
            setSubtema(prev => prev.filter (s => s.id !== id));

        } catch (err){
            console.error(err);
            alert("Erro ao apagar matéria");
        }


    }


    return (
        <div className="p-4 m-4 bg-white rounded-xl shadow-md">
            <h1 className="mb-4 ml-2 text-lg font-semibold text-gray-700">
                Lista de subtemas existentes:
            </h1>
            <ol className="list-decimal pl-6 space-y-2">
                {subtema.map((s) => (
                    <li
                        key={s.id}
                        className="flex justify-between items-center bg-gray-50 p-2 rounded-lg hover:bg-gray-100 transition"
                    >
                        <span className="text-gray-800">{s.nome}</span>
                        <button
                            onClick={() => handleDelete(s.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg shadow-sm transition"
                        >
                            Apagar
                        </button>
                    </li>
                ))}
            </ol>
        </div>
    )
}