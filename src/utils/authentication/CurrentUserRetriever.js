export default function retrieveCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}