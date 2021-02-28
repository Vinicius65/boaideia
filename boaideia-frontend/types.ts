export type TCadastro = {
  name: string,
  email: string,
  password: string,
  github?: string,
  stackoverflow?: string
}

export type TLogin = {
  email: string,
  password: string
}


export type TProject = {
  id: number,
  name: string,
  description: string,
  startDate: Date,
  endDate: Date,
  expectedEndDate: Date,
  numberOfVotation: number,
  rank: number,
  isPrivate: true,
  userInfo: {
    idProject: number,
    idUser: number,
    entryDate: Date,
    departureDate: Date,
    typePermission: string
  }
}


export type TGoal = {
  id: number,
  idProject: number,
  name: string,
  description: string,
  startDate: Date,
  expectedEndDate: Date,
  endDate: Date,
  project: {
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
    expectedEndDate: Date,
    isPrivate: boolean
  }
}

export type TUser = {
  id: number;
  name: string;
  email: string;
  github?: string;
  stackoverflow?: string;
  numberOfVotation: number;
  rank: number;
  token: string;
}