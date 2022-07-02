export { verifyCredentials as default }


async function verifyCredentials(credentials) {
    console.log('verifying credentials...')
    let location = 'http://127.0.0.1:9044/b/verifyCredentials'
    let options = {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(credentials)
    }
    try {
        let response = await fetch(location, options)
        if (response.ok) {
            let data = await response.json()
            return await data
        }
        else {
            await Promise.reject(response.statusText)
        }
    }

    catch(e) {
        await Promise.reject(e)
    }
}