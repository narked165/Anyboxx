export { getCurrentConfig as default }

async function getCurrentConfig() {
    let location = './cfg/index.json'
    let options = {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Cors': 'no-cors'
        }
    }
    try {
        let response = await fetch(location, options)
        if (response.ok) {
            let data = response.json()
            return await data
        }
        else {
            await Promise.reject({ status: response.status, statusText: response.statusText })
        }
    }
    catch(e) {
        console.error(e.status, e.statusText)
    }
}
