import { createContext, useState } from "react";
import axios from "axios";
import { TCadastro, TLogin, TUser } from "../../types";

const request = axios.create({
    baseURL: "http://localhost/",
    headers: {
        'Content-Type': 'application/json'
    }
})


type TApiProvider = {
    api: {
        setToken: (token: string) => void;
        cadastrar: (cadastro: TCadastro) => Promise<TUser>;
        logar: (login: TLogin) => Promise<TUser>;
        loading: boolean;
    }
}

export const ApiContext = createContext({} as TApiProvider)

export default function ApiProvider({ children }) {

    const [loading, setLoading] = useState(false);

    const handlePost = async (url: string, payload: any) => {
        try {
            setLoading(true);
            const contentSend = JSON.stringify(payload);
            const resp = await request.post(url, contentSend);
            setLoading(false);
            return resp.data;
        }
        catch (ex) {
            setLoading(false);
            throw ex;
        }
    }


    const api = {
        loading,

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

    return (
        <ApiContext.Provider value={{
            api
        }}>
            { children}
        </ApiContext.Provider>
    )
}
