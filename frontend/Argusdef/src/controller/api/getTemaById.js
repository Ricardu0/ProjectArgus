// controller/api/getTemas.js
import api from './index';

export async function getTemaById(temaId) {
    const { data } = await api.get(`/temas/${temaId}`);
    return data;
}
