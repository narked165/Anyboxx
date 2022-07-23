export { updateInfo as default }

async function updateInfo(POST_DATA) {
    let location = '/update-info'
    let options = {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(POST_DATA)
    }
    try {
        let response = await fetch(location, options)
        if (response.ok) {
            let body = await response.json()
            return await body
        }
    }
    catch(e) {
        await Promise.reject(e)
    }
}