import {useEffect, useState} from "react";
import {getConteudo} from "../../controller/api/getConteudo";

export default function ConteudoList() {
    const [Conteudo, setConteudo] = useState([]);

    useEffect(()=>{
        const fetchConteudo = async () => {
            const data = await getConteudo();
            console.log(data);
            setConteudo(data);
            return data;

        }
        fetchConteudo();

    }, [])

    return (
        <div className="p-4 m-4 ml-6 mb-6 mr-6 bg-gray-50 rounded-lg shadow-md drop-shadow mb-4 mt-6">
            <h2 className="text-2xl font-bold mb-4 text-orange-500">Lista de Conteúdos</h2>
            <ol className="list-decimal pl-6 space-y-3 mb-4">
                {Conteudo.map((conteudo) => (
                    <li key={conteudo.id} className="text-gray-700 bg-white p-4 rounded-lg shadow hover:bg-gray-50 transition">
                        <span className="font-semibold text-orange-600">{conteudo.descricao}</span>:{" "}
                        <span>{conteudo.texto}</span>
                    </li>
                ))}
            </ol>
        </div>
    );


}