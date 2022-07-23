import { default as TransformComponents } from './transform-component.js'
export { TransformEvent as default }

async function TransformEvent( { app0, app1, username } ) {
    let removeScript = `${app0.dataset.role}-script`
    if (typeof username !== 'undefined') {
        try {
            app0.dataset.role = app1
            app0.dataset.component = app1
            let data = {username}
            await TransformComponents(app0, app1, {username})
            let r_script = document.querySelector(`[data-role="${removeScript}"]`)
            r_script.parentElement.removeChild(r_script)
        } catch (e) {
            await Promise.reject(e)
        }
    }
    else {
        app0.dataset.role = app1
        app0.dataset.component = app1
        await TransformComponents(app0, app1)
        let r_script = document.querySelector(`[data-role="${removeScript}"]`)
        r_script.parentElement.removeChild(r_script)

    }
}