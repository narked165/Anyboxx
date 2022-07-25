export { InputComponentIncButton as default }
const InputComponentIncButton ={
    role: {
        set(value) {
            this.value=value
        },
        get() {
            return this.value
        }
    },
    component() {
        return (`
            <div data-role=${ this.role } data-component="input-component">
                <label data-role="l-${this.role }"></label>
                <input data-role="i-${ this.role }" />
                <button data-role="b-${ this.role }"></button>
                <output data-role="o-${ this.role }"
                
            </div>
        `)
    },
    build(options) {
        let { role } = options
        this.role = role
        return this.component()
    }
}
