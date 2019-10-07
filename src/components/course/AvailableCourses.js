import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {
withStyles,
Typography,
Button,
IconButton,
Paper,
List,
ListItem,
ListItemText,
ListItemSecondaryAction,
} from '@material-ui/core';
import { Delete as DeleteIcon, Add as AddIcon, Edit as EditIcon } from '@material-ui/icons';
import Course from "./Course";
import {API_URL} from "../../config";

class AvailableCourses extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courses: []
        };

        this.API_BASE_PATH = API_URL;
        this.coursePath ='course/';
    }

    componentDidMount() {
        this.fetchCourses();
    }


    fetchCourses() {
        axios.get(this.API_BASE_PATH + this.coursePath)
            .then(response => this.setState({courses: response.data._embedded.courses}));
    }

    deleteCourse(course) {
        if(window.confirm('Are you sure you want to delete ' + course.name)) {
            axios.delete(course._links.delete)
                .then(response => this.fetchCourses())
            //TODO: make catch
        }
    }

    editCourse(course) {
    }

    render() {
        const courses = this.state.courses;
        // const courseNodes = courses.map(course => <Course course={course} key={course._links}/>);
        const courseNodes = courses.map(course => (
            <ListItem key={course._links.self} button component={Link} to={course._links.self}>
                <ListItemText
                    primary={course.name}
                    // secondary={post.updatedAt && `Updated ${moment(post.updatedAt).fromNow()}`}
                />
                <ListItemSecondaryAction>
                    <IconButton onClick={() => this.editCourse(course)} color="inherit">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => this.deleteCourse(course)} color="inherit">
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        ));

        return (
          <div className="AvailableCourses">
              <Fragment>
                  <Typography variant="display1">Available Courses</Typography>
                  <Paper elevation={1}>
                    <List>{courseNodes}</List>
                  </Paper>
              </Fragment>
          </div>
        );
    }
}

export default AvailableCourses;