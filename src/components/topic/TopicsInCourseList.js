import React from 'react';
import axios from "axios";
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction
} from "@material-ui/core";
import TopicEditDialog from "./TopicEditDialog";

class TopicsInCourseList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            topics: []
        };
    }

    componentDidMount() {
        this.fetchTopics();
    }

    fetchTopics = () => {
        return axios.get(this.props.topicPath)
            .then(response => response.data)
            .then(data => data._embedded !== undefined ? data._embedded.topics : [])
            .then(topics => this.setState({topics: topics}));
    };

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
        //TODO: add secondary
        return this.state.topics.map(topic => (
            <ListItem key={topic._links.self.href} button>
                <ListItemText primary={topic.name}/>
                <ListItemSecondaryAction>
                    <TopicEditDialog topic={topic} fetchTopics={this.fetchTopics} />
                </ListItemSecondaryAction>
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
