import React from "react";
import {Formik} from "formik";
import * as Yup from "yup";

const emailValidationSchema = Yup.string()
    .email()
    .required("Email is required");

const passwordValidationSchema = Yup.string()
    .required("Password is required")
    .min(8, "Password is too short - minimum 8 characters")
    .matches(/(?=.*[0-9])/, "Password must contain a number.");

const loginValidationSchema = Yup.object().shape({
    email: emailValidationSchema,
    password: passwordValidationSchema
});

const LoginForm = () => (
    <Formik
        initialValues = {{
        'email': '',
        'password': ''
        }}
        onSubmit = {(values, {setSubmitting}) => {
            setTimeout(() => {
                    setSubmitting(false);
                }, 500);
        }}

        validationSchema = {loginValidationSchema}
    >
        {
            props => {
                const {
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit
                } = props;
                return (
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email</label>
                        <input
                            name="email"
                            type="text"
                            placeholder="Enter your email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.email && touched.email && "error"}
                        />
                        {errors.email && touched.email && (
                            <div>{errors.email}</div>
                        )}
                        <label htmlFor="email">Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={errors.password && touched.password && "error"}
                        />
                        {errors.password && touched.password && (
                            <div>{errors.password}</div>
                        )}
                        <button type="submit" disabled={isSubmitting}>
                            Login
                        </button>
                    </form>
                );
            }
        }
    </Formik>
);

export default LoginForm;