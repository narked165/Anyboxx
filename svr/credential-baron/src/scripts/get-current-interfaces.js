export { getCurrentInterfaces as default }

async function getCurrentInterfaces() {
    let location = '/interfaces'
    let options = {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }
    let data
    try {
        let response = await fetch(location, options)
        response.ok
            ? data = await response.json()
            : await Promise.reject(response.status, response.statusText)
        return await data
    }
    catch(e) {
        await Promise.reject(e)
    }
}