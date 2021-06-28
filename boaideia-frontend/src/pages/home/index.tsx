import React, { useContext } from 'react'
import ProjectCardCP from '../../components/Project/ProjectCardCP'
import HomeHeaderCP from '../../components/Headers/HomeHeaderCP';
import { UserContext } from '../../services/context/UserContext';
import { ProjectContext } from '../../services/context/ProjectContext';

export default function Home() {
    const { getUser } = useContext(UserContext);
    const { projectList, filter } = useContext(ProjectContext);


    const user = getUser();
    return (
        <div>
            <HomeHeaderCP filter={filter} username={user?.username || ''} />
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

