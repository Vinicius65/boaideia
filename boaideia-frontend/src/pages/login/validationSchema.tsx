import * as yup from 'yup';

const validationSchema = yup.object({
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .max(100, 'Password should be of minimum 100 characters length')
        .required('Password is required'),
    username: yup
        .string()
        .required('Username is required'),
});

export default validationSchema;