import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {
    AppBar,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    Typography
} from '@material-ui/core';
import {
    Home,
    Book,
    MenuBook,
    ExitToApp,
    PermIdentity,
    PersonAdd,
    People
} from '@material-ui/icons'
import hasUserPrivilege from "../utils/authorization/UserPrivilegeChecker";
import {
    CRUD_ALL_SEMINARS_PRIVILEGE,
    SEMINAR_ADMIN_COMPONENT_PATH,
    SEMINAR_USER_COMPONENT_PATH
} from "./seminar/SeminarConstants";

class Navbar extends React.Component {

    navbarLinks() {
        let links = [
            this.createListItem('Home', '/', Home),
            this.createListItem('Courses', '/courses', Book)
        ];

        if(this.props.authenticated) {
            this.addLinksForAuthenticatedUsers(links);
        }
        else {
            this.addLinksForNotAuthenticatedUsers(links);
        }

        return links;
    }

    createListItem(name, path, Icon) {
        return (
            <ListItemText key={name} inset>
                <Typography color='inherit' variant='title' component={Link} to={path}>
                    {name}  <Icon />
                </Typography>
            </ListItemText>
        );
    }

    addLinksForAuthenticatedUsers(links) {
        if (this.canManageUsers()) {
            const manageUsersLinks = [this.createListItem('Users', '/users', People)];
            links.push(manageUsersLinks);
        }

        if (this.canManageSeminars()) {
            const manageSeminarsLinks = [this.createListItem('Manage seminars', SEMINAR_ADMIN_COMPONENT_PATH, MenuBook)];
            links.push(manageSeminarsLinks);
        } else {
            const seminarsLinks = [this.createListItem('Seminars', SEMINAR_USER_COMPONENT_PATH, MenuBook)]
            links.push(seminarsLinks);
        }

        const authenticatedUserLinks = [
            this.createListItem('Sign Out', '/signout', ExitToApp)
        ];
        links.push(authenticatedUserLinks);
    }

    canManageUsers() {
        return hasUserPrivilege(this.props.privileges, 'CRUD_ALL_USERS');
    }

    canManageSeminars() {
        return hasUserPrivilege(this.props.privileges, CRUD_ALL_SEMINARS_PRIVILEGE);
    }

    addLinksForNotAuthenticatedUsers(links) {
        const notAuthenticatedLinks = [
            this.createListItem('Sign In', '/signin', PermIdentity),
            this.createListItem('Sign Up', '/signup', PersonAdd)
        ];
        links.push(notAuthenticatedLinks);
    }

    currentUserInformation() {
        if(!this.props.authenticated) {
            return;
        }
        const nickname = this.props.nickname;
        return <p>{nickname}</p>;
    }

    render() {
        return (
            <div className='navbar'>
                <AppBar color='primary' position='static'>
                    <Toolbar>
                        <Typography variant="title" color="inherit">Seminars</Typography>

                        <List component='nav'>
                            <ListItem component='div'>
                                {this.navbarLinks()}
                            </ListItem>
                        </List>
                        {this.currentUserInformation()}
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.authentication.authenticated,
        nickname: state.authentication.nickname,
        privileges: state.authentication.privileges
    };
}

export default connect(mapStateToProps)(Navbar);