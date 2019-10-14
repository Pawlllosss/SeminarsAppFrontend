export default function hasUserPrivilege(privileges, privilegeName) {
    const userPrivilegeNames = privileges.map(privilege => privilege.name);
    return userPrivilegeNames.includes(privilegeName);
}