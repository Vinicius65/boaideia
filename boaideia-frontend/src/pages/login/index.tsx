import MainTitleCP from '../../components/Titles/MainTitleCP'
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import validationSchema from './validationSchema';
import styles from '../Index.module.css'
import ButtonCP from '../../components/Button/ButtonCP';
import colors from '../../styles/colors';
import { useRouter } from 'next/router';


export default function Login() {
    const route = useRouter();

    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert("registration performed successfully, please wait...")
            route.push("home")
        },
    });

    return (
        <main className={styles.container}>
            <MainTitleCP>
                Login with  BoaIdeia
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
                                label="Email or Username"
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
                            label="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                    </div>
                    <ButtonCP>
                        Continue
                    </ButtonCP>
                    <p style={{ fontSize: ".67rem" }}>
                        By clicking Continue, I agree that I have read and accepted the BoaIdeia Terms of Use and Privacy Policy
                    </p>
                </form>
            </div>

        </main>

    )
}
