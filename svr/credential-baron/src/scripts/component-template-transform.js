import { default as injectComponentScripts } from './inject-component-scripts.js'
import { default as TransformComponents } from './transform-component.js'
export { componentTemplateTransform as default }

async function componentTemplateTransform({ appHost, app, username }) {

    let location = app,
        options = {
            method: 'post',
            headers: {
                'Content-Type': 'text/html',
                'Access-control-Allow-Origin': '*'
            },
            body: JSON.stringify( { app, username })
    }

        try {


            let response = await fetch(location, options)
            if (response.ok) {
                let data = await response.text() 
                let body = await data
                appHost.innerHTML=body
                let removeScript = `${appHost.dataset.role}-script`
                appHost.dataset.role = app
                appHost.dataset.component = app
                appHost.setAttribute('id', app)
                appHost.setAttribute('class', appHost.dataset.role)
                await injectComponentScripts(app)
                let r_script = document.querySelector(`[data-role="${removeScript}"]`)
                r_script.parentElement.removeChild(r_script)


            }
        }
catch(e) {
    await Promise.reject(e)
    }
}



