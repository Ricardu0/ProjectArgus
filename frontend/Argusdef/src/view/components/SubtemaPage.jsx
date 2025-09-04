import { useState, useEffect } from "react";
import { getMateria } from "../../controller/api/getMateria";
import { getMateriaById } from "../../controller/api/getMateriaById";
import { postSubtema } from "../../controller/api/postSubtema";

export default function CriarSubtemaPage() {
    const [materias, setMaterias] = useState([]);
    const [materiaSelecionada, setMateriaSelecionada] = useState(null);
    const [temas, setTemas] = useState([]);
    const [temaSelecionado, setTemaSelecionado] = useState(null);
    const [subtemasDoTema, setSubtemasDoTema] = useState([]);
    const [nomeSubtema, setNomeSubtema] = useState("");

    useEffect(() => {
        async function fetchMaterias() {
            const data = await getMateria();
            setMaterias(data);
        }
        fetchMaterias();
    }, []);

    async function handleMateriaClick(materia) {
        setMateriaSelecionada(materia);
        setTemaSelecionado(null);
        setTemas([]);
        setSubtemasDoTema([]);
        setNomeSubtema("");
        const fullMateria = await getMateriaById(materia.id);
        setTemas(fullMateria.temas || []);
    }

    function handleTemaChange(e) {
        const temaId = parseInt(e.target.value);
        const tema = temas.find(t => t.id === temaId);
        setTemaSelecionado(tema);
        setSubtemasDoTema(tema?.subtema || []);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!temaSelecionado || !nomeSubtema.trim()) {
            alert("Preencha todos os campos");
            return;
        }
        try {
            await postSubtema({
                nome: nomeSubtema,
                tema: { id: temaSelecionado.id }
            });
            alert("Subtema criado com sucesso!");
            setNomeSubtema("");
        } catch (err) {
            console.error("Erro ao criar subtema:", err);
            alert("Erro ao criar subtema");
        }
    }

    return (
        <div className="m-4 p-4 bg-gray-50 rounded-xl shadow-md">
            {/* Título */}
            <h2 className="text-base font-semibold text-center bg-green-600 text-white py-3 rounded-lg mb-6">
                Criar Subtema
            </h2>

            <div className="space-y-8">
                {/* 1. Seleção de Matéria */}
                <section>
                    <h3 className="text-lg font-medium mb-2">1. Selecione uma Matéria</h3>
                    <div className="flex flex-wrap gap-2">
                        {materias.map(m => (
                            <button
                                key={m.id}
                                onClick={() => handleMateriaClick(m)}
                                className={`
                  px-4 py-2 rounded-md border 
                  ${materiaSelecionada?.id === m.id
                                    ? "bg-green-600 text-white border-emerald-600"
                                    : "bg-white text-gray-800 border-gray-300 hover:bg-emerald-100"}
                `}
                            >
                                {m.nome}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Mensagem caso não haja temas */}
                {temas.length === 0 && materiaSelecionada && (
                    <div className="bg-red-100 text-red-800 p-3 rounded-md text-center">
                        Nenhum tema criado nessa matéria.
                    </div>
                )}

                {/* 2. Seleção de Tema */}
                {temas.length > 0 && (
                    <section>
                        <h3 className="text-lg font-medium mb-2">2. Selecione um Tema</h3>
                        <select
                            value={temaSelecionado?.id || ""}
                            onChange={handleTemaChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                        >
                            <option value="">-- Escolha um tema --</option>
                            {temas.map(t => (
                                <option key={t.id} value={t.id}>
                                    {t.nome}
                                </option>
                            ))}
                        </select>
                    </section>
                )}

                {/* 3. Subtemas Existentes */}
                {subtemasDoTema.length > 0 && (
                    <section>
                        <h3 className="text-lg font-medium mb-2">
                            Subtemas já existentes neste tema
                        </h3>
                        <ul className="list-disc pl-5 space-y-1">
                            {subtemasDoTema.map(s => (
                                <li key={s.id} className="text-gray-700">
                                    {s.nome}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}


                {/* 4. Formulário de Criação */}
                {temaSelecionado && (
                    <section>
                        <h3 className="text-lg font-medium mb-2">3. Nome do novo Subtema</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                value={nomeSubtema}
                                onChange={e => setNomeSubtema(e.target.value)}
                                required
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                            <button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-emerald-400 text-white font-semibold py-2 rounded-md transition"
                            >
                                Criar Subtema
                            </button>
                        </form>
                    </section>
                )}
            </div>
        </div>
    );
}
