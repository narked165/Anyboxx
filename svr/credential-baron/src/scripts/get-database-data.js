export { getDatabaseData as default }

async function getDatabaseData() {
    let location = '/get-database-data'
    let options = {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Origin': window.location.origin,
            'Cors': 'no-cors'
        }
    }
    try {
        let response = await fetch(location, options)
        if(response.ok) {
            let data = await response.json()
            let body = await data
            return body
        }
    }
    catch(e) {
        await Promise.reject(e)
    }
}