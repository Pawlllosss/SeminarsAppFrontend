import React from 'react';
import axios from 'axios';
import Course from "./Course";

class AvailableCourses extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            courses: []
        };

        this.apiBasePath = 'https://seminars-api.herokuapp.com/';
        this.coursePath ='course/';
    }

    componentDidMount() {
        axios.get(this.apiBasePath + this.coursePath)
            .then(response => this.setState({courses : response.data._embedded.courses}));
    }

    render() {
        const courses = this.state.courses;
        const courseNodes = courses.map(course => <Course course={course} key={course._links}/>);
        console.log(courseNodes);

        return (
          <div className="AvailableCourses">
              <ul>{courseNodes}</ul>
          </div>
        );
    }
}

export default AvailableCourses;