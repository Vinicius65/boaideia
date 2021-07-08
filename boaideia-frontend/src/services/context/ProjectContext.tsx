import { createContext, useState } from "react";
import { TProject } from "../../types";

type TProjectContext = {
    projectList: TProject[],
    filter: (query: string) => void;
    setProjectList: (projectList: TProject[]) => void;
}

export const ProjectContext = createContext({} as TProjectContext)

export function ProjectProvider({ children }: { children: any }) {
    const [_projectList, _setProjectList] = useState<TProject[]>([]);
    const [projectListFilter, setProjectListFilter] = useState<TProject[]>([]);

    
    const parseDates = (project: TProject) => {
        const {expectedEndDate, endDate, startDate} = project;
        return {
            expectedEndDate: !!expectedEndDate ? new Date(expectedEndDate) : expectedEndDate,
            endDate: !!endDate ? new Date(endDate) : endDate,
            startDate: !!startDate ? new Date(startDate) : startDate
        }
    }
    const createFieldAll = (p: TProject) =>  
            `${p.name} ${p.description} ${p.goalList.map(g => `${g.name} ${g.description}`)} ${p.userList.map(u => `${u.username}`)}`.toLowerCase()

    const setProjectList = (projectList: TProject[]) => {
        const newProjectList = projectList.map(p => ({
            ...p,
            goalList: [],
            userList: [],
            ...parseDates(p),
        })).map(p => ({
            ...p,
            all: createFieldAll(p)
        }));
        _setProjectList(newProjectList);
        setProjectListFilter(newProjectList);
    }



    const filter = (query: string) => setProjectListFilter(!query ? _projectList : _projectList.filter(p => p.all.includes(query.toLowerCase())));

    return (
        <ProjectContext.Provider value={{
            projectList: projectListFilter,
            filter,
            setProjectList
        }}>
            {children}
        </ProjectContext.Provider>
    )
}
