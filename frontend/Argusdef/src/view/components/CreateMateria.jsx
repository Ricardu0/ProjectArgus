import { postMateria } from '../../controller/api/postMateria';
import { useState } from 'react';

export default function CreateMateria() {
    const [materia, setMateria] = useState({ nome: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMateria({ ...materia, [name]: value });
    };

    const handleSubmit = async (e) => {
        try {
            await postMateria(materia);
            alert('Cadastrado com sucesso!');
            setMateria({ nome: '' });
        } catch (error) {
            alert('Erro ao criar matéria');
            console.error(error);
        }
    };

    return (
        <div className="ml-3 mr-3 p-4">
        <form
            onSubmit={handleSubmit}
            className="space-y-4 p-8 mx-auto bg-white rounded-xl shadow-md"
        >
            <h2 className="text-lg font-bold text-white bg-blue-800 mr-4 p-2 rounded-xl">Criar Matéria</h2>

            <input
                name="nome"
                value={materia.nome}
                onChange={handleChange}
                placeholder="Nome da Matéria"
                className="w-full border p-2 rounded-xl"
                required
            />

            <button
                type="submit"
                className="bg-blue-700 text-white px-4 py-2 rounded
                border border-transparent hover:border-white
                hover:bg-blue-500
                hover:scale-110
                hover:border-blue
                transition duration-300"
            >
                Crie já!
            </button>
        </form>
        </div>
    );
}