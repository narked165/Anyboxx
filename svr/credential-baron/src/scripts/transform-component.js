import { default as getCurrentConfig } from './get-current-config.js'
import { default as injectComponentScript } from './inject-component-scripts.js'
import { default as transformTemplate } from './TransformTemlplate.js'
import { default as TransformEvent } from './transform-event.js'
export { TransformComponents as default }



async function TransformComponents(app0, app1) {
    let COMPS = document.querySelectorAll(`[data-component]`)
        for (let component of COMPS) {
            let role = component.dataset.role
            let handle = component.dataset["data-component"]

            let options = {
                method: 'get',
                headers: {
                    'Content-type': 'text/html',
                    'Cors': 'no-cors'
                },

            }

            try {

                let location = `components/${role}/index.html`

                let response = await fetch(location, options)
                if (response.ok) {
                    let data = response.text()
                    let body = await data
                    component.innerHTML = body
                    let script = await injectComponentScript(component.dataset.role)

                } else {
                    await Promise.reject(response.status, response.statusText)
                }
            } catch (e) {
                await Promise.reject(e)
            }


    }
    return document.querySelectorAll(`[data-component-controller]`)
}