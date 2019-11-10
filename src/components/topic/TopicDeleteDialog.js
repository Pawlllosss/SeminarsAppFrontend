import React from 'react';
import axios from "axios";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    IconButton,

} from '@material-ui/core';
import {Link} from "react-router-dom";
import {DeleteOutlined as DeleteIcon} from "@material-ui/icons";
import getAuthorizationBearerHeader from "../../utils/authentication/BearerTokenSetter";

const TopicDeleteDialog = (props) => {

    const topicName = props.topic.name;

    const [isOpen, setIsOpen] = React.useState(false);

    const handleClickOpen = () => {
        setIsOpen(true);
    };

    const handleChange = (event, stateChangeFunction) => {
        stateChangeFunction(event.target.value);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.delete(props.topic._links.delete.href, { headers: getAuthorizationBearerHeader()})
            .finally(() => props.fetchTopics());

        setIsOpen(false);
    };

    const divStyle = {display: 'inline'};

    return (
        <div style={divStyle}>
            <IconButton
                color="inherit"
                component={Link}
                onClick={handleClickOpen}
            >
                <DeleteIcon />
            </IconButton>
            <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Delete topic</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the following topic: {topicName}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default TopicDeleteDialog;