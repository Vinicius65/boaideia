import axios from "axios";
import { TCadastro, TLogin, TUser } from "../types";

const request = axios.create({
    baseURL: "http://localhost/",
    headers: {
        'Content-Type': 'application/json'
    }
})

const handlePost = async (url: string, payload: any) => {
    const contentSend = JSON.stringify(payload);
    const resp = await request.post(url, contentSend);
    return resp.data;
}



const api = {
    setToken(token: string) {
        request.defaults.headers.authorization = token;
    },

    async cadastrar(cadastro: TCadastro) {
        return (await handlePost('api/users/cadastrar', cadastro)) as TUser
    },

    async logar(login: TLogin) {
        return (await handlePost('api/users/logar', login)) as TUser
    }
}

export default api;