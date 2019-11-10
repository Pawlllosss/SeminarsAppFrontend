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
import {EditOutlined as EditIcon} from "@material-ui/icons";
import getAuthorizationBearerHeader from "../../utils/authentication/BearerTokenSetter";

const TopicEditDialog = (props) => {

    const originalName = props.topic.name;
    const originalDescription = props.topic.description;

    const [isOpen, setIsOpen] = React.useState(false);
    const [name, setName] = React.useState(originalName);
    const [description, setDescription] = React.useState(originalDescription);

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
        //TODO: add input validations
        axios.put(props.topic._links.update.href, {name, description}, { headers: getAuthorizationBearerHeader()})
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
                <EditIcon />
            </IconButton>
            <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit topic</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You are going to edit the following topic: {originalName}.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        required={true}
                        defaultValue={originalName}
                        onChange={(event) => handleChange(event, setName)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        required={true}
                        defaultValue={originalDescription}
                        onChange={(event) => handleChange(event, setDescription)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};

export default TopicEditDialog;