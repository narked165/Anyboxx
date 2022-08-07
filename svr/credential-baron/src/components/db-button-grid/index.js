export { ButtonGrid as default }
import { default as UtilButton } from '../util-button/index.js'


const ButtonGrid = {
    role: {
        set value(value) {
            this.value = value
        },
        get value() {
            return this.value
        }
    },
    gridTitle: {
        set value(value) {
            this.value = value
        },
        get value() {
            return this.value
        }
    },
    buttons: {
        set value(value) {
            this.value = value
        },
        get value() {
            return this.value
        }
    },
    renderButtons() {
        let _btns = []
        for(let b in this.buttons) {
            _btns.push(UtilButton.build(this.buttons[b]))
        }
        return _btns.join('')
    },
    template() {
        return (`<div data-role="${ this.role }"><h2 data-role="grid-title">${ this.gridTitle }</h2>${ this.renderButtons() }</div>`)
    },
    build(role, gridTitle, buttons) {

        this.role = role
        this.gridTitle = gridTitle
        this.buttons = buttons
        return this.template()
    }
}