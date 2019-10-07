export default function getAuthorizationBearerHeader() {
    const token = localStorage.getItem('token');
    return {'Authorization': 'Bearer ' + token}
}