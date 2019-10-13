import retrieveToken from "./TokenRetriever";

export default function getAuthorizationBearerHeader() {
    const token = retrieveToken();
    return {'Authorization': 'Bearer ' + token}
}