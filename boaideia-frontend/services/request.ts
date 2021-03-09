import axios from "axios";
import { TCadastro, TGoogleUser, TLogin, TUser } from "../types";


const Axios = axios.create({
    baseURL: `http://localhost`,
    headers: {
        'Content-Type': 'application/json'
    }
});

const handlePost = async (url: string, payload: any) => {
    const contentSend = JSON.stringify(payload);
    const resp = await Axios.post(url, contentSend);
    return resp.data;
}



const Api = {
    setToken(token: string) {
        Axios.defaults.headers.authorization = token;
    },

    clearToken() {
        delete Axios.defaults.headers.authorization;
    },

    async cadastrar(cadastro: TCadastro) {
        return (await handlePost('api/users/cadastrar', cadastro)) as TUser
    },

    async logar(login: TLogin) {
        return (await handlePost('api/users/logar', login)) as TUser
    },

    async logarComGoogle(login: TGoogleUser) {
        return (await handlePost('api/users/logar/GOOGLE', login)) as TUser
    }
}

export default Api;