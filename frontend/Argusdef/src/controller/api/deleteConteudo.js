import api from './api';

export async function deleteConteudo(id) {
    return api.delete(`/conteudos/${id}`)
}