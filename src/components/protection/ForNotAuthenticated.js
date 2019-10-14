import React from 'react';
import {connect} from 'react-redux';

export default function (ComposedComponent) {

    class ComponentForNotAuthenticated extends React.Component {

        componentWillMount() {
            if(this.isAuthenticated()) {
                this.props.history.push('/');
            }
        }

        isAuthenticated() {
            return this.props.authenticated;
        }

        componentWillUpdate(nextProps) {
            if(this.isAuthenticated()) {
                this.props.history.push('/');
            }
        }

        render() {
            return <ComposedComponent {...this.props}/>
        }
    }

    function mapStateToProps(state) {
        return {
            authenticated: state.authentication.authenticated
        };
    }

    return connect(mapStateToProps)(ComponentForNotAuthenticated);
}