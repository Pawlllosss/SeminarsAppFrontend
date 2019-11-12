import React, {Fragment} from 'react';
import {API_URL} from "../../config";
import axios from "axios";
import {
    COURSE_API_PATH,
} from "../course/CourseConstants";
import {
    Checkbox,
    Typography,
    Paper,
    Grid,
    List,
    ListItem,
    ListItemText,
    ListItemIcon
} from '@material-ui/core';

class SeminarsAdminView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            expandedCourses: [],
            checkedCourse: ""
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
            <ListItem key={course._links.self.href} button onClick={this.handleToggle(course)}>
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

    handleToggle = (course) => () => {
        const selfLink = course._links.self.href;

        if (this.state.checkedCourse === selfLink) {
            this.setState({checkedCourse: ""});
        } else {
            //TODO: think about checked topic and seminars!
            this.setState({checkedCourse: selfLink});
            //fetch courses and clear previous state
        }
    }

    isCourseChecked(course) {
        return this.state.checkedCourse === course._links.self.href;
    }

    render() {
        const courseNodes = this.getCourseNodes();

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
                <Grid item xs={3}>
                <Fragment>
                    <Typography variant="h6">Topics</Typography>
                    <Paper elevation={1}>
                        <List></List>
                        {/*<List>{courseNodes}</List>*/}
                    </Paper>
                </Fragment>
                </Grid>
                <Grid item xs={3}>
                <Fragment>
                    <Typography variant="h6">Seminars</Typography>
                    <Paper elevation={1}>
                    <List></List>
                    </Paper>
                </Fragment>
                </Grid>
            </Grid>
        );
    }
}

export default SeminarsAdminView;