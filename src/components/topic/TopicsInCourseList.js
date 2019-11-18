import React from 'react';
import axios from "axios";
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction
} from "@material-ui/core";
import TopicEditDialog from "./TopicEditDialog";
import TopicDeleteDialog from "./TopicDeleteDialog";
import connect from "react-redux/es/connect/connect";
import hasUserPrivilege from "../../utils/authorization/UserPrivilegeChecker";
import {CRUD_ALL_TOPICS_PRIVILEGE} from "./TopicConstants";

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
        return this.state.topics.map(topic => (
            <ListItem key={topic._links.self.href} button>
                <ListItemText primary={topic.name} secondary={topic.description}/>
                <ListItemSecondaryAction>
                    {this.canPerformTopicCRUD() && <TopicEditDialog topic={topic} fetchTopics={this.fetchTopics} /> }
                    {this.canPerformTopicCRUD() && <TopicDeleteDialog topic={topic} fetchTopics={this.fetchTopics} /> }
                </ListItemSecondaryAction>
            </ListItem>
        ));
    }

    canPerformTopicCRUD() {
        return this.props.authenticated && hasUserPrivilege(this.props.privileges, CRUD_ALL_TOPICS_PRIVILEGE);
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

function mapStateToProps(state) {
    return {
        authenticated: state.authentication.authenticated,
        nickname: state.authentication.nickname,
        privileges: state.authentication.privileges
    };
}

export default connect(mapStateToProps)(TopicsInCourseList);
