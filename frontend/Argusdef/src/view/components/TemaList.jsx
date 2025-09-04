import {useEffect, useState} from "react";
import {getTema} from "../../controller/api/getTemas";

export default function TemaList() {

    const [tema, setTema] = useState([]);


    useEffect(()=>{
        async function fetchTemas(){
            const data = await getTema();
            setTema(data);
            return data;
            console.log(data);

    }
        fetchTemas();

       }, [])



    return (
        <div className="max-w-90 mx-auto bg-white rounded-2xl shadow-lg p-6 mr-6 ml-6 mt-6 mb-6">
            <h2 className="text-lg font-semibold mb-4 bg-purple-600 p-2 text-white rounded-xl text-center">
                Lista de Temas
            </h2>
            <ol className="list-decimal pl-6 space-y-2">
                {tema.map((t) => (
                    <li
                        key={t.id}
                        className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition flex items-center"
                    >
                        <span className="text-gray-800">{t.nome}</span>
                    </li>
                ))}
            </ol>
        </div>




    )
}