import React from 'react';
import {
    withStyles,
    Card,
    CardContent,
    CardActions,
    Modal,
    Button,
    TextField,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { Form, Field } from 'react-final-form';

function CourseEditor({course, onSave, history}) {
    return (
        <Form initialValues={course} onSubmit={onSave}>
            {({handleSubmit}) => (
                <Modal
                    onClose={() => history.goBack}
                    open
                >
                    <Card>
                        <form onSubmit={handleSubmit}>
                            <CardContent>
                                <Field name='name'>
                                    {({ input }) => <TextField label="Title" autoFocus {...input} />}
                                </Field>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" type="submit">Save</Button>
                                <Button size="small" onClick={() => history.goBack()}>Cancel</Button>
                            </CardActions>
                        </form>
                    </Card>
                </Modal>

            )}
        </Form>
    )
}

export default withRouter(CourseEditor);