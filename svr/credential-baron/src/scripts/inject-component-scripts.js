export { injectComponentScript as default }

async function injectComponentScript(componentHandle) {
    let options = {
        method: 'get',
        headers: {
            'Content-Type': 'module',
            'Cors': 'np-cors'
        }
    }
    let location = `/components/${ componentHandle }/index.js`
    try {
        let response = await fetch(location, options)
        if(response.ok) {
            let script = response.text()
            let scriptTag = document.createElement('script')
            scriptTag.innerHTML = await script
            scriptTag.setAttribute('type', 'module')
            document.body.append(scriptTag)
        }
        else {
            await Promise.reject({ status: response.status, statusText: response.statusText})
        }
    }
    catch(e) {
        console.error(e)
    }
}