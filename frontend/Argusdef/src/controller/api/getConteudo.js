import api from './index'

export async function getConteudo() {
    const {data} = await api.get('/conteudos');
    console.log(data);
    return data;
}