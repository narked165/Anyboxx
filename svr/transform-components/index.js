import { default as getCurrentConfig } from './get-current-config.js'
import { default as injectComponentScript } from './inject-component-scripts.js'
export { TransformComponents as default }

async function TransformComponents() {
    let COMPS = document.querySelectorAll(`[data-component]`)
    for(let component of COMPS) {
        let role = component.dataset.role
        let handle = component.dataset["data-component"]
        console.log('pp'+role)
        let options = {
            method: 'post',
            headers: {
                'Content-type': 'text/html',
                'Cors': 'no-cors'
            },
            body: JSON.stringify({ component_handle: role })
        }
        try {
           // let config = await getCurrentConfig()

            let location = 'http://localhost:9090/transform-component'
            let response = await fetch(location, options)
            if (response.ok) {
                let data = response.text()
                let body = await data
                component.outerHTML=body
                let script = await injectComponentScript(component.dataset.role)

            }
            else {
                await Promise.reject(response.status, response.statusText)
            }
        }
        catch(e) {
            console.log(e)
        }

    }
}