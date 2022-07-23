import { default as injectComponentScript } from './inject-component-scripts.js'
export { serverUtilities as default }

async function serverUtilities({ username }) {
    let location = '/server-utilities'
    let options = {
        method: 'get',
        headers: {
            'Content-Type': 'text/html',
            'Access-Control-Allow-Origin': '*'
        }
    }

    try {
        let response = await fetch(location, options)
        if(response.ok) {
            let data = await response.text()
            await injectComponentScript('app-server-utilities')
            return await data
        }
    }

    catch(e) {
        await Promise.reject(e)
    }
}