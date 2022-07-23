export { updatePassword as default }

async function updatePassword(POST_DATA) {

    let api = '/update-password'
    let options = {
        method: 'put',
        headers: {
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(POST_DATA)
    }

    try {
        let response = fetch(api, options)
        if (response.ok) {
            let body = await response.json()
            let result = await body
            if(result.err !==null) {
                await Promise.reject(e)
            }
            return JSON.parse(result)
        }
    }
    catch(e) {
        await Promise.reject(e)
    }
}