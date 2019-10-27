import React from 'react';
import axios from "axios";
import {List, ListItem, ListItemText} from "@material-ui/core";

class TopicsInCourseList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            topics: []
        };
    }

    componentDidMount() {
        this.fetchTopics(this.props.topicsURL);
    }

    fetchTopics(topicsURL) {
        return axios.get(topicsURL)
            .then(response => response.data)
            .then(data => data._embedded !== undefined ? data._embedded.topics : [])
            .then(topics => this.setState({topics: topics}));
    }

    createTopicNodes() {
        if (this.state.topics.length) {
            return this.createTopicNodesForCourseWithTopics();
        } else {
            return (
                this.createTopicNodeForCourseWithoutTopics()
            )
        }

    }

    createTopicNodesForCourseWithTopics() {
        return this.state.topics.map(topic => (
            <ListItem key={topic._links.self.href} button>
                <ListItemText primary={topic.name}/>
            </ListItem>
        ));
    }

    createTopicNodeForCourseWithoutTopics() {
        return <ListItem key={this.props.topicsURL} button>
            <ListItemText primary='No topics for this course'/>
        </ListItem>;
    }

    render() {
        const topicNodes = this.createTopicNodes();
        return (
            <List>
                {topicNodes}
            </List>
        );
    }
}

export default TopicsInCourseList;
