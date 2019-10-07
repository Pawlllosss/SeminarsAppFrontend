import React from 'react';
import {connect} from 'react-redux';

export default function (ComposedComponent) {

    class ComponentForNotAuthenticated extends React.Component {

        componentWillMount() {
            if(this.props.authenticated) {
                this.props.history.push('/');
            }
        }

        componentWillUpdate(nextProps) {
            if(nextProps.authenticated) {
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