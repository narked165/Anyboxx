export { logTransaction as default }


async function logTransaction({ logAgentOutput }) {
    let location = '/retrieve-logs'
    let options = {
        headers: {
            'Content-type': 'text/html',
            'Access-Control-Allow-Origin': '*'
        }
    }
        try {
            let response = await fetch(location, options)
            if (response.ok) {
                let data = await response.text()
                logAgentOutput.innerHTML+=await data
                }

        }

        catch(e) {
            await Promise.reject(e)
        }

}