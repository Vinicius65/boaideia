import { createContext, useState } from "react";
import { TProject } from "../../types";
import ProjectListMock from "./Mock/ProjectListMock";

type TProjectContext = {
    projectList: TProject[],
    filter: (query: string) => void;
}

export const ProjectContext = createContext({} as TProjectContext)

export function ProjectProvider({ children }: { children: any }) {
    const [_projectList, _setProjectList] = useState<TProject[]>(ProjectListMock.map(p => {
        return {
            ...p,
            all: `${p.name} ${p.description} ${p.goalList.map(g => `${g.name} ${g.description}`)} ${p.userList.map(u => `${u.firstname} ${u.lastname}`)}`.toLowerCase()
        }
    }))
    const [projectList, setProjectList] = useState<TProject[]>([]);

    const filter = (query: string) => setProjectList(!query ? _projectList : _projectList.filter(p => p.all.includes(query.toLowerCase())));

    return (
        <ProjectContext.Provider value={{
            projectList,
            filter
        }}>
            {children}
        </ProjectContext.Provider>
    )
}
