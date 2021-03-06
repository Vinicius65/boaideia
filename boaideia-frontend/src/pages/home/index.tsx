import React, { useContext } from 'react'
import ProjectCardCP from '../../components/Project/ProjectCardCP'
import HomeHeaderCP from '../../components/Headers/HomeHeaderCP';
import { UserContext } from '../../services/context/UserContext';
import { ProjectContext } from '../../services/context/ProjectContext';
import Api from '../../services/api/Api';
import { useEffect } from 'react';

export default function Home() {
    const { projectList, filter, setProjectList } = useContext(ProjectContext);

    useEffect(() => {
        const fun = async () => {
            var resp = await Api.getProjects();
            setProjectList(resp);
        }
        fun();
    }, [])

    return (
        <div style={{
            zIndex: -2
        }}>
            <HomeHeaderCP filter={filter} />
            <div style={{
                marginTop: '1.5rem'
            }}>
                {projectList.map((p, index) => (
                    <ProjectCardCP project={p} key={index} style={{ margin: '0 auto' }} />
                ))}

            </div>
        </div>
    )
}

