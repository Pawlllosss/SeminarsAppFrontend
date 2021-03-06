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
import {AddOutlined as AddIcon} from "@material-ui/icons";
import getAuthorizationBearerHeader from "../../utils/authentication/BearerTokenSetter";

const TopicCreateDialog = (props) => {

    const [isOpen, setIsOpen] = React.useState(false);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

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
        axios.post(props.createTopicPath, {name, description}, { headers: getAuthorizationBearerHeader()})
            .finally(() => props.fetchCourses());
        //TODO: add input validations
        setIsOpen(false);
    };

    const divStyle = {display: 'inline'};

    return (
        <div style={divStyle}>
            <Button color="primary" onClick={handleClickOpen} endIcon={<AddIcon />}>
                Add topic
            </Button>
            <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create topic</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        required={true}
                        onChange={(event) => handleChange(event, setName)}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        label="Description"
                        type="text"
                        required={true}
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

export default TopicCreateDialog;