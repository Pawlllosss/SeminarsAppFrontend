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
import format from 'date-fns/format'
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import {EditOutlined as EditIcon} from "@material-ui/icons";
import getAuthorizationBearerHeader from "../../utils/authentication/BearerTokenSetter";

const CourseEditDialog = (props) => {

    const courseName = props.course.name;
    const courseVoteEndDate = props.course.voteEndDate;

    const [isOpen, setIsOpen] = React.useState(false);
    const [name, setName] = React.useState(courseName);
    const [date, setDate] = React.useState(new Date(courseVoteEndDate));

    const handleClickOpen = () => {
        setIsOpen(true);
    };

    const handleChange = (event, stateChangeFunction) => {
        stateChangeFunction(event.target.value);
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
        axios.put(props.course._links.update.href, {name: name, voteEndDate: endpointDateFormat}, { headers: getAuthorizationBearerHeader()})
            .finally(() => props.fetchCourses());
        setIsOpen(false);
    };

    const divStyle = {display: 'inline'};

    return (
        <div style={divStyle}>
            <Button color="primary" onClick={handleClickOpen} endIcon={<EditIcon />}>
                Edit course
            </Button>
            <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create course</DialogTitle>
                <DialogContentText>
                    You are going to edit course {courseName}.
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

export default CourseEditDialog;