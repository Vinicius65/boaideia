import axios from "axios";
import { TCadastro, TLogin } from "../../types";


const Axios = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API_ADDRESS_PROD : process.env.NEXT_PUBLIC_API_ADDRESS_DEV,
    headers: {
        'Content-Type': 'application/json'
    }
});

const handlePost = async (url: string, payload: object) => {
    const contentSend = JSON.stringify(payload);
    const resp = await Axios.post(url, contentSend);
    return resp.data;
}


const handleGet = async (route: string) => {
    return Axios.get(route)
        .then(resp => resp.data)
        .catch(err => {
            console.log(err);
        });
}

const Api = {
    async cadastrar(user: TCadastro) {
        return (await handlePost('api/users/cadastrar', user))
    },

    async logar(user: TLogin) {
        return (await handlePost('api/users/logar', user))
    }

}

export default Api;