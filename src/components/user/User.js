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
    Grid,
    Typography
} from "@material-ui/core";
import {
    Edit as EditIcon,
    ExpandMore,
    ExpandLess
} from '@material-ui/icons';
import {API_URL} from "../../config";
import {ROLES_API_PATH, VOTER_ROLES_PATH} from "../../roles/RolesConstants";
import getAuthorizationBearerHeader from "../../utils/authentication/BearerTokenSetter";
import {USER_API_PATH, USER_ROLE_PATH} from "./UserConstants";

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            isOpen: false,
            availableRolesSideItems: [],
            checkedAvailableRolesSideItems: [],
            currentRolesSideItems: [],
            checkedCurrentRolesSideItems: []
        };

        this.API_BASE_PATH = API_URL;
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


    prepareVoterRoleListInitialState = (voterRoles) => {
        const availableRolesSide = [];
        const currentRolesSide = [];

        const userRolesId = this.state.user.roles
            .map(role => role.id);

        voterRoles.forEach(voterRole => {
            if (userRolesId.includes(voterRole.id)) {
                currentRolesSide.push(voterRole);
            } else {
                availableRolesSide.push(voterRole);
            }
        });

        this.setAvailableRolesSideItems(availableRolesSide);
        this.setCurrentRolesSideItems(currentRolesSide);
    };


    setAvailableRolesSideItems = (items) => {
        this.setState({availableRolesSideItems: items});
    };

    setCheckedAvailableRolesSideItems = (items) => {
        this.setState({checkedAvailableRolesSideItems: items});
    };

    setCurrentRolesSideItems = (items) => {
        this.setState({currentRolesSideItems: items});
    };

    setCheckedCurrentRolesSideItems = (items) => {
        this.setState({checkedCurrentRolesSideItems: items});
    };

    expandUser = () => {
        this.toggleIsOpen();
    };

    toggleIsOpen() {
        this.setState({isOpen: !this.state.isOpen});
    }

    createVoterRolesList = (roles, handleToggle, isChecked) => (
        <List dense component="div" role="list">
            {roles.map(role => {
                const labelId = `transfer-list-item-${role}-label`;

                return (
                    <ListItem key={role.id} role="listitem" button onClick={handleToggle(role)}>
                        <ListItemIcon>
                            <Checkbox
                                checked={isChecked(role)}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={role.courseName} />
                    </ListItem>
                    );
                })}
        </List>
            );

    handleToggleAvailableRolesSideItems = (role) => () => {
        const roleIndexInChecked = this.state.checkedAvailableRolesSideItems.indexOf(role);
        const checkedRoles = this.state.checkedAvailableRolesSideItems;

        if (roleIndexInChecked === - 1) {
            checkedRoles.push(role);
        } else {
            checkedRoles.splice(roleIndexInChecked, 1);
        }

        this.setState({checkedAvailableRolesSideItems: checkedRoles});
    };

    isAvailableRolesSiteItemChecked = (role) => {
        return this.state.checkedAvailableRolesSideItems.indexOf(role) !== -1;
    };

    handleToggleCurrentRolesSideItems = (role) => () => {
        const roleIndexInChecked = this.state.checkedCurrentRolesSideItems.indexOf(role);
        const checkedRoles = this.state.checkedCurrentRolesSideItems;

        if (roleIndexInChecked === - 1) {
            checkedRoles.push(role);
        } else {
            checkedRoles.splice(roleIndexInChecked, 1);
        }

        this.setState({checkedCurrentRolesSideItems: checkedRoles});
    };

    isCurrentRolesSiteItemChecked = (role) => {
        return this.state.checkedCurrentRolesSideItems.indexOf(role) !== -1;
    };

    handleAllAvailableRolesToCurrent = () => {
        const currentRoles = this.state.currentRolesSideItems;
        const availableRoles = this.state.availableRolesSideItems;
        this.setAvailableRolesSideItems([]);
        this.setCheckedAvailableRolesSideItems([]);
        this.setCurrentRolesSideItems(currentRoles.concat(availableRoles));
    };

    handleCheckedAvailableRolesToCurrent = () => {
        const currentRoles = this.state.currentRolesSideItems;
        const checkedRoles = this.state.checkedAvailableRolesSideItems;
        this.setCheckedAvailableRolesSideItems([]);
        this.setCurrentRolesSideItems(currentRoles.concat(checkedRoles));
        const availableRolesAfterMove = this.filterItems(this.state.availableRolesSideItems, checkedRoles);
        this.setAvailableRolesSideItems(availableRolesAfterMove);
    };

    filterItems(items, itemsToFilter) {
        return items.filter(item => itemsToFilter.indexOf(item) === -1);
    }

    handleCheckedCurrentRolesToAvailable = () => {
        const availableRoles = this.state.availableRolesSideItems;
        const checkedRoles = this.state.checkedCurrentRolesSideItems;
        this.setCheckedCurrentRolesSideItems([]);
        this.setAvailableRolesSideItems(availableRoles.concat(checkedRoles));
        const currentRolesAfterMove = this.filterItems(this.state.currentRolesSideItems, checkedRoles);
        this.setCurrentRolesSideItems(currentRolesAfterMove);
    };

    handleAllCurrentRolesToAvailable = () => {
        const availableRoles = this.state.availableRolesSideItems;
        const currentRoles = this.state.currentRolesSideItems;
        this.setCurrentRolesSideItems([]);
        this.setCheckedCurrentRolesSideItems([]);
        this.setAvailableRolesSideItems(availableRoles.concat(currentRoles));
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const userRolesDifferentThanVoter = this.getUserRolesDifferentThanVoter(this.state.user);
        const userRolesDifferentThanVoterIds = this.getIdFromRoles(userRolesDifferentThanVoter);
        const chosenVoterRoles = this.state.currentRolesSideItems;
        const chosenVoterRolesIds = this.getIdFromRoles(chosenVoterRoles);

        const newUserRolesIds = chosenVoterRolesIds.concat(userRolesDifferentThanVoterIds);
        const userId = this.state.user.id;

        axios.put(this.API_BASE_PATH + USER_API_PATH + USER_ROLE_PATH + userId, newUserRolesIds, { headers: getAuthorizationBearerHeader()});
    };

    getIdFromRoles = (roles) => {
        return roles.map(role => role.id);
    };

    getUserRolesDifferentThanVoter = (user) => {
        return user.roles
            .filter(role => !role.name.includes("VOTER_", 0));
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
                    <Typography variant="h6">
                        Available roles
                    </Typography>
                    <Grid item>{this.createVoterRolesList(this.state.availableRolesSideItems, this.handleToggleAvailableRolesSideItems, this.isAvailableRolesSiteItemChecked)}</Grid>
                    <Grid item>
                        <Grid container direction="column" alignItems="center">
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={this.handleAllAvailableRolesToCurrent}
                                disabled={this.state.availableRolesSideItems.length === 0}
                                aria-label="move all right"
                            >
                                ≫
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={this.handleCheckedAvailableRolesToCurrent}
                                disabled={this.state.checkedAvailableRolesSideItems.length === 0}
                                aria-label="move selected right"
                            >
                                &gt;
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={this.handleCheckedCurrentRolesToAvailable}
                                disabled={this.state.checkedCurrentRolesSideItems.length === 0}
                                aria-label="move selected left"
                            >
                                &lt;
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={this.handleAllCurrentRolesToAvailable}
                                disabled={this.state.currentRolesSideItems.length === 0}
                                aria-label="move all left"
                            >
                                ≪
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item>{this.createVoterRolesList(this.state.currentRolesSideItems,  this.handleToggleCurrentRolesSideItems, this.isCurrentRolesSiteItemChecked)}</Grid>
                    <Typography variant="h6">
                        Current roles
                    </Typography>
                </Grid>
                <Button color="primary" onClick={this.handleSubmit} endIcon={<EditIcon />}>
                    Assign new roles
                </Button>
            </Collapse>
        </div>
        );
    };
}

export default User;