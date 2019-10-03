import React from "react";
import {connect} from 'react-redux';
import signOutAction from "../../_actions/authentication/SignOutAction";

class SignOut extends React.Component {

    componentWillMount() {
        this.props.signOutAction();
    }

    render() {
        return <div>You were successfully logged out</div>;
    }
}

export default connect(null, {signOutAction})(SignOut);