export { secureRequest as default }
const requests = {
    PURGE: '/secure-purge-database',
    RESTORE: '/secure/restore-database',
    ADD_TEST_USERS: '/secure-add-test-users',
    PAUSE: '/secure-pause-database',
    HEALTH: '/secure-database-health'

}
async function secureRequest(app, POST) {
    console.log(requests[app])
    let location = requests[app]
    let options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Origin': window.location.origin,
            'Cors': 'no-cors',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(POST)
    }
    try {
        let response = await fetch(location, options)
        if(response.ok) {
            let data = await response.json()
            let body = await data
            return data
        }
    }
    catch(e) {
        await Promise.reject(e)
        console.error(e)
    }
}