import React from "react";
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {signInAction} from '../../_actions/authentication/SignInAction';

class SignInForm extends React.Component {

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
        const {handleSubmit} = this.props;
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
}

function mapStateToProps(state) {
    return {errorMessage: state.authentication.error};
}

const reduxFormSignIn = reduxForm({
    form: 'signin'
})(SignInForm);

export default connect(mapStateToProps, {signInAction})(reduxFormSignIn);