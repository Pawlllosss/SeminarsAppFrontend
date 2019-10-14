import React from 'react';
import {connect} from 'react-redux';
import hasUserPrivilege from "../../utils/authorization/UserPrivilegeChecker";

export default function (ComposedComponent, privilege) {

    class ComponentForPrivileged extends React.Component {

        componentWillMount() {
            if(this.isPrivileged()) {
                this.props.history.push('/');
            }
        }

        isPrivileged() {
            return !(this.props.authenticated && hasUserPrivilege(this.props.privileges, privilege));
        }

        componentWillUpdate(nextProps) {
            if(this.isPrivileged()) {
                this.props.history.push('/');
            }
        }

        render() {
            return <ComposedComponent {...this.props}/>
        }
    }

    function mapStateToProps(state) {
        return {
            authenticated: state.authentication.authenticated,
            privileges: state.authentication.privileges
        };
    }

    return connect(mapStateToProps)(ComponentForPrivileged);
}