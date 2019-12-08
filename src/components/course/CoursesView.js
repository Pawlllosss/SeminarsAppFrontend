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
import {
    CRUD_ALL_TOPICS_PRIVILEGE
} from "../topic/TopicConstants"
import TopicsInCourseList from "../topic/TopicsInCourseList";
import TopicCreateDialog from "../topic/TopicCreateDialog";
import CourseCreateDialog from "./CourseCreateDialog";
import CourseEditDialog from "./CourseEditDialog";

class CoursesView extends React.Component {

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

    fetchCourses = () => {
        axios.get(this.API_BASE_PATH + COURSE_API_PATH)
            .then(response => response.data)
            .then(data => data._embedded !== undefined ? data._embedded.courses : [])
            .then(courses => this.setState({courses: courses}));
    };

    getCourseNodes() {
        const courses = this.state.courses;
        const courseNodes = courses.map(course => (
            <div key={course._links.self.href}>
                <ListItem button
                          onClick={() => this.setCourseExpandedState(course._links.self.href)}>
                    {this.isCourseExpanded(course._links.self.href) ? <ExpandLess/> : <ExpandMore/>}
                    <ListItemText
                        primary={course.name}
                    />
                    <ListItemSecondaryAction>
                        {this.canPerformTopicCRUD() && this.createAddTopicButton(course)}
                        {this.canPerformCourseCRUD() && <CourseEditDialog course={course} fetchCourses={this.fetchCourses} />}
                        {this.canPerformCourseCRUD() && this.createDeleteButton(course)}
                    </ListItemSecondaryAction>
                </ListItem>
                {this.renderCollapseComponent(course)}
            </div>
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

    canPerformTopicCRUD() {
        return this.props.authenticated && hasUserPrivilege(this.props.privileges, CRUD_ALL_TOPICS_PRIVILEGE);
    }

    canPerformCourseCRUD() {
        return this.props.authenticated && hasUserPrivilege(this.props.privileges, CRUD_ALL_COURSES_PRIVILEGE);
    }

    createAddTopicButton(course) {
        const createTopicForCoursePath = course._links.createTopic.href;
        return <TopicCreateDialog createTopicPath={createTopicForCoursePath} fetchCourses={this.fetchCourses}/>;
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

    renderCollapseComponent(course) {
        return <Collapse in={this.isCourseExpanded(course._links.self.href)} timeout="auto" unmountOnExit>
            <TopicsInCourseList topicPath={course._links.topics.href} />
        </Collapse>;
    };

    isCourseExpanded(courseSelfLink) {
        return this.state.expandedCourses.indexOf(courseSelfLink) !== -1;
    }

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
          <div className="AllCourses">
              <Fragment>
                  <Typography variant="h3" align="center">All courses</Typography>
                  {this.canPerformCourseCRUD() && <CourseCreateDialog fetchCourses={this.fetchCourses} />}
                  <Paper elevation={1}>
                      <List>{courseNodes}</List>
                  </Paper>
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

export default connect(mapStateToProps)(CoursesView);