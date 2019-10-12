import React, {Fragment} from 'react';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom'
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
import {find} from 'lodash';
import Course from "./Course";
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
        this.COURSE_EDITOR_PATH = '/courses-editor/';
    }

    componentDidMount() {
        this.fetchCourses();
    }


    fetchCourses() {
        axios.get(this.API_BASE_PATH + this.COURSE_PATH)
            .then(response => this.setState({courses: response.data._embedded.courses}));
    }

    async deleteCourse(course) {
        console.log(course)

        if(window.confirm('Are you sure you want to delete ' + course.name)) {
            axios.delete(course._links.delete.href, { headers: getAuthorizationBearerHeader()})
                .then(response => this.fetchCourses())
            //TODO: make catch
        }
    }

    editCourse = async (course) => {
    };

    saveCourse = async (course) => {
        await axios.post(this.API_BASE_PATH + this.COURSE_PATH, course, { headers: getAuthorizationBearerHeader()});

        this.fetchCourses();
        this.props.history.goBack();
    };

    renderNewCourseEditor = () => {
        //nie po id tylko po linku raczej
        //_links.self.href
        return <CourseEditor onSave={this.saveCourse}/>
    };

    renderExistingCourseEditor = ({ match: { params: { selfLink } } }) => {
        //nie po id tylko po linku raczej
        //_links.self.href
        return <CourseEditor onSave={this.saveCourse}/>
    };

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
                  <Button
                    aria-label='add'
                    color='secondary'
                    variant='fab'
                  >
                    <AddIcon/>
                  </Button>
                  <Paper elevation={1}>
                    <List>{courseNodes}</List>
                  </Paper>
                  <Button
                      variant="fab"
                      color="secondary"
                      aria-label="add"
                      component={Link}
                      to={'/courses' + this.COURSE_EDITOR_PATH}
                  >
                      <AddIcon/>
                  </Button>
                  <Route path='/another' render={() => console.log('test2')} />
                  <Route exact path={'/courses' + this.COURSE_EDITOR_PATH} render={this.renderNewCourseEditor}/>
                  <Route exact path={'/courses' + this.COURSE_EDITOR_PATH + ':selfLink'} render={this.renderExistingCourseEditor}/>
              </Fragment>
          </div>
        );
    }
}

export default AvailableCourses;