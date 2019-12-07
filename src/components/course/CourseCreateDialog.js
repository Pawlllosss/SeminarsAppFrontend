import React from 'react';
import axios from "axios";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from '@material-ui/core';
import 'date-fns';
import endOfDay from 'date-fns/endOfDay'
import format from 'date-fns/format'
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import {AddOutlined as AddIcon} from "@material-ui/icons";
import {COURSE_API_PATH} from "./CourseConstants";
import {API_URL} from "../../config";
import getAuthorizationBearerHeader from "../../utils/authentication/BearerTokenSetter";

const CourseCreateDialog = (props) => {

    const [isOpen, setIsOpen] = React.useState(false);
    const [name, setName] = React.useState("");
    const [date, setDate] = React.useState(endOfDay(new Date()));

    const handleClickOpen = () => {
        setIsOpen(true);
    };

    const handleChange = (event, stateChangeFunction) => {
        stateChangeFunction(event.target.value);
    };

    const handleDateChange = date => {
        console.log(date);
        setDate(date);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const endpointDateFormat = format(date, 'yyyy-MM-dd HH:mm:ss');
        axios.post(API_URL + COURSE_API_PATH, {name: name, voteEndDate: endpointDateFormat}, { headers: getAuthorizationBearerHeader()})
            .finally(() => props.fetchCourses());
        setIsOpen(false);
    };

    const divStyle = {display: 'inline'};

    return (
        <div style={divStyle}>
            <Button color="primary" onClick={handleClickOpen} endIcon={<AddIcon />}>
                Add course
            </Button>
            <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create course</DialogTitle>
                <DialogContentText>
                    You are going to create a new course.
                </DialogContentText>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        required={true}
                        value={name}
                        onChange={(event) => handleChange(event, setName)}
                        fullWidth
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Vote end date"
                            required={true}
                            value={date}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            fullWidth
                        />
                        <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            label="Vote end hour"
                            required={true}
                            value={date}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                            fullWidth
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

export default CourseCreateDialog;