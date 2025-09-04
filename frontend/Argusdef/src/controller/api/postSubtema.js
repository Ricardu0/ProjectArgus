import api from "./index";

export async function postSubtema(subtema, temaId)
{

    const payload = {
        ...subtema,
        temaId: {temaId}
    }

    const {data} = await api.post("/subtemas", payload);
    return data;
}