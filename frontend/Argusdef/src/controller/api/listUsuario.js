import api from "./index.js";

export async function listUsuario() {
    var data = await api.get('/usuarios');
    return data;
}