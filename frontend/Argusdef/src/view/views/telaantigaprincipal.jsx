import React, { useState, useEffect } from 'react';
import { getTema } from '../../controller/api/getTemas';
import { getMateria } from '../../controller/api/getMateria';
import { getSubtema } from '../../controller/api/getSubtema';
import { getConteudo } from '../../controller/api/getConteudo';

/**
 * TreeNode: componente recursivo que carrega e exibe filhos ao clicar
 */
const TreeNode = ({ label, id, fetchFn, nextFetchList = [], level = 0 }) => {
    const [expanded, setExpanded] = useState(false);
    const [children, setChildren] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const toggle = async () => {
        setExpanded(prev => !prev);
        if (!loaded && fetchFn) {
            try {
                const data = await fetchFn(id);
                setChildren(data);
            } catch (err) {
                console.error(`Erro ao buscar filhos de ${label}:`, err);
            } finally {
                setLoaded(true);
            }
        }
    };

    const nextFetch = nextFetchList[level + 1] || null;

    return (
        <div className={`ml-${level * 4} mb-2`}>  {/* indentação dinâmica e espaçamento entre nós */}
            <div
                className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition"
                onClick={toggle}
            >
        <span className="font-semibold w-5 text-blue-500">
          {expanded ? '▾' : '▸'}
        </span>
                <span className="ml-2 text-gray-800 font-medium hover:text-blue-600">
          {label}
        </span>
            </div>

            {expanded && loaded && (
                <div className="border-l-2 border-blue-100 pl-4">
                    {children.length ? (
                        children.map(child => (
                            <TreeNode
                                key={child.id}
                                label={child.nome}
                                id={child.id}
                                fetchFn={nextFetch}
                                nextFetchList={nextFetchList}
                                level={level + 1}
                            />
                        ))
                    ) : (
                        <div className="ml-6 text-sm italic text-gray-500">Sem itens</div>
                    )}
                </div>
            )}
        </div>
    );
};

/**
 * Home: componente principal que exibe a árvore completa
 */
const Home = () => {
    const [materias, setMaterias] = useState([]);

    useEffect(() => {
        const loadMaterias = async () => {
            try {
                const data = await getMateria();
                setMaterias(data);
            } catch (err) {
                console.error('Erro ao buscar matérias:', err);
            }
        };
        loadMaterias();
    }, []);

    // funções para cada nível
    const fetchFunctions = [getTema, getSubtema, getConteudo];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6">
                <h1 className="text-3xl font-extrabold text-center mb-6 text-blue-700">
                    Árvore de Matérias
                </h1>
                <div className="divide-y divide-gray-200">
                    {materias.map(materia => (
                        <TreeNode
                            key={materia.id}
                            label={materia.nome}
                            id={materia.id}
                            fetchFn={fetchFunctions[0]}
                            nextFetchList={fetchFunctions}
                            level={0}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default xis;
