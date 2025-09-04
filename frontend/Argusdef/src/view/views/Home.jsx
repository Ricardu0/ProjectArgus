import React, { useEffect, useRef, useState } from "react";
import { ChevronRight, Book, FileText, Folder, ExternalLink } from "lucide-react";
import { getMateria } from "../../controller/api/getMateria";
import { getTema } from "../../controller/api/getTemas";
import { getSubtema } from "../../controller/api/getSubtema";
import { getConteudo } from "../../controller/api/getConteudo";
import { getTemaById } from "../../controller/api/getTemaById";
import { getMateriaById } from "../../controller/api/getMateriaById";

import Sidebar from "../components/Sidebar";

// util: tenta extrair parentId de várias formas possíveis (mais abrangente)
const matchesParent = (item, parentId, possibleKeys = ["materia", "materiaId", "materia_id", "tema", "temaId", "tema_id", "subtema", "subtemaId", "subtema_id", "parent", "parentId", "parent_id"]) => {
    if (!item) return false;
    const pid = String(parentId);

    // checa variações diretas e objetos com id
    for (const k of possibleKeys) {
        if (Object.prototype.hasOwnProperty.call(item, k)) {
            const v = item[k];
            if (v && typeof v === "object" && "id" in v && String(v.id) === pid) return true;
            if (v != null && String(v) === pid) return true;
        }
    }

    // checa nested comuns
    if (item.materia && item.materia.id && String(item.materia.id) === pid) return true;
    if (item.tema && item.tema.id && String(item.tema.id) === pid) return true;
    if (item.subtema && item.subtema.id && String(item.subtema.id) === pid) return true;

    // procura dentro de objetos aninhados (ex: item.someObj?.id)
    for (const val of Object.values(item)) {
        if (val && typeof val === "object" && "id" in val && String(val.id) === pid) return true;
    }

    return false;
};

const LevelBadge = ({ level }) => {
    const configs = [
        { color: "bg-gradient-to-r from-blue-400 to-blue-500", shadow: "shadow-blue-200" },
        { color: "bg-gradient-to-r from-emerald-400 to-emerald-500", shadow: "shadow-emerald-200" },
        { color: "bg-gradient-to-r from-purple-400 to-purple-500", shadow: "shadow-purple-200" },
        { color: "bg-gradient-to-r from-orange-400 to-orange-500", shadow: "shadow-orange-200" }
    ];
    const config = configs[level] || configs[3];
    return <span className={`w-3 h-3 ${config.color} rounded-full inline-block mr-3 shadow-lg ${config.shadow}`} />;
};

export default function Home() {
    const [materias, setMaterias] = useState([]);
    const [temas, setTemas] = useState([]);
    const [subtemas, setSubtemas] = useState([]);
    const [conteudos, setConteudos] = useState([]);

    const [selMateria, setSelMateria] = useState(null);
    const [selTema, setSelTema] = useState(null);
    const [selSubtema, setSelSubtema] = useState(null);

    const [loading, setLoading] = useState({ materias: true, temas: false, subtemas: false, conteudos: false });
    const [error, setError] = useState(null);

    // caches para listas gerais (quando endpoint retorna tudo)
    const cacheRef = useRef({ temasAll: null, subtemasAll: null, conteudosAll: null });

    // token anti-race
    const reqToken = useRef(0);

    useEffect(() => {
        let mounted = true;
        (async () => {
            setLoading(l => ({ ...l, materias: true }));
            try {
                const m = await getMateria();
                if (!mounted) return;
                setMaterias(Array.isArray(m) ? m : []);
            } catch (err) {
                console.error(err);
                setError("Erro ao carregar matérias");
            } finally {
                if (mounted) setLoading(l => ({ ...l, materias: false }));
            }
        })();
        return () => { mounted = false; };
    }, []);

    // função genérica para obter temas de uma matéria (tenta getMateriaById -> fallback para getTema + filter)
    const fetchTemasParaMateria = async (materiaId) => {
        setLoading(l => ({ ...l, temas: true }));
        setError(null);
        const token = ++reqToken.current;

        try {
            if (typeof getMateriaById === "function") {
                try {
                    const m = await getMateriaById(materiaId);
                    if (reqToken.current !== token) return;
                    const temasFromM = (m && (m.temas || m.tema || m.topics)) || [];
                    setTemas(Array.isArray(temasFromM) ? temasFromM : []);
                    return;
                } catch (e) {
                    console.debug("getMateriaById falhou, fallback para getTema/filter", e);
                }
            }

            if (typeof getTemaById === "function") {
                try {
                    const res = await getTemaById(materiaId);
                    if (reqToken.current !== token) return;
                    const arr = Array.isArray(res) ? res : (res && res.temas ? res.temas : []);
                    setTemas(Array.isArray(arr) ? arr : []);
                    return;
                } catch (e) {
                    console.debug("getTemaById falhou, fallback para getTema()", e);
                }
            }

            if (!cacheRef.current.temasAll) {
                const all = await getTema();
                cacheRef.current.temasAll = Array.isArray(all) ? all : [];
            }
            if (reqToken.current !== token) return;
            const filtered = cacheRef.current.temasAll.filter(t => matchesParent(t, materiaId, ["materiaId", "materia", "materia_id"]));
            setTemas(filtered);
        } catch (err) {
            console.error(err);
            if (reqToken.current === token) setError("Erro ao carregar temas");
        } finally {
            if (reqToken.current === token) setLoading(l => ({ ...l, temas: false }));
        }
    };

    // fetch subtemas para um tema (tenta getTemaById -> fallback getSubtema + filter)
    const fetchSubtemasParaTema = async (temaId) => {
        setLoading(l => ({ ...l, subtemas: true }));
        setError(null);
        const token = ++reqToken.current;
        try {
            if (typeof getTemaById === "function") {
                try {
                    const t = await getTemaById(temaId);
                    if (reqToken.current !== token) return;
                    const sub = (t && (t.subtema || t.subtemas || t.children)) || [];
                    setSubtemas(Array.isArray(sub) ? sub : []);
                    return;
                } catch (e) {
                    console.debug("getTemaById falhou no fetchSubtemas, fallback", e);
                }
            }

            if (!cacheRef.current.subtemasAll) {
                const all = await getSubtema();
                cacheRef.current.subtemasAll = Array.isArray(all) ? all : [];
            }
            if (reqToken.current !== token) return;
            const filtered = cacheRef.current.subtemasAll.filter(s => matchesParent(s, temaId, ["temaId", "tema", "tema_id"]));
            setSubtemas(filtered);
        } catch (err) {
            console.error(err);
            if (reqToken.current === token) setError("Erro ao carregar subtemas");
        } finally {
            if (reqToken.current === token) setLoading(l => ({ ...l, subtemas: false }));
        }
    };

    // fetch conteudos para subtema (melhorado: filtra sempre, mesmo se getConteudo(subId) devolver array geral)
    const fetchConteudosParaSubtema = async (subId) => {
        setLoading(l => ({ ...l, conteudos: true }));
        setError(null);
        const token = ++reqToken.current;

        try {
            // 1) tenta chamar getConteudo(subId) — pode retornar array ou objeto
            try {
                const res = await getConteudo(subId);
                // se res for array, MAS pode ser lista geral, então filtramos e só usamos se houver correspondência
                if (Array.isArray(res)) {
                    const filtered = res.filter(c => matchesParent(c, subId, ["subtemaId", "subtema", "subtema_id", "temaId", "tema"]));
                    if (filtered.length > 0) {
                        if (reqToken.current === token) setConteudos(filtered);
                        return;
                    }
                    // se nenhum item bateu, não assumimos que array veio já filtrado — vamos para fallback abaixo
                } else if (res && typeof res === "object") {
                    // extrai arrays comuns e filtra
                    const maybe = res.conteudos || res.data || res.items || res.results || Object.values(res).find(v => Array.isArray(v));
                    if (Array.isArray(maybe)) {
                        const filtered = maybe.filter(c => matchesParent(c, subId, ["subtemaId", "subtema", "subtema_id", "temaId", "tema"]));
                        if (filtered.length > 0) {
                            if (reqToken.current === token) setConteudos(filtered);
                            return;
                        }
                    }
                }
            } catch (e) {
                console.debug("getConteudo(subId) não retornou conteúdos filtrados ou lançou erro; seguindo para fallback", e);
            }

            // 2) fallback: buscar todos e filtrar no cliente (usa cache)
            if (!cacheRef.current.conteudosAll) {
                const all = await getConteudo(); // sem id
                // tenta extrair um array do retorno
                cacheRef.current.conteudosAll = Array.isArray(all) ? all : (all && (all.data || all.conteudos || all.items || all.results) ? (all.data || all.conteudos || all.items || all.results) : []);
            }
            if (reqToken.current !== token) return;
            const candidates = cacheRef.current.conteudosAll || [];
            const filtered = candidates.filter(c => matchesParent(c, subId, ["subtemaId", "subtema", "subtema_id", "temaId", "tema"]));
            if (reqToken.current === token) setConteudos(filtered);
        } catch (err) {
            console.error(err);
            if (reqToken.current === token) setError("Erro ao carregar conteúdos");
        } finally {
            if (reqToken.current === token) setLoading(l => ({ ...l, conteudos: false }));
        }
    };

    // handlers (toggle behavior)
    const handleMateriaClick = async (m) => {
        if (String(selMateria) === String(m.id)) {
            setSelMateria(null);
            setTemas([]);
            setSelTema(null);
            setSubtemas([]);
            setSelSubtema(null);
            setConteudos([]);
            return;
        }
        setSelMateria(m.id);
        setSelTema(null);
        setSubtemas([]);
        setSelSubtema(null);
        setConteudos([]);
        await fetchTemasParaMateria(m.id);
    };

    const handleTemaClick = async (t) => {
        if (String(selTema) === String(t.id)) {
            setSelTema(null);
            setSubtemas([]);
            setSelSubtema(null);
            setConteudos([]);
            return;
        }
        setSelTema(t.id);
        setSelSubtema(null);
        setConteudos([]);
        await fetchSubtemasParaTema(t.id);
    };

    const handleSubtemaClick = async (s) => {
        if (String(selSubtema) === String(s.id)) {
            setSelSubtema(null);
            setConteudos([]);
            return;
        }
        setSelSubtema(s.id);
        await fetchConteudosParaSubtema(s.id);
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 overflow-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8">
                <h1 className="text-2xl font-bold mb-4">Exploração de Conteúdo </h1>

                <section className="bg-white rounded-2xl p-6 shadow mb-6">
                    <div className="flex items-center mb-4">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                            <Folder className="w-6 h-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <h2 className="font-bold">Matérias</h2>
                            <p className="text-sm text-gray-500">Clique para ver temas (usa getMateriaById/getTema ou filtra localmente)</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {materias.map(m => (
                            <button
                                key={m.id}
                                type="button"
                                onClick={() => handleMateriaClick(m)}
                                className={`group flex items-center px-5 py-2 rounded-xl border transition
                  ${String(selMateria) === String(m.id) ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white" : "border-gray-200"}`}
                            >
                                <LevelBadge level={0} />
                                <span className="font-medium">{m.nome}</span>
                                <ChevronRight className={`w-4 h-4 ml-2 ${String(selMateria) === String(m.id) ? "rotate-90" : ""}`} />
                            </button>
                        ))}
                    </div>
                </section>

                {selMateria && (
                    <section className="bg-white rounded-2xl p-6 shadow mb-6">
                        <div className="flex items-center mb-4">
                            <div className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl">
                                <Book className="w-6 h-6 text-white" />
                            </div>
                            <div className="ml-4">
                                <h2 className="font-bold">Temas</h2>
                                <p className="text-sm text-gray-500">{loading.temas ? "Carregando..." : "Selecione um tema"}</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {temas.length === 0 && !loading.temas && <div className="text-gray-500">Nenhum tema</div>}
                            {temas.map(t => (
                                <button
                                    key={t.id}
                                    type="button"
                                    onClick={() => handleTemaClick(t)}
                                    className={`group flex items-center px-5 py-2 rounded-xl border transition
                    ${String(selTema) === String(t.id) ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white" : "border-gray-200"}`}
                                >
                                    <LevelBadge level={1} />
                                    <span className="font-medium">{t.nome}</span>
                                    <ChevronRight className={`w-4 h-4 ml-2 ${String(selTema) === String(t.id) ? "rotate-90" : ""}`} />
                                </button>
                            ))}
                        </div>
                    </section>
                )}

                {selTema && (
                    <section className="bg-white rounded-2xl p-6 shadow mb-6">
                        <div className="flex items-center mb-4">
                            <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
                                <FileText className="w-6 h-6 text-white" />
                            </div>
                            <div className="ml-4">
                                <h2 className="font-bold">Subtemas</h2>
                                <p className="text-sm text-gray-500">{loading.subtemas ? "Carregando..." : "Selecione um subtema"}</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {subtemas.length === 0 && !loading.subtemas && <div className="text-gray-500">Nenhum subtema</div>}
                            {subtemas.map(s => (
                                <button
                                    key={s.id}
                                    type="button"
                                    onClick={() => handleSubtemaClick(s)}
                                    className={`group flex items-center px-5 py-2 rounded-xl border transition
                    ${String(selSubtema) === String(s.id) ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white" : "border-gray-200"}`}
                                >
                                    <LevelBadge level={2} />
                                    <span className="font-medium">{s.nome}</span>
                                    <ChevronRight className={`w-4 h-4 ml-2 ${String(selSubtema) === String(s.id) ? "rotate-90" : ""}`} />
                                </button>
                            ))}
                        </div>
                    </section>
                )}

                {selSubtema && (
                    <section className="bg-white rounded-2xl p-6 shadow">
                        <div className="flex items-center mb-4">
                            <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl">
                                <FileText className="w-6 h-6 text-white" />
                            </div>
                            <div className="ml-4">
                                <h2 className="font-bold">Conteúdos</h2>
                                <p className="text-sm text-gray-500">{loading.conteudos ? "Carregando..." : "Conteúdos relacionados"}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {conteudos.length === 0 && !loading.conteudos && <div className="text-gray-500">Nenhum conteúdo</div>}
                            {conteudos.map(c => (
                                <div key={c.id || `${c.descricao}-${Math.random()}`} className="p-4 border rounded">
                                    <div className="flex items-start">
                                        <div className="mr-4 p-2 bg-orange-100 rounded">
                                            <FileText className="w-5 h-5 text-orange-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{c.descricao}</h3>
                                            <p className="text-sm text-gray-600">{c.texto}</p>
                                            {c.linkReferencia && (
                                                <a href={c.linkReferencia} target="_blank" rel="noreferrer" className="text-blue-600 inline-flex items-center mt-2">
                                                    Ver referência <ExternalLink className="w-4 h-4 ml-2" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {error && <div className="text-red-500 mt-4">{error}</div>}
            </div>
        </div>
    );
}
