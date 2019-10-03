import React from "react";
import {connect} from 'react-redux';
import {Formik} from "formik";
import * as Yup from "yup";
import {signInAction} from '../../_actions/authentication/SignInAction';

import { Field, reduxForm } from 'redux-form';


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

class SignInForm extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {errorMessage: ''};
    //
    //     this.submit = this.submit.bind(this);
    // }

    submit = (values) => {
        this.props.signInAction(values, this.props.history);
    };

    errorMessage() {
        if (this.props.errorMessage) {
            return (
                <div className="info-red">
                    {this.props.errorMessage}
                </div>
            );
        }
    }

        render() {
        const { handleSubmit } = this.props;
        return (
            <div className="form">
                <div className="container">
                    <h2>Sign In</h2>
                    <form onSubmit={ handleSubmit(this.submit) }>
                        <Field name="email"
                               component="input"
                               type="text"
                               placeholder="Email"
                        />
                        <Field name="password"
                               component="input"
                               type="password"
                               placeholder="Password"
                        />
                        <button type="submit" className="blue">Sign In</button>
                    </form>
                    {this.errorMessage()}
                </div>
            </div>
        );
    }

    // render() {
    //     return <Formik
    //         initialValues={{
    //             'email': '',
    //             'password': ''
    //         }}
    //         onSubmit={(values, {setSubmitting}) => {
    //             setTimeout(() => {
    //                 setSubmitting(false);
    //             }, 500);
    //         }}
    //
    //         validationSchema={loginValidationSchema}
    //     >
    //         {
    //             props => {
    //                 const {
    //                     values,
    //                     touched,
    //                     errors,
    //                     isSubmitting,
    //                     handleChange,
    //                     handleBlur,
    //                     handleSubmit
    //                 } = props;
    //                 return (
    //                     <form onSubmit={handleSubmit(this.submit)}>
    //                         <label htmlFor="email">Email</label>
    //                         <input
    //                             name="email"
    //                             type="text"
    //                             placeholder="Enter your email"
    //                             value={values.email}
    //                             onChange={handleChange}
    //                             onBlur={handleBlur}
    //                             className={errors.email && touched.email && "error"}
    //                         />
    //                         {errors.email && touched.email && (
    //                             <div>{errors.email}</div>
    //                         )}
    //                         <label htmlFor="email">Password</label>
    //                         <input
    //                             name="password"
    //                             type="password"
    //                             placeholder="Enter your password"
    //                             value={values.password}
    //                             onChange={handleChange}
    //                             onBlur={handleBlur}
    //                             className={errors.password && touched.password && "error"}
    //                         />
    //                         {errors.password && touched.password && (
    //                             <div>{errors.password}</div>
    //                         )}
    //                         <button type="submit" disabled={isSubmitting}>
    //                             Login
    //                         </button>
    //                     </form>
    //                 );
    //             }
    //         }
    //     </Formik>
    // };


}

function mapStateToProps(state) {
    return {errorMessage: state.authentication.error};
}

// export default connect(mapStateToProps, {signInAction})(SignInForm);



const reduxFormSignIn = reduxForm({
    form: 'signin'
})(SignInForm);

export default connect(mapStateToProps, {signInAction})(reduxFormSignIn);