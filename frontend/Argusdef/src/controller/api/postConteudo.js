import api from "./index";

export async function postConteudo(conteudo) {
    const response = await api.post("/conteudos", conteudo);
    return response.data;
}
