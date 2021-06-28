import React from 'react'
import styles from './Project.module.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import MainTitleCP from '../Titles/MainTitleCP';
import { TextField } from '@material-ui/core';
import ButtonCP from '../Button/ButtonCP';

const validationSchema = Yup.object({
    name: Yup
        .string()
        .min(5, 'Primeiro nome deve conter ao menos 5 caracteres')
        .max(100, 'Primeiro nome deve conter no máximo 100 caracteres')
        .required('Informe o primeiro nome'),

    description: Yup
        .string()
        .min(10, 'Último nome deve conter ao menos 10 caracteres')
        .max(500, 'Último nome deve conter no máximo 500 caracteres')
        .required('Informe o último nome'),


});


export default function ProjectNew({ closeModal }: { closeModal: () => void }) {

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (project) => {
            console.log(project);
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

                    <div className={styles.modalFooter}>
                        <div>
                            <ButtonCP>
                                Criar
                            </ButtonCP>
                        </div>
                        <div>
                            <ButtonCP onClick={closeModal}>
                                Cancelar
                            </ButtonCP>
                        </div>
                    </div>
                    <p style={{ fontSize: ".67rem", marginTop: "1rem" }}>
                        Ao clicar em Continuar, concordo que li e aceito os Termos de Uso e Política de Privacidade da BoaIdeia
                    </p>
                </form>
            </div>
        </div>
    )
}
