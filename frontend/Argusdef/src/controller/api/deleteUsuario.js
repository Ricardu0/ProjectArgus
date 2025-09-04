import api from "./index";

export async function deleteUsuario(id) {
    console.log(`Delete feito com sucesso, usuario ${id} deletado`);
    return api.delete(`/usuarios/${id}`);
}