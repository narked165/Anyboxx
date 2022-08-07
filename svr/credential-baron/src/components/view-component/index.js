export { ViewComponent as default }
import { default as ButtonGrid } from '../db-button-grid/index.js'

const ViewComponent ={
    role: {
        set(value) {
            this.value=value
        },
        get() {
            return this.value
        }
    },
    title: {
        set(value) {
            this.value=value
        },
        get() {
            return this.value
        }
    },
    gridTitle: {
        set(value) {
            this.value=value
        },
        get() {
            return this.value
        }
    },
    gridRole: {
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
    component() {
        return (`
            <div data-role=${ this.role } data-component="database-view-component">
                 <div data-role="app-head">
                    <h1 data-role="t-${ this.role }">${ this.title }</h1>
                </div>
                <div data-role="o-${ this.role }">
                         
                    <div data-role="data-callout"></div>
                    <div data-role="data-table"><h2 data-role="data-title"></h2><ul data-role="data-list"></ul></div>
                   
                </div>
               
            </div>
        `)
    },
    build(role, options) {
        let { title, grid } = options
        let { gridRole, gridTitle, buttons } = grid
        this.title = title
        this.role = role
        this.gridTitle = gridTitle
        this.gridRole = gridRole
        this.buttons = buttons

        return this.component()
    }
}