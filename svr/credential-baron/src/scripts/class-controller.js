export { ClassController as default }
import { default as Controller } from './controller.js'
import { default as camelCase } from './camel-case.js'

function ClassController(el_class, options, callback) {
    let GROUP = Object.values(document.getElementsByClassName(el_class))
    let MEMBERS = {}
    GROUP.map(ELEMENT => {
        let id = camelCase(ELEMENT.dataset.role)
        MEMBERS[id] = MEMBERS[id] || {
            _directive(callback) {
                let el = Controller(ELEMENT.dataset.role, id => id, el_class)
                callback(el)
            }}



    })
    callback(MEMBERS)
    return MEMBERS
}