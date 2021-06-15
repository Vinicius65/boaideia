export type TCadastro = {
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    password: string
}

export type TLogin = {
    username: string,
    password: string
}


export type TUser = {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    rank: number;
    numberOfVotation: number;
    token: string;
}