// src/context/AuthContext.jsx
import { createContext, useContext, useMemo, useState } from "react";
import { postUsuario } from "./postUsuario";
import { postLogin } from "./postLogin";
// opcional: para ler claims do JWT
// import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });
    const [loading, setLoading] = useState(false);

    const isAuthenticated = !!token;

    async function register(data) {
        setLoading(true);
        try {
            const res = await postUsuario({
                nome: data.nome,
                email: data.email,
                senha: data.senha,
            });

            // Se o backend já retornar token no cadastro:
            if (res?.token) {
                localStorage.setItem("token", res.token);
                setToken(res.token);
            }
            if (res?.user) {
                localStorage.setItem("user", JSON.stringify(res.user));
                setUser(res.user);
            }

            return { ok: true, data: res };
        } catch (e) {
            return { ok: false, error: e.response?.data || "Erro ao registrar" };
        } finally {
            setLoading(false);
        }
    }

    async function login(credentials) {
        setLoading(true);
        try {
            const res = await postLogin(credentials);
            const jwt = res.token;
            const profile = res.user || null;

            if (!jwt) throw new Error("Token não retornado pelo backend");

            localStorage.setItem("token", jwt);
            setToken(jwt);

            if (profile) {
                localStorage.setItem("user", JSON.stringify(profile));
                setUser(profile);
            } else {
                // opcional: extrair claims do token
                // const claims = jwtDecode(jwt);
                // setUser({ email: claims.sub, roles: claims.roles });
            }

            return { ok: true };
        } catch (e) {
            return { ok: false, error: e.response?.data || "Credenciais inválidas" };
        } finally {
            setLoading(false);
        }
    }

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
    }

    const value = useMemo(
        () => ({ token, user, isAuthenticated, loading, register, login, logout }),
        [token, user, isAuthenticated, loading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);

}