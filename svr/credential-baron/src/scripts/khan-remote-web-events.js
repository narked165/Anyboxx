export { khanRemoteEvents as default }

async function khanRemoteEvents(eventString) {
    let location = '/khan-web-event'
    let options = {
        method: 'post',
        headers: {
            'Content-Type': 'text/html',
            'Acccess-Control-Allow-Origin': '*'
        },

        body: JSON.stringify({ POST_EVENT_STRING: eventString })
    }

    try {
        let response = await fetch(location, options)
        if (response.ok) {
            let data = await response.text()
            return await data
        }
    }
    catch(e) {
        await Promise.reject(e)
    }
}