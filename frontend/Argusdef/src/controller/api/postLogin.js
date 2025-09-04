// src/controller/api/postLogin.js
import api from "./index";

export async function postLogin(credentials) {
    // esperado: { email/username, password/senha }
    const response = await api.post("/auth/login", credentials);
    // esperado do backend: { token, user }
    return response.data;
}
