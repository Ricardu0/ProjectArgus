import api from "./index";

export async function deleteMateria(id) {
    return api.delete(`/materias/${id}`);
}