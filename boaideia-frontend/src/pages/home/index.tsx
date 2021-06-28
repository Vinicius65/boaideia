import React, { useContext } from 'react'
import ProjectCardCP from '../../components/Project/ProjectCardCP'
import HomeHeaderCP from '../../components/Headers/HomeHeaderCP';
import { UserContext } from '../../services/context/UserContext';
import { ProjectContext } from '../../services/context/ProjectContext';

export default function Home() {
    const { projectList, filter } = useContext(ProjectContext);


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

