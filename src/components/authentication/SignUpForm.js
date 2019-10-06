import React from "react";
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {signUpAction} from "../../_actions/authentication/SignUpAction";

class SignUpForm extends React.Component {

    submit = (values) => {
        this.props.signUpAction(values, this.props.history);
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
        const {handleSubmit} = this.props;
        return (
            <div className="form">
                <div className="container">
                    <h2>Sign Up</h2>
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
                        <Field name="repassword"
                               component="input"
                               type="password"
                               placeholder="Repeat password"
                        />
                        <Field name="nickname"
                               component="input"
                               type="text"
                               placeholder="Nickname"
                        />
                        <Field name="firstName"
                               component="input"
                               type="text"
                               placeholder="Firstname"
                        />
                        <Field name="lastName"
                               component="input"
                               type="text"
                               placeholder="Lastname"
                        />
                        <button type="submit" className="blue">Sign Up</button>
                    </form>
                    {this.errorMessage()}
                </div>
            </div>
        );
    }
}

//TODO: add form validations

function mapStateToProps(state) {
    return {errorMessage: state.signUp.error};
}

const reduxFormSignUp = reduxForm({
    form: 'signUp'
})(SignUpForm);

export default connect(mapStateToProps, {signUpAction})(reduxFormSignUp);