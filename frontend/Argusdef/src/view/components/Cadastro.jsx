import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../controller/api/AuthContext";

export default function Cadastro() {
    const [usuario, setUsuario] = useState({ nome: "", email: "", senha: "" });
    const [msg, setMsg] = useState("");
    const [erro, setErro] = useState("");
    const nav = useNavigate();
    const { register, loading } = useAuth();

    function handleChange(e) {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setMsg(""); setErro("");
        const res = await register(usuario);
        if (res.ok) {
            setMsg("Cadastro realizado! Faça login.");
            setTimeout(() => nav("/login"), 1200);
        } else {
            setErro(res.error?.message || "Erro no cadastro");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md p-4 mt-4 border-green-100 border-2 shadow-md space-y-4 rounded-3xl
        bg-gradient-to-r from-white to-emerald-50
        ">
            <div>
                <label className="font-bold">Nome:</label>
                <input name="nome" value={usuario.nome} onChange={handleChange} className="w-full border rounded-xl p-2 hover:border-2 border-green-500" />
            </div>
            <div>
                <label>Email:</label>
                <input name="email" type="email" value={usuario.email} onChange={handleChange} className="w-full border rounded-md p-2 hover:border-2 border-green-500" />
            </div>
            <div>
                <label>Senha:</label>
                <input name="senha" type="password" value={usuario.senha} onChange={handleChange} className="w-full border rounded-md p-2 hover:border-2 border-green-500" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-green-900 text-white py-2 rounded-xl drop-shadow-md hover:bg-green-600 transform hover:scale-105 transition duration-200">
                {loading ? "Enviando..." : "Cadastrar"}
            </button>
            {msg && <p className="text-green-600">{msg}</p>}
            {erro && <p className="text-red-600">{erro}</p>}
        </form>
    );
}
