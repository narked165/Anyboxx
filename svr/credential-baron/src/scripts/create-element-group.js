export { ElementGroup as default }
import { default as camelCase } from '../scripts/camel-case.js'

function ElementGroup(callback) {
    let _group = {}
    let GROUPS = document.querySelectorAll(`[data-element-group]`)
    for(let e of GROUPS) {
        let name = camelCase(e.dataset.elementGroup)
        _group[name] = _group[name] || []
        _group[name].push(e)
    }
    console.log(_group)
    callback(_group)
    
    return _group
}