import React from 'react';
import axios from "axios";
import {
    Button,
    Checkbox,
    Collapse,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Grid
} from "@material-ui/core";
import {
    ExpandMore,
    ExpandLess
} from '@material-ui/icons';
import {API_URL} from "../../config";
import {ROLES_API_PATH, VOTER_ROLES_PATH} from "../../roles/RolesConstants";
import getAuthorizationBearerHeader from "../../utils/authentication/BearerTokenSetter";

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            isOpen: false,
            checkedRoles: [],
            leftSideItems: [],
            rightSideItems: []
        };

        this.API_BASE_PATH = API_URL;
        this.USER_PATH = 'user/';
    }

    componentDidMount() {
        this.fetchVoterRoles();
    }

    fetchVoterRoles() {
        axios.get(this.API_BASE_PATH + ROLES_API_PATH + VOTER_ROLES_PATH, { headers: getAuthorizationBearerHeader()})
            .then(response => response.data)
            .then(this.mapCourseVoterRoles)
            .then(roles => this.prepareVoterRoleListInitialState(roles));
    }

    mapCourseVoterRoles(roles) {
        return roles.map(role => {return {id: role.roleId, courseName: role.courseName}});
    }


    //TODO: at the end?
    getUserRolesDifferentThanVoter = (user) => {
        return user.roles
            .filter(role => role.name.includes("VOTER_", 0));
    };

    // const user = props.user;
    // const userVoteUnrelatedRoles = getUserRolesDifferentThanVoter(user);
    // //TODO: separate collapsable item to another component, maybe use redux to propagate available voterRoles
    // const voterRoles = props.voterRoles;

    // const [isOpen, setIsOpen] = React.useState(false);
    // const [checkedRoles, setCheckedRoles] = React.useState([]);
    // const [leftSideItems, setLeftSideItems] = React.useState([]);
    // const [rightSideItems, setRightSideItems] = React.useState([]);

    prepareVoterRoleListInitialState = (voterRoles) => {
        const leftSide = [];
        const rightSide = [];

        const userRolesId = this.state.user.roles
            .map(role => role.id);

        console.log(voterRoles);

        voterRoles.forEach(voterRole => {
            if (userRolesId.includes(voterRole.id)) {
                rightSide.push(voterRole);
            } else {
                leftSide.push(voterRole);
            }
        });

        this.setLeftSideItems(leftSide);
        this.setRightSideItems(rightSide);
    };

    setLeftSideItems = (items) => {
        this.setState({leftSideItems: items});
    };

    setRightSideItems = (items) => {
        this.setState({rightSideItems: items});
    };

    expandUser = () => {
        this.toggleIsOpen();
    };

    toggleIsOpen() {
        this.setState({isOpen: !this.state.isOpen});
    }

    createVoterRolesList = roles => (
        <List dense component="div" role="list">
            {roles.map(role => {
                const labelId = `transfer-list-item-${role}-label`;

                return (
                    <ListItem key={role.id} role="listitem" button onClick={this.handleToggle(role)}>
                        <ListItemIcon>
                            <Checkbox
                                checked={this.state.checkedRoles.indexOf(role) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={`List item ${role + 1}`} />
                    </ListItem>
                    );
                })}
        </List>
            );

    handleToggle = (role) => {

    };

    render() {
        return (<div>
            <ListItem
                key={this.state.user._links.self.href}
                button onClick={this.expandUser}
            >
                <ListItemText
                    primary={this.state.user.nickname}
                    secondary={this.state.user.firstName + " " + this.state.user.lastName}
                />
                {this.state.isOpen ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse in={this.state.isOpen} timeout="auto" unmountOnExit>
                <Grid container spacing={2} justify="center" alignItems="center">
                    <Grid item>{this.createVoterRolesList(this.state.leftSideItems)}</Grid>
                    <Grid item>
                        <Grid container direction="column" alignItems="center">
                            <Button
                                variant="outlined"
                                size="small"
                                // onClick={handleAllRight}
                                // disabled={left.length === 0}
                                aria-label="move all right"
                            >
                                ≫
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                // onClick={handleCheckedRight}
                                // disabled={leftChecked.length === 0}
                                aria-label="move selected right"
                            >
                                &gt;
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                // onClick={handleCheckedLeft}
                                // disabled={rightChecked.length === 0}
                                aria-label="move selected left"
                            >
                                &lt;
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                // onClick={handleAllLeft}
                                // disabled={right.length === 0}
                                aria-label="move all left"
                            >
                                ≪
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item>{this.createVoterRolesList(this.state.rightSideItems)}</Grid>
                </Grid>
            </Collapse>
        </div>
        );
    };
}

export default User;