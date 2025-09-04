import api from "./index";

export async function deleteSubtema(id){
    return api.delete(`/subtemas/${id}`);
}