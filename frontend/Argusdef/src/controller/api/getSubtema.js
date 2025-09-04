import api from "./index";

export async function getSubtema(){
    const {data} = await api.get('/subtemas');
    return data;
}