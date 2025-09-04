import { getMateria }      from "../../controller/api/getMateria";
import { deleteMateria }   from "../../controller/api/deleteMateria";
import { useEffect,
    useState }        from "react";

export default function ListMaterias() {
    const [materias, setMaterias] = useState([]);

    useEffect(() => {
        async function fetchMaterias() {
            const data = await getMateria();
            setMaterias(data);
        }
        fetchMaterias();
    }, []);

    // handler de delete com confirmação
    async function handleDelete(id) {
        const confirmou = window.confirm("Deseja apagar esta matéria?");
        if (!confirmou) return;

        try {
            await deleteMateria(id);
            // filtra do estado quem foi apagado
            setMaterias(prev => prev.filter(m => m.id !== id));
        } catch (err) {
            console.error(err);
            alert("Erro ao apagar matéria");
        }
    }

    return (
        <div className="p-4">
            <div className="bg-white drop-shadow-md p-8 m-auto text-left rounded-xl ml-3 mr-3">
                <h1 className="bg-blue-800 m-2 text-left p-3 rounded-xl text-white tracking-wide text-lg font-extrabold mb-5 shadow">
                    📚 Listagem de Matérias
                </h1>
                <div className="text-lg drop-shadow-md bg-gradient-to-r from-white to-blue-50 rounded-xl">
                    <ul className="w-full p-5 transition duration-200">
                        {materias.map((materia) => (
                            <li key={materia.id} className="flex justify-between items-center mb-2">
                <span>
                  ID: {materia.id} — Nome: {materia.nome}
                </span>
                                <button
                                    onClick={() => handleDelete(materia.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    Apagar
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
