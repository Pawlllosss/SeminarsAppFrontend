import React from 'react';
import axios from "axios";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import 'date-fns';
import endOfDay from 'date-fns/endOfDay'
import format from 'date-fns/format'
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import {AddOutlined as AddIcon} from "@material-ui/icons";
import getAuthorizationBearerHeader from "../../../utils/authentication/BearerTokenSetter";

const SeminarCreateDialog = (props) => {

    const topicName = props.topic.name;

    const [isOpen, setIsOpen] = React.useState(false);
    const [date, setDate] = React.useState(endOfDay(new Date()));

    const handleClickOpen = () => {
        setIsOpen(true);
    };

    const handleDateChange = date => {
        setDate(date);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const endpointDateFormat = format(date, 'yyyy-MM-dd HH:mm:ss');
        axios.post(props.topic._links.createSeminar.href, {date: endpointDateFormat}, { headers: getAuthorizationBearerHeader()});
        setIsOpen(false);
    };

    const divStyle = {display: 'inline'};

    return (
        <div style={divStyle}>
            <Button color="primary" onClick={handleClickOpen} endIcon={<AddIcon />}>
                Add seminars
            </Button>
            <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create seminar</DialogTitle>
                <DialogContentText>
                    You are going to create a seminar for the following topic: {topicName}.
                </DialogContentText>
                <DialogContent>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date picker inline"
                        value={date}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                      />
                    </MuiPickersUtilsProvider>
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

export default SeminarCreateDialog;