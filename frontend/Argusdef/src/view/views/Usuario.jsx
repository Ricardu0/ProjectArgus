import React, { useState, useEffect } from 'react';
import {listUsuario} from '../../controller/api/listUsuario';

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        listUsuario()
            .then(response => {
                const lista = response.data || response;
                setUsuarios(lista);
            })
            .catch(err => console.error('Erro ao buscar usuários:', err));
    }, []);

    return (
            <div className="m-auto p-4 bg-emerald-400">
                {/* Teste de CSS customizado ou Tailwind */}

                <div className="bg-green-900 p-8 text-white mb-4 mr-8 ml-8 justify-items-center rounded-lg m-auto border-8 border-white">
                    <p>Lista de usuarios</p>
                </div>

                {/* Lista de usuários */}
                <div className="p-2 m-8">
                    <ul className="rounded-md">
                        {usuarios.map(u => (
                            <li className='bg-white
                        border-2 border-solid
                        border-green-500
                         rounded-md
                         mb-4
                         hover:border-4 border-green-400
                            '
                                key={u.id}>
                                <div className="bold text-xl justify-between m-3 p-1 mb-1 rounded-xl font-thin">
                                    <p> Id: {u.id}</p>
                                    <p> Nome: {u.nome}</p>
                                    <p> Email: {u.email} </p>

                                    <div className="mt-2">
                                        <button className="bg-red-600 align-left rounded-md p-1.5 mb-3 text-white hover:bg-pink-700"> Deletar </button>
                                        <button className="bg-blue-900 align-right ml-3 rounded-md p-1.5 text-white hover:bg-blue-600"> Atualizar </button>
                                    </div>

                                    <br/>
                                </div>

                            </li>
                        ))}
                    </ul>
                </div>


            </div>
    );
}
