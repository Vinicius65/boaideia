import React, {useContext} from 'react'
import styles from './Project.module.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import MainTitleCP from '../Titles/MainTitleCP';
import { Switch, TextField } from '@material-ui/core';
import ButtonCP from '../Button/ButtonCP';
import { TGoal, TProject } from '../../types';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Api from '../../services/api/Api';
import { ProjectContext } from '../../services/context/ProjectContext';


const validationSchema = Yup.object({
    name: Yup
        .string()
        .min(5, 'O nome do projeto deve conter ao menos 3 caracteres')
        .max(100, 'O nome do projeto deve conter no máximo 100 caracteres')
        .required('Informe o primeiro nome'),

    description: Yup
        .string()
        .min(10, 'A descrição do projeto deve conter ao menos 10 caracteres')
        .max(500, 'A descrição do projeto deve conter no máximo 500 caracteres')
        .required('Informe o último nome'),

    isPrivate: Yup
        .bool(),
    
    startDate: Yup
        .date()
        .required("Informe uma data de término do projeto"),

    expectedEndDate: Yup
        .date()
        .required("Informe uma data de término do projeto"),

    timeline: Yup
        .array()
        .of(Yup.object().shape({
            name: Yup
                .string()
                // .min(5, 'O nome da meta deve conter ao menos 3 caracteres')
                // .max(100, 'O nome da meta deve conter no máximo 100 caracteres')
                // .required('Informe o nome da meta'),
                ,

            description: Yup
                .string()
                // .min(5, 'A descrição da meta deve conter ao menos 10 caracteres')
                // .max(100, 'A descrição da meta deve conter no máximo 500 caracteres')
                // .required('Informe a descrição da meta')
                ,
        }))

});


export default function ProjectNew({ closeModal }: { closeModal: () => void }) {
    const { projectList, filter, setProjectList } = useContext(ProjectContext);

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            expectedEndDate: new Date(),
            isPrivate: false,
            startDate: new Date(),
            userInfo: projectList.length == 0 ? {} : projectList[0].userInfo,
            timeline: [{
                name: '',
                description: '',
                startDate: new Date(),
                expectedEndDate: new Date()
            }]
        } as TProject,
        validationSchema: validationSchema,
        onSubmit: async (project) => {
            await Api.cadastrarProjeto(project);
            console.log(project);
            setProjectList([...projectList, project]);
            closeModal();
        },
    });
    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalForm}>
                <div className={styles.modalHeader}>
                    <MainTitleCP>
                        Novo Projeto
                    </MainTitleCP>
                    <button onClick={closeModal} className={styles.modalClose}>
                        X
                    </button>
                </div>
                <form onSubmit={formik.handleSubmit} className={styles.modalContent}>
                    <div className='flex-gap1' style={{
                        marginBottom: '1.5rem'
                    }}>
                        <div style={{ flex: "1" }}>
                            <TextField
                                variant='outlined'
                                fullWidth
                                id="name"
                                name="name"
                                label="Nome do projeto"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </div>
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <TextField
                            variant='outlined'
                            multiline
                            rows={4}
                            fullWidth
                            id="description"
                            name="description"
                            label="Descrição"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                    </div>

                    <div className='flex-gap1' style={{
                        marginBottom: '1.5rem'
                    }}>
                        <div style={{ 
                            flex: "1",
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        name="startDate"
                                        id="startDate"
                                        label="Data de início"
                                        value={formik.values.startDate}
                                        onChange={val => formik.setFieldValue("startDate", val)}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change dayarnte',
                                        }}
                                    />

                                <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        name="expectedEndDate"
                                        id="expectedEndDate"
                                        label="Data prevista para término"
                                        value={formik.values.expectedEndDate}
                                        onChange={val => formik.setFieldValue("expectedEndDate", val)}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change dayarnte',
                                        }}
                                    />
                            </MuiPickersUtilsProvider>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <span>
                                    Privado
                                </span>
                                <Switch
                                    checked={formik.values.isPrivate}
                                    onChange={formik.handleChange}
                                    
                                    color="primary"
                                    name="isPrivate"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        marginBottom: '1.5rem'
                    }}>
                        <TextField
                            style={{flex: 2}}
                            variant='outlined'
                            fullWidth
                            name="timeline[0].name"
                            label="Nome da meta"
                            value={formik.values.timeline.find(p => true)?.name}
                            onChange={formik.handleChange}
                        />
                         <TextField
                            style={{flex: 4}}
                            variant='outlined'
                            multiline
                            rows={1}
                            fullWidth
                            name="timeline[0].description"
                            label="Descrição da meta"
                            value={formik.values.timeline.find(p => true)?.description}
                            onChange={formik.handleChange}
                        />
                    </div>

                    <div className={styles.modalFooter}>
                        <div>
                            <ButtonCP type='submit'>
                                Criar
                            </ButtonCP>
                        </div>
                        <div>
                            <ButtonCP onClick={closeModal}>
                                Cancelar
                            </ButtonCP>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
