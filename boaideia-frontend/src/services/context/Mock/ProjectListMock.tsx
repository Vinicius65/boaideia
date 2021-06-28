import { TProject } from "../../../types";

const projectList: TProject[] = [
    {
        endDate: new Date(),
        description: "Desse projeto tem como objetivo utilizar a inteligência artifical para modelar a interface de usuário comforme o uso. A própria interface recomendará mudanças de layout que podem beneficiar o usuário, fazendo com que cada interface seja personalizada por usuário",
        expectedEndDate: new Date(),
        goalList: [
            {
                description: "Criar um foguete",
                endDate: new Date(),
                expectedEndDate: new Date(),
                id: 1,
                idProject: 1,
                name: "Criar",
                startDate: new Date()
            },
            {
                description: "Criar um sistema de envio",
                endDate: new Date(),
                expectedEndDate: new Date(),
                id: 1,
                idProject: 1,
                name: "Suportar",
                startDate: new Date()
            },
            {
                description: "Enviar a lua",
                endDate: new Date(),
                expectedEndDate: new Date(),
                id: 1,
                idProject: 1,
                name: "Executar",
                startDate: new Date()
            }
        ],
        id: 1,
        isPrivate: false,
        name: "Foguetório",
        numberOfVotation: 10,
        rank: 4.58,
        startDate: new Date(),
        userList: [
            {
                id: 1,
                firstname: "Vinicius",
                lastname: "Siqueira",
                username: 'VS',
                email: 'Vinicius@Vinicius.com',
                numberOfVotation: 5,
                rank: 10,
                token: ''
            }
        ]
    },
    {
        endDate: new Date(),
        description: "Criação de uma aplicação para gerar ideias",
        expectedEndDate: new Date(),
        goalList: [
            {
                description: "Criar um front-end",
                endDate: new Date(),
                expectedEndDate: new Date(),
                id: 1,
                idProject: 1,
                name: "Fronend",
                startDate: new Date()
            },
            {
                description: "Criar um back-end",
                endDate: new Date(),
                expectedEndDate: new Date(),
                id: 1,
                idProject: 1,
                name: "Backend",
                startDate: new Date()
            },
            {
                description: "Criar o design",
                endDate: new Date(),
                expectedEndDate: new Date(),
                id: 1,
                idProject: 1,
                name: "Design",
                startDate: new Date()
            },
            {
                description: "Criar o Test",
                endDate: new Date(),
                expectedEndDate: new Date(),
                id: 1,
                idProject: 1,
                name: "tEST",
                startDate: new Date()
            },
        ],
        id: 1,
        isPrivate: false,
        name: "Boa ideia",
        numberOfVotation: 10,
        rank: 4.58,
        startDate: new Date(),
        userList: [
            {
                id: 1,
                firstname: "Jonathan",
                lastname: "Pereira",
                username: 'JP',
                email: 'Jonathan@Pereira.com',
                numberOfVotation: 5,
                rank: 10,
                token: ''
            }
        ]
    },
    {
        endDate: new Date(),
        description: "Criação de uma pizzaria 100% automatizada, não tem nem garçom",
        expectedEndDate: new Date(),
        goalList: [
            {
                description: "Comprar um raspberry pi",
                endDate: new Date(),
                expectedEndDate: new Date(),
                id: 1,
                idProject: 1,
                name: "raspberry",
                startDate: new Date()
            },
            {
                description: "Criar robôs que sirvam pizza",
                endDate: new Date(),
                expectedEndDate: new Date(),
                id: 1,
                idProject: 1,
                name: "Robô",
                startDate: new Date()
            }
        ],
        id: 1,
        isPrivate: true,
        name: "AutoPizza",
        numberOfVotation: 10,
        rank: 4.58,
        startDate: new Date(),
        userList: [
            {
                id: 1,
                firstname: "Leonardo",
                lastname: "Machado",
                username: 'LM',
                email: 'Leonardo@Machado.com',
                numberOfVotation: 5,
                rank: 10,
                token: ''
            }
        ]
    },
    {
        endDate: new Date(),
        description: "Viajar o mundo com 10 reais e 5 desconhecidos",
        expectedEndDate: new Date(),
        goalList: [
            {
                description: "Juntar 10 reais",
                endDate: new Date(),
                expectedEndDate: new Date(),
                id: 1,
                idProject: 1,
                name: "Real",
                startDate: new Date()
            },
            {
                description: "Juntar 5 desconhecidos",
                endDate: new Date(),
                expectedEndDate: new Date(),
                id: 1,
                idProject: 1,
                name: "Desconhecios",
                startDate: new Date()
            }
        ],
        id: 1,
        isPrivate: true,
        name: "ViajeMundi",
        numberOfVotation: 10,
        rank: 4.58,
        startDate: new Date(),
        userList: [
            {
                id: 1,
                firstname: "Nilson",
                lastname: "Rodrigues",
                username: 'NR',
                email: 'Nilson@Rodrigues.com',
                numberOfVotation: 5,
                rank: 10,
                token: ''
            }
        ]
    }
]
export default projectList;
