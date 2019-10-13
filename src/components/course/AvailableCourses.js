import React, {Fragment} from 'react';
import {Route, Link, Redirect} from 'react-router-dom'
import axios from 'axios';
import {find} from 'lodash';
import queryString from 'query-string';
import {
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
import {API_URL} from "../../config";
import CourseEditor from "./CourseEditor";
import getAuthorizationBearerHeader from "../../utils/authentication/BearerTokenSetter";

class AvailableCourses extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courses: []
        };

        this.API_BASE_PATH = API_URL;
        this.COURSE_PATH = 'course/';
        this.COURSE_EDITOR_CREATE_PATH = '/courses-editor/create';
        this.COURSE_EDITOR_EDIT_PATH = '/courses-editor/edit';
    }

    componentDidMount() {
        this.fetchCourses();
    }

    fetchCourses() {
        axios.get(this.API_BASE_PATH + this.COURSE_PATH)
            .then(response => this.setState({courses: response.data._embedded.courses}));
    }

    getCourseNodes() {
        const courses = this.state.courses;
        const courseNodes = courses.map(course => (
            <ListItem key={course._links.self.href} button component={Link} to={course._links.self.href}>
                <ListItemText
                    primary={course.name}
                />
                <ListItemSecondaryAction>
                    <IconButton
                        color="inherit"
                        component={Link}
                        to={'/courses' + this.COURSE_EDITOR_EDIT_PATH + '?updateLink=' + course._links.update.href}
                    >
                        <EditIcon/>
                    </IconButton>
                    <IconButton onClick={() => this.deleteCourse(course)} color="inherit">
                        <DeleteIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        ));
        return courseNodes;
    }

    async deleteCourse(course) {
        if(window.confirm('Are you sure you want to delete ' + course.name)) {
            await axios.delete(course._links.delete.href, { headers: getAuthorizationBearerHeader()});
            this.fetchCourses();
        }
    }

    renderNewCourseEditor = () => {
        return <CourseEditor onSave={this.saveCourse}/>
    };

    saveCourse = async (course) => {
        await axios.post(this.API_BASE_PATH + this.COURSE_PATH, course, { headers: getAuthorizationBearerHeader()});

        this.fetchCourses();
        this.props.history.goBack();
    };

    renderExistingCourseEditor = () => {
        const queryParameters = queryString.parse(this.props.location.search);
        const updateLink = queryParameters.updateLink;
        const course = find(this.state.courses, { _links: {update: {href: updateLink}}});

        if(!course) {
            return <Redirect to={'/courses'}/>
        }
        return <CourseEditor course={course} onSave={this.editCourse}/>
    };

    editCourse = async (course) => {
        const name = course.name;
        await axios.put(course._links.update.href, name, { headers: getAuthorizationBearerHeader()});

        this.fetchCourses();
        this.props.history.goBack();
    };

    render() {
        const courseNodes = this.getCourseNodes();

        return (
          <div className="AvailableCourses">
              <Fragment>
                  <Typography variant="display1">Available Courses</Typography>
                  <Button
                      variant="fab"
                      color="secondary"
                      aria-label="add"
                      component={Link}
                      to={'/courses' + this.COURSE_EDITOR_CREATE_PATH}
                  >
                      <AddIcon/>
                  </Button>
                  <Paper elevation={1}>
                    <List>{courseNodes}</List>
                  </Paper>
                  <Route path='/another' render={() => console.log('test2')} />
                  <Route exact path={'/courses' + this.COURSE_EDITOR_CREATE_PATH} render={this.renderNewCourseEditor}/>
                  <Route path={'/courses' + this.COURSE_EDITOR_EDIT_PATH} render={this.renderExistingCourseEditor}/>
              </Fragment>
          </div>
        );
    }
}

export default AvailableCourses;