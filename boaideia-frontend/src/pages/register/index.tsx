import MainTitleCP from '../../components/Titles/MainTitleCP'
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import styles from '../Index.module.css'
import ButtonCP from '../../components/Button/ButtonCP';
import colors from '../../styles/colors';
import { useRouter } from 'next/router';
import Api from '../../services/api/Api';
import Header from '../struct/Header';
import Footer from '../struct/Footer';
import * as Yup from 'yup';
import { Link } from '@material-ui/core';


const validationSchema = Yup.object({
    firstname: Yup
        .string()
        .min(3, 'Primeiro nome deve conter ao menos 3 caracteres')
        .max(100, 'Primeiro nome deve conter no máximo 100 caracteres')
        .required('Informe o primeiro nome'),

    lastname: Yup
        .string()
        .min(3, 'Último nome deve conter ao menos 3 caracteres')
        .max(100, 'Último nome deve conter no máximo 100 caracteres')
        .required('Informe o último nome'),

    username: Yup
        .string()
        .min(3, 'Nome de usuário deve conter ao menos 3 caracteres')
        .max(100, 'Nome de usuário deve conter no máximo 100 caracteres')
        .required('Informe o nome de usuário'),

    email: Yup
        .string()
        .email('Informe um email válido')
        .required('Informe o email'),

    password: Yup
        .string()
        .min(8, 'Password deve conter ao menos 8 caracteres')
        .max(100, 'Password deve conter ao menos 100 caracteres')
        .required('Informe a senha'),

    passwordConfirm: Yup
        .string()
        .oneOf([Yup.ref('password')], "As senhas devem ser iguais")
        .required('Confirme a senha'),
});

export default function Register() {


    const route = useRouter();

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            password: '',
            passwordConfirm: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (cadastro) => {
            console.log(formik.values)

            const respose = await Api.cadastrar(cadastro)
            alert("registration performed successfully, click ok...")
            route.push("login")
        },
    });

    return (
        <main className={styles.container}>
            <MainTitleCP>
                Iniciar gratuito
            </MainTitleCP>
            <div className={styles.register}>
                <form onSubmit={formik.handleSubmit} className={styles.form}>
                    <p style={{ marginBottom: '1rem', color: colors.blackWeak }}>
                        Criar a conta usando:
                    </p>
                    <div className='flex-gap1' style={{
                        marginBottom: '1.5rem'
                    }}>
                        <div style={{ flex: "1" }}>
                            <TextField
                                variant='outlined'
                                fullWidth
                                id="firstname"
                                name="firstname"
                                label="Primeiro Nome"
                                value={formik.values.firstname}
                                onChange={formik.handleChange}
                                error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                                helperText={formik.touched.firstname && formik.errors.firstname}
                            />
                        </div>

                        <div style={{ flex: "1" }}>
                            <TextField
                                variant='outlined'
                                fullWidth
                                id="lastname"
                                name="lastname"
                                label="Último nome"
                                value={formik.values.lastname}
                                onChange={formik.handleChange}
                                error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                                helperText={formik.touched.lastname && formik.errors.lastname}
                            />
                        </div>
                    </div>

                    <div style={{
                        marginBottom: '1.5rem'
                    }}>
                        <TextField
                            variant='outlined'
                            fullWidth
                            id="username"
                            name="username"
                            label="Usuário"
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


                    <div style={{
                        marginBottom: '1.5rem'
                    }}>
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

                    <div style={{
                        marginBottom: '1.5rem'
                    }}>
                        <TextField
                            variant='outlined'
                            fullWidth
                            id="passwordConfirm"
                            name="passwordConfirm"
                            label="Confirme a Senha"
                            type="password"
                            value={formik.values.passwordConfirm}
                            onChange={formik.handleChange}
                            error={formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm)}
                            helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                        />
                    </div>
                    <ButtonCP>
                        Cadastrar
                    </ButtonCP>
                    <p style={{ fontSize: ".67rem", marginTop: "1rem" }}>
                        Ao clicar em Continuar, concordo que li e aceito os Termos de Uso e Política de Privacidade da BoaIdeia
                    </p>
                </form>
                <p style={{ marginTop: '1rem' }}>
                    Já tem login e senha?
                    <Link href="/login" style={{ marginLeft: '.5rem' }}>
                        Entrar
                    </Link>
                </p>
            </div>
        </main>
    )
}
