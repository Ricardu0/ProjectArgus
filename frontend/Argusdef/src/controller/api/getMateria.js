import api from "./index";

export async function getMateria(){
    const {data} = await api.get('/materias')
    return data;
}