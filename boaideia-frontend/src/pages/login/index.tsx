import MainTitleCP from '../../components/Titles/MainTitleCP'
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import validationSchema from './validationSchema';
import styles from '../Index.module.css'
import ButtonCP from '../../components/Button/ButtonCP';
import { signIn } from 'next-auth/client';


export default function Login() {

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (login) => {
            const { username, password } = login;
            signIn('credentials', { username, password });
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
                                id="username"
                                name="username"
                                label="Email or Username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                            />
                        </div>

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
                    <ButtonCP type="submit">
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
