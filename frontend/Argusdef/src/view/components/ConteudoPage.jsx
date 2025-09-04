import {useEffect, useState} from "react";
import {getMateria} from "../../controller/api/getMateria";
import {getTema} from "../../controller/api/getTemas";
import {getSubtema} from "../../controller/api/getSubtema";
import {getConteudo} from "../../controller/api/getConteudo";
import {getTemaById} from "../../controller/api/getTemaById";
import {getMateriaById} from "../../controller/api/getMateriaById";
import {postConteudo} from "../../controller/api/postConteudo";

export default function ConteudoPage() {
    const [materias, setMaterias] = useState([]);
    const [tema, setTema] = useState([]);
    const [subtema, setSubtema] = useState([]);
    const [conteudo, setConteudo] = useState([]);

    const [mSelect, setMSelect] = useState(null);
    const [tSelect, setTSelect] = useState(null);
    const [sSelect, setSSelect] = useState(null);

    const [descricao, setDescricao] = useState("");
    const [texto, setTexto] = useState("");
    const [linkReferencia, setLinkReferencia] = useState("");

    useEffect(() => {
        async function fetchMaterias() {
            const data = await getMateria();
            setMaterias(data);
        }
        fetchMaterias();
    }, []);

    async function handleMateriaSelecionado(idMateria) {
        setMSelect(idMateria);
        setTSelect(null);
        setSSelect(null);
        setSubtema([]);
        const m = await getMateriaById(idMateria);
        setTema(m.temas || []);
    }

    async function handleTemaSelecionado(idTema) {
        setTSelect(idTema);
        setSSelect(null);
        const t = await getTemaById(idTema);
        setSubtema(t.subtema || []);
    }

    function handleSubtemaSelecionado(idSubtema) {
        setSSelect(idSubtema);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await postConteudo({
                descricao,
                texto,
                linkReferencia,
                subtema: { id: sSelect }
            });
            alert("Conteúdo criado com sucesso!");
            setDescricao("");
            setTexto("");
            setLinkReferencia("");
        } catch (err) {
            console.error("Erro ao criar conteúdo:", err);
            alert("Erro ao criar conteúdo");
        }
    }

    return (
        <div className="ml-4 mr-4 p-4 space-y-8 drop-shadow">
            <h1 className="font-semibold text-white bg-orange-500 rounded-xl p-2 text-center">
                Criar Conteúdo
            </h1>

            <div className="space-y-4">
                {/* Matéria */}
                <div>
                    <label className="block mb-1 font-medium">1.0 Selecione uma matéria</label>
                    <select
                        className="w-full p-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-orange-500"
                        value={mSelect || ""}
                        onChange={(e) => handleMateriaSelecionado(e.target.value)}
                    >
                        <option value="">clique aqui e selecione</option>
                        {materias.map((m) => (
                            <option key={m.id} value={m.id}>
                                {m.nome}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Tema */}
                {tema.length > 0 && (
                    <div>
                        <label className="block mb-1 font-medium">2.0 Selecione um Tema</label>
                        <select
                            className="w-full p-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-orange-500"
                            value={tSelect || ""}
                            onChange={(e) => handleTemaSelecionado(e.target.value)}
                        >
                            <option value="">Selecione um tema</option>
                            {tema.map((t) => (
                                <option key={t.id} value={t.id}>
                                    {t.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Subtema */}
                {subtema.length > 0 && (
                    <div>
                        <label className="block mb-1 font-medium">3.0 Selecione um Subtema</label>
                        <select
                            className="w-full p-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-orange-500"
                            value={sSelect || ""}
                            onChange={(e) => handleSubtemaSelecionado(e.target.value)}
                        >
                            <option value="">Selecione um subtema</option>
                            {subtema.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {/* Formulário */}
            {sSelect && (
                <form onSubmit={handleSubmit} className="space-y-4 border-t pt-6">
                    <div>
                        <label className="block mb-1 font-medium">4.0 Escreva a Descrição, texto, e o link se houver.</label>
                        <h1> Escreva uma descriçao</h1>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Texto</label>
                        <textarea
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                            rows="5"
                            value={texto}
                            onChange={(e) => setTexto(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Link de Referência</label>
                        <input
                            type="url"
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                            value={linkReferencia}
                            onChange={(e) => setLinkReferencia(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
                    >
                        Salvar Conteúdo
                    </button>
                </form>
            )}
        </div>
    );
}
