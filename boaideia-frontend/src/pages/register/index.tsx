import MainTitleCP from '../../components/Titles/MainTitleCP'
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import validationSchema from './validationSchema';
import styles from '../Index.module.css'
import ButtonCP from '../../components/Button/ButtonCP';
import colors from '../../styles/colors';
import { useRouter } from 'next/router';

export default function Register() {
    const route = useRouter();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            //alert(JSON.stringify(values, null, 2));
            alert("registration performed successfully, please wait...")
            route.push("home")
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
                                id="firstName"
                                name="firstName"
                                label="First Name"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                            />
                        </div>

                        <div style={{ flex: "1" }}>
                            <TextField
                                variant='outlined'
                                fullWidth
                                id="lastName"
                                name="lastName"
                                label="Last Name"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                helperText={formik.touched.lastName && formik.errors.lastName}
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
                    <p style={{ fontSize: ".67rem" }}>
                        By clicking Continue, I agree that I have read and accepted the BoaIdeia Terms of Use and Privacy Policy
                    </p>
                </form>
            </div>
        </main>
    )
}
