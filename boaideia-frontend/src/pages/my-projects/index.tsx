import React, { useContext, useEffect, useState } from 'react'
import ProjectCardCP from '../../components/Project/ProjectCardCP'
import HomeHeaderCP from '../../components/Headers/HomeHeaderCP';
import { ProjectContext } from '../../services/context/ProjectContext';
import Api from '../../services/api/Api';
import AddIcon from '@material-ui/icons/Add';
import ButtonCP from '../../components/Button/ButtonCP';
import ProjectNew from '../../components/Project/ProjectNew';

export default function MyProjects() {
    const { projectList, filter, setProjectList } = useContext(ProjectContext);


    useEffect(() => {
        const fun = async () => {
            var resp = await Api.getMyProjects();
            setProjectList(resp);
        }
        fun();
    }, [])

    const [open, setOpen] = useState(false);
    const handleClose = () => { setOpen(false);}

    return (
        <div >
            <HomeHeaderCP filter={filter} />
            <div style={{
                marginTop: '1.5rem'
            }}>
                {open && <ProjectNew closeModal={handleClose} />}
                <ButtonCP 
                    onClick={() => {setOpen(true)}}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        maxWidth: '300px',
                        margin: '0 auto'
                    }}
                >
                    <AddIcon />
                    <span style={{
                        fontSize: '1.2rem'
                    }}>
                    Adicionar Projeto
                    </span>
                </ButtonCP>
                {projectList.map((p, index) => (
                    <ProjectCardCP project={p} key={index} style={{ margin: '0 auto' }} />
                ))}

            </div>

           



        </div>
    )
}

