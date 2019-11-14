import React, {Fragment} from 'react';
import {API_URL} from "../../config";
import axios from "axios";
import {COURSE_API_PATH,} from "../course/CourseConstants";
import {
    Checkbox,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Paper,
    Typography
} from '@material-ui/core';
import getAuthorizationBearerHeader from "../../utils/authentication/BearerTokenSetter";
import SeminarCreateDialog from "./SeminarCreateDialog";

class SeminarsAdminView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            checkedCourse: "",
            topics: [],
            checkedTopic: "",
            seminars: []
        };
    }

    componentDidMount() {
        this.fetchCourses();
    }

    fetchCourses = () => {
        axios.get(API_URL + COURSE_API_PATH)
            .then(response => response.data)
            .then(data => data._embedded !== undefined ? data._embedded.courses : [])
            .then(courses => this.setState({courses: courses}));
    };

    getCourseNodes() {
        const courses = this.state.courses;

        return courses.map(course => (
            <ListItem key={course._links.self.href} button onClick={this.handleCourseToggle(course)}>
                <ListItemText
                    primary={course.name}
                />
                <ListItemIcon>
                    <Checkbox
                        checked={this.isCourseChecked(course)}
                        tabIndex={-1}
                    />
                </ListItemIcon>
            </ListItem>
        ));
    }

    handleCourseToggle = (course) => () => {
        const selfLink = course._links.self.href;

        if (this.state.checkedCourse === selfLink) {
            this.setState({
                checkedCourse: "",
                checkedTopic: "",
                topics: [],
                seminars: []
            });
        } else {
            this.setState({
                checkedCourse: selfLink,
                checkedTopic: "",
                seminars: []
            });
            this.fetchTopics(course);
        }
    };

    fetchTopics(course) {
        return axios.get(course._links.topics.href)
            .then(response => response.data)
            .then(data => data._embedded !== undefined ? data._embedded.topics : [])
            .then(topics => this.setState({topics: topics}));
    };

    isCourseChecked(course) {
        return this.state.checkedCourse === course._links.self.href;
    }

    getTopicNodes() {
        const topics = this.state.topics;

        return topics.map(topic => (
            <ListItem key={topic._links.self.href} button onClick={this.handleTopicToggle(topic)}>
                <ListItemIcon >
                    <Checkbox
                        edge="start"
                        checked={this.isTopicChecked(topic)}
                        tabIndex={-1}
                    />
                </ListItemIcon>
                <ListItemText
                    primary={topic.name}
                />
                <ListItemSecondaryAction>
                    <SeminarCreateDialog topic={topic} />
                </ListItemSecondaryAction>
            </ListItem>
        ));
    }

    handleTopicToggle = (topic) => () => {
        const selfLink = topic._links.self.href;

        if (this.state.checkedTopic === selfLink) {
            this.setState({
                checkedTopic: "",
                seminars: []
            });
        } else {
            this.setState({
                checkedTopic: selfLink,
            });
            this.fetchSeminars(topic);
        }
    };

    isTopicChecked(topic) {
        return this.state.checkedTopic === topic._links.self.href;
    }

    fetchSeminars(topic) {
        return axios.get(topic._links.seminars.href, { headers: getAuthorizationBearerHeader()})
            .then(response => response.data)
            .then(data => data._embedded !== undefined ? data._embedded.seminars : [])
            .then(seminars => this.setState({seminars: seminars}));
    };

    getSeminarNodes() {
        const seminars = this.state.seminars;

        return seminars.map(seminar => (
            <ListItem key={seminar._links.self.href}>
                <ListItemText
                    primary={seminar.date}
                />
            </ListItem>
        ));
    }

    render() {
        const courseNodes = this.getCourseNodes();
        const topicNodes = this.getTopicNodes();
        const seminarNodes = this.getSeminarNodes();

        return (
            <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item xs={3}>
                <Fragment>
                    <Typography variant="h6">Available Courses</Typography>
                    <Paper elevation={1}>
                        <List>{courseNodes}</List>
                    </Paper>
                </Fragment>
                </Grid>
                <Grid item xs={4}>
                <Fragment>
                    <Typography variant="h6">Topics</Typography>
                    <Paper elevation={1}>
                        <List>{topicNodes}</List>
                    </Paper>
                </Fragment>
                </Grid>
                <Grid item xs={3}>
                <Fragment>
                    <Typography variant="h6">Seminars</Typography>
                    <Paper elevation={1}>
                    <List>{seminarNodes}</List>
                    </Paper>
                </Fragment>
                </Grid>
            </Grid>
        );
    }
}

export default SeminarsAdminView;