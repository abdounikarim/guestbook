function fetchCollection(path) {
    //let ENV_API_ENDPOINT = 'https://localhost/';
    console.log(ENV_API_ENDPOINT);
    return fetch(ENV_API_ENDPOINT + path).then(resp => resp.json()).then(json => json['hydra:member']);
}

export function findConferences() {
    return fetchCollection('api/conferences');
}

export function findComments(conference) {
    return fetchCollection('api/comments?conference='+conference.id);
}
