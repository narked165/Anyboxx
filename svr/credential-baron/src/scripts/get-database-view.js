export { getDatabaseView as default }

async function getDatabaseView() {
    let location = '/get-database-view'
    let options = {
        method: 'get',
        headers: {
            'Content-Type': 'text/html',
            'Access-Control-Allow-Origin': '*',
            'Origin': window.location.origin,
            'Cors': 'no-cors'
        }
    }

    try {
        let response = await fetch(location, options)
        if (response.ok) {
            let data = await response.text()
            let body = await data
            return body
        }
    }

    catch(e) {
        await Promise.reject(e)
    }
}