import React, { useState, useEffect } from 'react';
import { getMateria } from '../../controller/api/getMateria';
import { postTema } from '../../controller/api/postTema';

export default function TemaPage() {
    const [materias, setMaterias] = useState([]);
    const [form, setForm] = useState({ nome: '', ensino: '', materiaId: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        async function fetchMaterias() {
            try {
                const data = await getMateria();
                setMaterias(data);
            } catch (err) {
                setError('Falha ao carregar matérias.');
            }
        }
        fetchMaterias();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);
        try {
            await postTema(
                { nome: form.nome, ensino: form.ensino },
                form.materiaId
            );
            setSuccess(true);
            setForm({ nome: '', ensino: '', materiaId: '' });
        } catch (err) {
            setError('Erro ao cadastrar tema.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-90 mx-auto bg-white rounded-2xl shadow-lg p-6 mr-6 ml-6">
            <h2 className="text-lg font-semibold mb-4
            bg-purple-600 p-2 text-white rounded-xl
            justify-items-center"> Cadastrar Novo Tema</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="nome" className="block">Nome do Tema</label>
                    <input
                        name="nome"
                        id="nome"
                        type="text"
                        value={form.nome}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border rounded-md p-2"
                    />
                </div>

                <div>
                    <label htmlFor="ensino" className="block">Nível de Ensino</label>
                    <select
                        name="ensino"
                        id="ensino"
                        value={form.ensino}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border rounded-md p-2"
                    >
                        <option disabled value="">Selecione...</option>
                        <option value="FUNDAMENTAL">Fundamental</option>
                        <option value="MEDIO">Médio</option>
                        <option value="SUPERIOR">Superior</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="materiaId" className="block">Matéria</label>
                    <select
                        name="materiaId"
                        id="materiaId"
                        value={form.materiaId}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border rounded-md p-2"
                    >
                        <option disabled value="">Selecione...</option>
                        {materias.map((mat) => (
                            <option key={mat.id} value={mat.id}>
                                {mat.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-400 text-white rounded-md
                    hover:scale-105
                    hover: transition duration-200"
                    disabled={loading}
                >
                    {loading ? 'Enviando...' : 'Cadastrar Tema'}
                </button>
            </form>
            {error && <p className="mt-4 text-red-600">{error}</p>}
            {success && <p className="mt-4 text-green-600">Tema cadastrado com sucesso!</p>}
        </div>
    );
}
