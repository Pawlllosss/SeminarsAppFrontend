import React from "react";
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {signInAction} from '../../_actions/authentication/SignInAction';
import {Button, TextField, Typography} from "@material-ui/core";

class SignInForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    submit = () => {
        this.props.signInAction(this.state, this.props.history);
    };

    errorMessage() {
        if (this.props.errorMessage) {
            return (
                <div className="signin-error">
                    <Typography variant="caption" align="center">{this.props.errorMessage}</Typography>
                </div>
            );
        }
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <div className="form" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <div className="container" style={{width: "70%"}}>
                    <Typography variant="h4" align="center">Sign In</Typography>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email"
                        type="text"
                        required={true}
                        value={this.state.email}
                        onChange={(event) => this.setState({email: event.target.value})}
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        required={true}
                        value={this.state.password}
                        onChange={(event) => this.setState({password: event.target.value})}
                        fullWidth
                    />
                    <Button onClick={handleSubmit(this.submit)} color="primary">
                        Submit
                    </Button>
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