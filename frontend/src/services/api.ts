import axios from "axios"
import BaseUrl from "../configs/baseUrl"

const baseUrl= BaseUrl.API_JOURNEYS

async function getData(){
    try {
        const response = await axios.get(baseUrl)
        return response.data

    } catch (error) {
        console.log("Erro ao tentar buscar requisicao" + error)
    }
}

export default { getData }