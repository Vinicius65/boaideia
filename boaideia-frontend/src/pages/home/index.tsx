import React, { useContext } from 'react'
import ProjectCardCP from '../../components/Project/ProjectCardCP'
import Header from '../struct/Header';
import Footer from '../struct/Footer';
import HomeHeaderCP from '../../components/Headers/HomeHeaderCP';
import { UserContext } from '../../services/context/UserContext';
import { TUser } from '../../types';
import { Container } from '@material-ui/core';

export default function Home() {
    const { getUser } = useContext(UserContext);
    const user = getUser();
    console.log(user);
    return (
        <div>
            <HomeHeaderCP username={user?.username || ''} />
            <div style={{
                marginTop: '1.5rem'
            }}>

                <ProjectCardCP style={{ margin: '0 auto' }} />
                <ProjectCardCP style={{ margin: '0 auto' }} />
                <ProjectCardCP style={{ margin: '0 auto' }} />
                <ProjectCardCP style={{ margin: '0 auto' }} />
                <ProjectCardCP style={{ margin: '0 auto' }} />
                <ProjectCardCP style={{ margin: '0 auto' }} />
                <ProjectCardCP style={{ margin: '0 auto' }} />
                <ProjectCardCP style={{ margin: '0 auto' }} />
                <ProjectCardCP style={{ margin: '0 auto' }} />
                <ProjectCardCP style={{ margin: '0 auto' }} />

            </div>
        </div>
    )
}
