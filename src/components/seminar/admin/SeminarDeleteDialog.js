import React from 'react';
import axios from "axios";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton
} from '@material-ui/core';
import 'date-fns';
import {DeleteOutlined as DeleteIcon} from "@material-ui/icons";
import getAuthorizationBearerHeader from "../../../utils/authentication/BearerTokenSetter";
import {getHumanReadableDate} from "../SeminarUtils";

const SeminarDeleteDialog = (props) => {

    const seminarDate = props.seminar.date;

    const [isOpen, setIsOpen] = React.useState(false);

    const handleClickOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.delete(props.seminar._links.delete.href, { headers: getAuthorizationBearerHeader()});
        setIsOpen(false);
    };

    const divStyle = {display: 'inline'};

    return (
        <div style={divStyle}>
            <IconButton
                color="inherit"
                onClick={handleClickOpen}
            >
                <DeleteIcon/>
            </IconButton>
            <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Delete seminar</DialogTitle>
                <DialogContentText>
                    You are going to delete the seminar at the date: {getHumanReadableDate(seminarDate)}.
                </DialogContentText>
                <DialogContent>
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

export default SeminarDeleteDialog;