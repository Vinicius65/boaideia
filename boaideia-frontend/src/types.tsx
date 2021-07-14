export type TCadastro = {
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    password: string
}

export type TLogin = {
    login: string,
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

export type TProject = {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    expectedEndDate: Date;
    numberOfVotation: number;
    rank: number;
    isPrivate: boolean;
    timeline: TGoal[];
    userInfo: TUserVM;
    all: string;
}

export type TUserVM = {
    username: string;
    id: number;
    email: string;
    typePermission: string;
}

export type TGoal = {
    id: number;
    idProject: number;
    name: string;
    description: string;
    startDate: Date;
    expectedEndDate: Date;
    endDate: Date;
}

