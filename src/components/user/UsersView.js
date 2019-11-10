import React, {Fragment} from 'react';
import axios from 'axios';
import {List, Paper, Typography} from "@material-ui/core";
import {API_URL} from "../../config";
import getAuthorizationBearerHeader from "../../utils/authentication/BearerTokenSetter";
import User from "./User";

class UsersView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };

        this.API_BASE_PATH = API_URL;
        this.USER_PATH = 'user/';
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
           <User user={user} />
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

export default UsersView;