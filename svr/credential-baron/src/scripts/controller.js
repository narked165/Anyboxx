import { default as camelCase } from './camel-case.js'
export { Controller as default }
function Controller(role, callback, el_class='') {
    let ELEMENT = document.querySelector(`[data-role="${ role }"]`)

    if (ELEMENT === null) {
        console.warn(`Warning: Controller can not consume it's intended Element. The ROLE: ${ role } is likely incorrect.\n`)
        return
    }
    ELEMENT.id = camelCase(role)
    if (!el_class || el_class === '' || typeof el_class === 'undefined') {
        ELEMENT.className = role
    }
    else {
        ELEMENT.className= el_class
    }

    ELEMENT.$state = {}
    ELEMENT.events = {}
    ELEMENT.on = function(handle, handler) {
        ELEMENT.events[handle] = ELEMENT.events[handle] || []
        ELEMENT.events[handle].push(handler)
     }
    ELEMENT.off = function(handle, handler) {
        let index = ELEMENT.events[handle] && ELEMENT.events[handle].indexOf(handler)
        index > -1
            ? ELEMENT.events[handler].splice(index, 1)
            : console.warn(`[EVENT-HANDLER] has no such event: ${ handler }. Can not remove event.\n`)
    }
    ELEMENT.removeEventKey = function(handler) {
        ELEMENT.events[handler] && delete ELEMENT.events[handler]
    }
    ELEMENT.eventKeys = function() {
        return Object.keys(ELEMENT.events)
    }
    ELEMENT.hasEvent = function(handle, handler) {
        return Boolean(handle in Object.keys(ELEMENT.events)
            && ELEMENT.events[handle].includes(handler))
    }
    ELEMENT.emit = function(handle, data) {
        ELEMENT.events[handle] && ELEMENT.events[handle].forEach(h=> h.call(this, data))
    }

    callback(ELEMENT)
    return ELEMENT
}