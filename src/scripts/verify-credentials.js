export { verifyCredentials as default}

async function verifyCredentials(POST_DATA, server_url) {
    let options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Cors': 'no-cors'
        },
        body: JSON.stringify(POST_DATA)
    }
    let location = `${ POST_DATA.POST_SERVER_URL }/a/verifyCredentials`
    try {
        let response = await fetch(location, options)

            let data = await response.json()
            console.log(data)
    }

    catch(e) {
        console.error(e)
    }
}