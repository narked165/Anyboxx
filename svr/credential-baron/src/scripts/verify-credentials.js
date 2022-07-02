import { default as getCurrentInterfaces } from '../scripts/get-current-interfaces.js'
export { verifyCredentials as default}

async function verifyCredentials({SERVER_URL, POST_USERNAME, POST_PASSWORD }) {
    let INTERFACES = await getCurrentInterfaces()
    console.log(INTERFACES)
   // let clientUrl = new URL(`http://${ INTERFACES.ipv4Interface.address }:${ INTERFACES.ipv4Interface.port }`)
    console.log(`Verifying credentials`)
    let url = 'http://192.168.0.10:9090'
    let app = INTERFACES.app
    let data = { username: POST_USERNAME, password: POST_PASSWORD,  url, app }
    let options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': url
        },
        body: JSON.stringify(data)
    }
    let location = `${SERVER_URL}verify-user`
    try {
        let response = await fetch(location, options)

            let data = await response.json()
            console.log(data)
    }

    catch(e) {
        console.error(e)
    }
}

function getLocation() {
    return window.location.href
}