export default function retrieveCurrentUser() {
    return localStorage.getItem('currentUser');
}