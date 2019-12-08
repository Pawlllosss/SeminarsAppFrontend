import React from "react";
import {connect} from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import {signUpAction} from "../../_actions/authentication/SignUpAction";
import {Button, TextField, Typography} from "@material-ui/core";

class SignUpForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            repassword: "",
            nickname: "",
            firstName: "",
            lastName: ""
        };
    }

    submit = () => {
        this.props.signUpAction(this.state, this.props.history);
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
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        required={true}
                        value={this.state.password}
                        onChange={(event) => this.setState({password: event.target.value})}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="repassword"
                        label="Repeat password"
                        type="password"
                        required={true}
                        value={this.state.repassword}
                        onChange={(event) => this.setState({repassword: event.target.value})}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="nickname"
                        label="Nickname"
                        type="text"
                        required={true}
                        value={this.state.nickname}
                        onChange={(event) => this.setState({nickname: event.target.value})}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="firstName"
                        label="First name"
                        type="text"
                        required={true}
                        value={this.state.firstName}
                        onChange={(event) => this.setState({firstName: event.target.value})}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="lastName"
                        label="Last name"
                        type="text"
                        required={true}
                        value={this.state.lastName}
                        onChange={(event) => this.setState({lastName: event.target.value})}
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

//TODO: add form validations

function mapStateToProps(state) {
    return {errorMessage: state.signUp.error};
}

const reduxFormSignUp = reduxForm({
    form: 'signUp'
})(SignUpForm);

export default connect(mapStateToProps, {signUpAction})(reduxFormSignUp);