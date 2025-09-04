// src/controller/api/postUsuario.js
import api from "./index";

export async function postUsuario(usuario) {
    // ajusta para a rota de registro do seu backend
    // se for /auth/register, troque aqui.
    const response = await api.post("/usuarios", usuario);
    return response.data; // ideal: { id, nome, email } ou { token, user }
}
