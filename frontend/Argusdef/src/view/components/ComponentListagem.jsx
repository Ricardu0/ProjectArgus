import { useEffect, useState } from "react";
import { getMaterias } from "../../controller/api/getMaterias"; // ajuste o caminho se precisar

export default function ComponentListagem({ onSelectMateria }) {
    const [mat, setMat] = useState([]);

    useEffect(() => {
        async function fetchMaterias() {
            try {
                const data = await getMaterias();
                setMat(data);
            } catch (err) {
                console.log("Erro ao buscar matérias:", err);
            }
        }
        fetchMaterias();
    }, []);

    return (
        <div>
            {mat.map((materia) => (
                <button key={materia.id} onClick={() => onSelectMateria(materia)}>
                    {materia.nome}
                </button>
            ))}
        </div>
    );
}
