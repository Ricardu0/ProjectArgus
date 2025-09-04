// BotaoVoltar.jsx
import { useNavigate } from 'react-router-dom';

export default function BotaoVoltar() {
    const navigate = useNavigate();

    const handleVoltar = () => {
        navigate(-1); // Volta uma página no histórico
    };

    return (
        <div>
            <button onClick={handleVoltar}
                    className="bg-white
                    p-2 ml-7 mb-4 mt-4
                    border-2
                    border-blue-900
                    rounded-xl
                    drop-shadow

                    hover:bg-blue-300 hover:text-white
                    hover:scale-110 transition duration-100
                    "


            >
            Voltar
            </button>
        </div>
    );
}
