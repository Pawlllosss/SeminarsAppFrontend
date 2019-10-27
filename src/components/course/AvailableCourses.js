import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Route, Link, Redirect} from 'react-router-dom'
import axios from 'axios';
import {find} from 'lodash';
import queryString from 'query-string';
import {
    Typography,
    Button,
    Paper,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Collapse
} from '@material-ui/core';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    ExpandMore,
    ExpandLess
} from '@material-ui/icons';
import {API_URL} from "../../config";
import CourseEditor from "./CourseEditor";
import getAuthorizationBearerHeader from "../../utils/authentication/BearerTokenSetter";
import CourseDeleteConfirmation from "./CourseDeleteConfirmation";
import hasUserPrivilege from "../../utils/authorization/UserPrivilegeChecker";
import {
    COURSE_API_PATH,
    COURSE_COMPONENT_PATH,
    COURSE_DELETE_CONFIRMATION_PATH,
    COURSE_EDITOR_CREATE_PATH, COURSE_EDITOR_EDIT_PATH,
    CRUD_ALL_COURSES_PRIVILEGE
} from "./CourseConstants";

class AvailableCourses extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            expandedCourses: []
        };

        this.API_BASE_PATH = API_URL;
    }

    componentDidMount() {
        this.fetchCourses();
    }

    fetchCourses() {
        axios.get(this.API_BASE_PATH + COURSE_API_PATH)
            .then(response => this.setState({courses: response.data._embedded.courses}));
    }

    getCourseNodes() {
        const courses = this.state.courses;
        const courseNodes = courses.map(course => (
            <ListItem key={course._links.self.href} button onClick={() => this.setCourseExpandedState(course._links.self.href)}>
                {this.isCourseExpanded(course._links.self.href) ? <ExpandLess/> : <ExpandMore/>}
                <ListItemText
                    primary={course.name}
                />
                <ListItemSecondaryAction>
                    {this.canPerformCRUD() && this.createUpdateButton(course)}
                    {this.canPerformCRUD() && this.createDeleteButton(course)}
                </ListItemSecondaryAction>
                <Collapse in={this.isCourseExpanded(course._links.self.href)} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button>
                            <ListItemText primary="Starred" />
                        </ListItem>
                    </List>
                </Collapse>
            </ListItem>
        ));
        return courseNodes;
    }

    setCourseExpandedState(courseSelfLink) {
        const expandedCourses = this.state.expandedCourses;
        const indexOfExpandedCourse = expandedCourses.indexOf(courseSelfLink);

        if (indexOfExpandedCourse === - 1) {
            expandedCourses.push(courseSelfLink);
        } else {
            expandedCourses.splice(indexOfExpandedCourse, 1);
        }

        this.setState({expandedCourses: expandedCourses});
    }

    canPerformCRUD() {
        return this.props.authenticated && hasUserPrivilege(this.props.privileges, CRUD_ALL_COURSES_PRIVILEGE);
    }

    createUpdateButton(course) {
        return <IconButton
            color="inherit"
            component={Link}
            to={COURSE_COMPONENT_PATH + COURSE_EDITOR_EDIT_PATH + '?updateLink=' + course._links.update.href}
        >
            <EditIcon/>
        </IconButton>;
    }

    createDeleteButton(course) {
        return <IconButton
            color="inherit"
            component={Link}
            to={COURSE_COMPONENT_PATH + COURSE_DELETE_CONFIRMATION_PATH + '?deleteLink=' + course._links.delete.href}
        >
            <DeleteIcon/>
        </IconButton>;
    }

    isCourseExpanded(courseSelfLink) {
        return this.state.expandedCourses.indexOf(courseSelfLink) !== -1;
    }

    createAddButton() {
        return <Button
            variant="fab"
            color="secondary"
            aria-label="add"
            component={Link}
            to={COURSE_COMPONENT_PATH + COURSE_EDITOR_CREATE_PATH}
        >
            <AddIcon/>
        </Button>;
    }

    renderNewCourseEditor = () => {
        return <CourseEditor onSave={this.saveCourse}/>
    };

    saveCourse = async (course) => {
        await axios.post(this.API_BASE_PATH + COURSE_API_PATH, course, { headers: getAuthorizationBearerHeader()});
        this.fetchCourses();
        this.props.history.goBack();
    };

    renderExistingCourseEditor = () => {
        const queryParameters = queryString.parse(this.props.location.search);
        const updateLink = queryParameters.updateLink;
        const course = find(this.state.courses, { _links: {update: {href: updateLink}}});

        if(!course) {
            return <Redirect to={COURSE_COMPONENT_PATH}/>
        }
        return <CourseEditor course={course} onSave={this.editCourse}/>
    };

    editCourse = async (course) => {
        const name = course.name;
        await axios.put(course._links.update.href, {name: name}, { headers: getAuthorizationBearerHeader()});
        this.fetchCourses();
        this.props.history.goBack();
    };

    renderCourseDeleteConfirmation = ()  => {
        const queryParameters = queryString.parse(this.props.location.search);
        const deleteLink = queryParameters.deleteLink;
        const course = find(this.state.courses, { _links: {delete: {href: deleteLink}}});

        if(!course) {
            return <Redirect to={COURSE_COMPONENT_PATH}/>
        }
        return <CourseDeleteConfirmation course={course} onDelete={this.deleteCourse}/>
    };

    deleteCourse = async (course) => {
        await axios.delete(course._links.delete.href, { headers: getAuthorizationBearerHeader()});
        this.fetchCourses();
        this.props.history.push(COURSE_COMPONENT_PATH);
    };

    render() {
        const courseNodes = this.getCourseNodes();

        return (
          <div className="AvailableCourses">
              <Fragment>
                  <Typography variant="display1">Available Courses</Typography>
                  {this.canPerformCRUD() && this.createAddButton()}
                  <Paper elevation={1}>
                      <List>{courseNodes}</List>
                  </Paper>
                  <Route exact path={COURSE_COMPONENT_PATH + COURSE_EDITOR_CREATE_PATH}
                         render={this.renderNewCourseEditor}/>
                  <Route path={COURSE_COMPONENT_PATH + COURSE_EDITOR_EDIT_PATH}
                         render={this.renderExistingCourseEditor}/>
                  <Route path={COURSE_COMPONENT_PATH + COURSE_DELETE_CONFIRMATION_PATH}
                         render={this.renderCourseDeleteConfirmation}/>
              </Fragment>
          </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.authentication.authenticated,
        nickname: state.authentication.nickname,
        privileges: state.authentication.privileges
    };
}

export default connect(mapStateToProps)(AvailableCourses);