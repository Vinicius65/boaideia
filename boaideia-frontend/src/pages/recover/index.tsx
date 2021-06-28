import MainTitleCP from '../../components/Titles/MainTitleCP'
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import styles from '../Index.module.css'
import ButtonCP from '../../components/Button/ButtonCP';
import { useContext, useState } from 'react';
import { UserContext } from '../../services/context/UserContext';
import { useRouter } from 'next/router';
import Header from '../struct/Header';
import Footer from '../struct/Footer';
import * as Yup from 'yup';
import colors from '../../styles/colors';

const validationSchema = Yup.object({
    username: Yup
        .string()
        .min(3, 'Nome de usuário deve conter ao menos 3 caracteres')
        .max(100, 'Nome de usuário deve conter no máximo 100 caracteres')
        .required('Informe o nome de usuário'),

    email: Yup
        .string()
        .email('Informe um email válido')
        .required('Informe o email'),
});


export default function Recover() {
    const router = useRouter();

    const [loginMessage, setLoginMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (recover) => {
            console.log(recover);
        },
    });

    return (
        <main className={styles.container}>
            <MainTitleCP>
                Recuperar senha
            </MainTitleCP>
            <div className={styles.register}>
                <form onSubmit={formik.handleSubmit} className={styles.form}>
                    <p style={{ marginBottom: '1rem', color: colors.blackWeak }}>
                        Confirme seu:
                    </p>
                    <div style={{
                        marginBottom: '1.5rem'
                    }}>
                        <TextField
                            variant='outlined'
                            fullWidth
                            id="username"
                            name="username"
                            label="Nome de usuário"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                        />
                    </div>

                    <div style={{
                        marginBottom: '1.5rem'
                    }}>
                        <TextField
                            variant='outlined'
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                    </div>
                    <ButtonCP type="submit">
                        Recuperar a senha
                    </ButtonCP>
                </form>
            </div>

        </main>
    )
}
