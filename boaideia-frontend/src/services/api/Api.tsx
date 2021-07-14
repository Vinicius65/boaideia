import axios, { AxiosResponse } from "axios";
import { TCadastro, TLogin, TProject, TUser } from "../../types";


const AxiosCreate = () => {
    return axios.create({
       
        baseURL: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API_ADDRESS_PROD : process.env.NEXT_PUBLIC_API_ADDRESS_DEV,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}


const Axios = AxiosCreate();

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
    setToken(token: string) {
        Axios.defaults.headers.authorization = token;
        localStorage.setItem("token", token);
    },

    clearToken() {
        delete Axios.defaults.headers.authorization;
        localStorage.removeItem("token");
    },

    async cadastrar(user: TCadastro) {
        return (await handlePost('api/users/cadastrar', user))
    },

    async logar(user: TLogin) {
        return (await handlePost('api/users/logar', user)) as TUser;
    },

    async getProjects() {
        return (await handleGet('api/projects')) as TProject[];
    },

    async getMyProjects() {
        return (await handleGet('/api/projects/meusProjetos')) as TProject[];
    },

    async getMyContributions() {
        return (await handleGet('/api/projects/minhasContribuicoes')) as TProject[];
    },
    async cadastrarProjeto(project: TProject){
        return (await handlePost('/api/projects/cadastrarProjeto', project)) as TProject;
    }

}

export default Api;