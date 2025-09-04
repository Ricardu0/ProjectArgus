import api from './index';

export async function postMateria(materia) {
    const {data} = await api.post("/materias", materia);
    return data;
}