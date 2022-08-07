export { buildComponent as default }
import { default as Controller } from './controller.js'

function buildComponent(role, build, options={}, component, callback) {
    let COMP = document.querySelector(`[data-build-element="${ role }-component"]`)
    let BUILD = component.build(role, options)

    COMP.outerHTML=BUILD
    return  Controller(role, callback)

}
