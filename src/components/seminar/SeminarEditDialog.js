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
import format from 'date-fns/format'
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import {EditOutlined as EditIcon} from "@material-ui/icons";
import getAuthorizationBearerHeader from "../../utils/authentication/BearerTokenSetter";
import {SEMINAR_DATE_ENDPOINT_FORMAT} from "./SeminarConstants";
import {getHumanReadableDate} from "./SeminarUtils";

const SeminarEditDialog = (props) => {

    const seminarDate = props.seminar.date;

    const [isOpen, setIsOpen] = React.useState(false);
    const [date, setDate] = React.useState(new Date(seminarDate));

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
        const endpointDateFormat = format(date, SEMINAR_DATE_ENDPOINT_FORMAT);
        axios.put(props.seminar._links.update.href, {date: endpointDateFormat}, { headers: getAuthorizationBearerHeader()});
        setIsOpen(false);
    };

    const divStyle = {display: 'inline'};

    return (
        <div style={divStyle}>
            <IconButton
                color="inherit"
                onClick={handleClickOpen}
            >
                <EditIcon/>
            </IconButton>
            <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create seminar</DialogTitle>
                <DialogContentText>
                    You are going to edit seminar at the date: {getHumanReadableDate(seminarDate)}.
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

export default SeminarEditDialog;