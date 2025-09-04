import React, {useEffect, useState} from "react";
import {getMateria} from "../../controller/api/getMateria";

const Counter = () => {

    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchMaterias = async () => {

            try{
                const data = await getMateria();
                setCount(data.length);
            } catch (error) {
                setError('ERRO AO CARREGAR A MATÉRIA') }
            finally {
                setLoading(false);
            }
        }

        fetchMaterias();}, [])


    return (
        <div>
        <div className="flex flex-wrap items-center justify-center">
            <h1>
                 Quantidade de matérias
            </h1>
            {loading && <p className="text-gray-600 mb-6">{loading}</p>}
            {error && <p className="text-gray-600 mb-6">{error}</p>}
            {!loading && !error && (
                <p className="text-gray-600 mb-6"> {count}</p>
            )}
        </div>

        </div>


    )


}

export default Counter;