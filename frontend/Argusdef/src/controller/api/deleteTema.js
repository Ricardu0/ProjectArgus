import api from './api';

export async function deleteTema(id) {
    console.log(`Delete tema feito com sucesso, usuario ${id}`);
    return api.delete(`/temas/${id}`);
}