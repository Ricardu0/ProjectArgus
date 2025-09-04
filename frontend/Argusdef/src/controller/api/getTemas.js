import api from "./index";

export async function getTema(){
    const {data} = await api.get('/temas');
    console.log(data)
    return data;
}