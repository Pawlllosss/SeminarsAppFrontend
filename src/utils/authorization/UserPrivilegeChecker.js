import retrieveCurrentUser from "../authentication/CurrentUserRetriever";

export default function hasUserPrivilege(privilegeName) {
    const currentUser = JSON.parse(retrieveCurrentUser());
    const userPrivileges = currentUser.privileges;
    const userPrivilegeNames = userPrivileges.map(privilege => privilege.name);
    return userPrivilegeNames.includes(privilegeName);
}