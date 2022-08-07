export { purgeDatabase as default }

async function purgeDatabase() {
    let location = '/purge-database'
    let options = {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'Origin': window.location.origin,
            'Cors': 'no-cors'
        },
        body: JSON.stringify({
            username: 'BobFlobb',
            password: 'cornCobb'
        })
    }

    try {
        let response = await fetch(location, options)
        if (response.ok) {
            let data = await response.json()
            let body = await data
            return body
        }
    }

    catch(e) {
        await Promise.reject(e)
    }
}