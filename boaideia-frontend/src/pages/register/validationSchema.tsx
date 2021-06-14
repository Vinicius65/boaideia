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

export default validationSchema;