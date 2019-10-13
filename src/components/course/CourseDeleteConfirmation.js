import React from 'react';
import {
    Card,
    CardContent,
    CardActions,
    Modal,
    Button,
    Typography
} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import {Form} from 'react-final-form';

function CourseDeleteConfirmation({course, onDelete, history}) {
    return (
        <Form onSubmit={onDelete}>
            {({handleSubmit}) => (
                <Modal
                    onClose={() => history.goBack}
                    open
                >
                    <Card>
                        <form onSubmit={handleSubmit}>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    Are you sure you want to delete: {course.name}?
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => onDelete(course)}>Delete</Button>
                                <Button size="small" onClick={() => history.goBack()}>Cancel</Button>
                            </CardActions>
                        </form>
                    </Card>
                </Modal>

            )}
        </Form>
    )
}

export default withRouter(CourseDeleteConfirmation);