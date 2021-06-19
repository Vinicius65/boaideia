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
import * as yup from 'yup';

const validationSchema = yup.object({
    firstname: yup
        .string()
        .min(3, 'First Name should be of minimum 8 characters length')
        .max(100, 'First Name should be of maximum 100 characters length')

        .required('First Name is required'),

    lastname: yup
        .string()
        .min(3, 'Last Name should be of minimum 8 characters length')
        .max(100, 'Last Name should be of maximum 100 characters length')
        .required('Last Name is required'),

    username: yup
        .string()
        .min(3, 'Last Name should be of minimum 8 characters length')
        .max(100, 'Last Name should be of maximum 100 characters length')
        .required('Last Name is required'),

    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),

    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .max(100, 'Password should be of minimum 100 characters length')
        .required('Password is required'),
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
        },
        validationSchema: validationSchema,
        onSubmit: async (cadastro) => {
            const respose = await Api.cadastrar(cadastro)
            alert("registration performed successfully, click ok...")
            route.push("login")
        },
    });

    return (
        <main className={styles.container}>
            <MainTitleCP>
                Start a Free
            </MainTitleCP>
            <div className={styles.register}>
                <form onSubmit={formik.handleSubmit} className={styles.form}>
                    <p style={{ marginBottom: '1rem', color: colors.blackWeak }}>
                        Create an account using:
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
                                label="First Name"
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
                                label="Last Name"
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
                            label="Username"
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
                            label="Password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                    </div>
                    <ButtonCP>
                        Continue
                    </ButtonCP>
                    <p style={{ fontSize: ".67rem", marginTop: "1rem" }}>
                        By clicking Continue, I agree that I have read and accepted the BoaIdeia Terms of Use and Privacy Policy
                    </p>
                </form>
            </div>
        </main>
    )
}
