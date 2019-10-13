import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {AppBar, List, ListItem, ListItemText, Toolbar, Typography} from '@material-ui/core';
import { Home, Book, ExitToApp, PermIdentity, PersonAdd} from '@material-ui/icons'

class Navbar extends React.Component {

    navbarLinks() {
        let links = [
            this.createListItem('Home', '/', Home),
            this.createListItem('Courses', '/courses', Book)
        ];

        if(this.props.authenticated) {
            const authenticatedUserLinks = [
                this.createListItem('Sign Out', '/signout', ExitToApp)
            ];
            links.push(authenticatedUserLinks);
        } else {
            const notAuthenticatedLinks = [
                this.createListItem('Sign In', '/signin', PermIdentity),
                this.createListItem('Sign Up', '/signup', PersonAdd)
            ];
            links.push(notAuthenticatedLinks);
        }

        return links;
    }

    createListItem(name, path, Icon) {
        return (
            <ListItemText inset>
                <Typography color='inherit' variant='title' component={Link} to={path}>
                        {name}  <Icon />
                </Typography>
            </ListItemText>
        );
    }

    currentUserInformation() {
        if(!this.props.authenticated) {
            return;
        }
        const currentUserStringed = localStorage.getItem('currentUser');
        const currentUser = JSON.parse(currentUserStringed);
        const nickname = currentUser.nickname;

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
        authenticated: state.authentication.authenticated
    };
}

export default connect(mapStateToProps)(Navbar);