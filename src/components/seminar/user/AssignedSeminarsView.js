import React, {Fragment} from 'react';
import {API_URL} from "../../../config";
import axios from "axios";
import {List, ListItem, ListItemText, Paper, Typography} from '@material-ui/core';
import getAuthorizationBearerHeader from "../../../utils/authentication/BearerTokenSetter";
import {getHumanReadableDate} from "../SeminarUtils";
import {USER_CURRENT_USER_PATH} from "../../user/UserConstants";

class AssignedSeminarsView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            seminars: []
        };
    }

    componentDidMount() {
        this.fetchUserSeminars();
    }

    fetchUserSeminars = () => {
        axios.get(API_URL + USER_CURRENT_USER_PATH, {headers: getAuthorizationBearerHeader()})
            .then(response => response.data)
            .then(data => data.seminars)
            .then(seminars => this.setState({seminars: seminars}));
    };

    getSeminarNodes() {
        const seminars = this.state.seminars;

        return seminars.map(seminar => (
            <ListItem key={seminar.id}>
                <ListItemText
                    primary={seminar.topicName}
                    secondary={getHumanReadableDate(seminar.date) + " - " + seminar.courseName}
                />

            </ListItem>
        ));
    }

    render() {
        const seminarNodes = this.getSeminarNodes();

        return (
            <Fragment>
                <Typography variant="h6">Seminars assigned to you</Typography>
                <Paper elevation={1}>
                    <List>
                        {seminarNodes}
                    </List>
                </Paper>
            </Fragment>
        );
    }
}

export default AssignedSeminarsView;