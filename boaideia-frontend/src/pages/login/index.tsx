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
import * as yup from 'yup';
const validationSchema = yup.object({
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .max(100, 'Password should be of minimum 100 characters length')
        .required('Password is required'),
    login: yup
        .string()
        .required('Username or Email is required'),
});


export default function Login() {



    const { login } = useContext(UserContext);
    const router = useRouter();

    const [loginMessage, setLoginMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (formLogin) => {
            if (await login(formLogin))
                router.push("home")
            else {
                setLoginMessage("enter the login correctly");
                setTimeout(() => {
                    setLoginMessage("");
                }, 3000)
            }
        },
    });

    return (
        <main className={styles.container}>
            <MainTitleCP>
                Entrar em BoaIdeia
            </MainTitleCP>
            <div className={styles.register}>
                <form onSubmit={formik.handleSubmit} className={styles.form}>
                    <div style={{
                        marginBottom: '1.5rem'
                    }}>
                        <div style={{
                            marginBottom: '1.5rem'
                        }}>
                            <TextField
                                variant='outlined'
                                fullWidth
                                id="login"
                                name="login"
                                label="Informe o email ou seu usuário"
                                value={formik.values.login}
                                onChange={formik.handleChange}
                                error={formik.touched.login && Boolean(formik.errors.login)}
                                helperText={formik.touched.login && formik.errors.login}
                            />
                        </div>

                        <TextField
                            variant='outlined'
                            fullWidth
                            id="password"
                            name="password"
                            label="Senha"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                    </div>
                    <p style={{
                        color: "red"
                    }}>
                        {loginMessage}
                    </p>
                    <ButtonCP type="submit">
                        Continue
                    </ButtonCP>
                    <p style={{ fontSize: ".67rem", marginTop: '1rem' }}>
                        Ao clicar em Continuar, concordo que li e aceito os Termos de Uso e Política de Privacidade da BoaIdeia

                    </p>
                </form>
            </div>

        </main>
    )
}
