export { queryUser as default }

async function queryUser(value) {
    let location = 'http://192.168.0.12:9090/query-user'
    let options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Origin': window.location.origin,
            'Cors': 'no-cors',
            'Access-Control-Allow-Origin': '*'



        },
        body: JSON.stringify({username: value})
    }

    try {
        let response = await fetch(location, options)
        if (response.ok) {
            let data = await response.json()
            let body = await data
            return body.value

        }
    }
    catch(e){
        await Promise.reject(e)
    }
}