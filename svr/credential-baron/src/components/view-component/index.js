export { ViewComponent as default }
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
    component() {
        return (`
            <div data-role=${ this.role } data-component="database-view-component">
                <div data-role="title-head"><h1 data-role="t-${ this.role }">${ this.title }</h1></div>
                <output data-role="o-${ this.role }">
                    <div data-role="data-table"><h2 data-role="data-title"></h2><ul data-role="data-list"></ul></div>
                </output>
                <div data-role="view-control"></div>
               
            </div>
        `)
    },
    build(role, options) {
        let { title } = options
        this.role = role
        this.title = title
        return this.component()
    }
}