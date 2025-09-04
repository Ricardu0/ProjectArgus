import { useState } from "react";
import { useAuth } from "../../controller/api/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await login({ email, senha: password }); // passa OBJETO

        if (res.ok) {
            navigate("/"); // redireciona
        } else {
            alert(res.error || "Credenciais inválidas");
        }
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-2xl shadow-lg border border-green-100"
                >
                    <h2 className="text-3xl font-bold text-green-800 text-center mb-8">
                        Login
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <input
                                type="email"
                                placeholder="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-200 text-gray-700 placeholder-gray-400"
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="password"
                                placeholder="Senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all duration-200 text-gray-700 placeholder-gray-400"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 shadow-lg"
                        >
                            Entrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}