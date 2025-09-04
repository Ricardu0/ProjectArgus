import api from './index';
import {data} from "autoprefixer";

export async function getUsuario(id) {
    data = await api.get(`/usuarios/${id}`);
    return data;
}