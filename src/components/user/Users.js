import React, {Fragment} from 'react';
import {Route, Link, Redirect} from 'react-router-dom'
import axios from 'axios';
import {
    Typography,
    Button,
    IconButton,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction
} from "@material-ui/core";
import {API_URL} from "../../config";
import getAuthorizationBearerHeader from "../../utils/authentication/BearerTokenSetter";

class Users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };

        this.API_BASE_PATH = API_URL;
        this.USER_PATH = 'user/';
        this.CURRENT_COMPONENT_PATH = '/users';
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers() {
        axios.get(this.API_BASE_PATH + this.USER_PATH, { headers: getAuthorizationBearerHeader()})
            .then(response => this.setState({users: response.data._embedded.userResponseDToes}));
    }

    getUserNodes() {
        const users = this.state.users;
        const userNodes = users.map(user => (
           <ListItem
               key={user._links.self.href}
               button
               component={Link}
               to={user._links.self.href}
           >
               <ListItemText
                   primary = {user.nickname}
                   secondary = {user.firstName + " " + user.lastName}
               />
           </ListItem>
        ));
        return userNodes;
    }

    render() {
        const userNodes = this.getUserNodes();

        return (
            <div className="Users">
                <Fragment>
                    <Typography variant="display1">Users</Typography>
                    <Paper elevation={1}>
                        <List>{userNodes}</List>
                    </Paper>
                </Fragment>
            </div>
        );
    }
}

export default Users;