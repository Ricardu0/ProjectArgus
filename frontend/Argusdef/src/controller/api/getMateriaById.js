import api from './index';

export async function getMateriaById(id) {
    const { data } = await api.get(`/materias/${id}`);
    return data; // data.temas já vem junto
}
