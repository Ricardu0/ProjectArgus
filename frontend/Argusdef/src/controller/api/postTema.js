import api from "./index.js";

export async function postTema(tema, materiaId){

    const payload ={
        ...tema,
        materia: {id: materiaId}
    }

    const {data} = await api.post("/temas", payload);
    return data;
}
