import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

class Navbar extends React.Component {

    navbarLinks() {
        let links = [
            <li key='home'><Link to ="/">Home</Link></li>,
            <li key='courses'><Link to ="/courses">Courses</Link></li>,
        ];

        //TODO: tmp - should distinguish between admin and user
        if(this.props.authenticated) {
            const authenticatedUserLinks = [
                <li key='signOut'><Link to ='signout'>Sign out</Link></li>
            ];
            links.push(authenticatedUserLinks);
        } else {
            //for not authenticated
            const notAuthenticatedLinks = [
                <li key='signIn'><Link to ="/signin">SignIn</Link></li>
            ];
            links.push(notAuthenticatedLinks);
        }

        return links;
    }

    render() {
        return (
            <nav className='navbar'>
                <ul>
                    {this.navbarLinks()}
                </ul>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.authentication.authenticated
    };
}

export default connect(mapStateToProps)(Navbar);