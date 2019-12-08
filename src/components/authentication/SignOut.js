import React from "react";
import {connect} from 'react-redux';
import signOutAction from "../../_actions/authentication/SignOutAction";
import {Typography} from "@material-ui/core";

class SignOut extends React.Component {

    componentWillMount() {
        this.props.signOutAction();
    }

    render() {
        return <Typography variant="h3" align="center">You were successfully logged out</Typography>;
    }
}

export default connect(null, {signOutAction})(SignOut);