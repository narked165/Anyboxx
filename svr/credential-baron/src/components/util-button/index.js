export { UtilButton as default }

const UtilButton = {
    role: {
        set value(value) {
            this.value=value
        },
        get value() {
            return this.value
        }
    },
    label: {
        set value(value) {
            this.value = value
        },
        get value() {
            return this.value
        }
    },
    icon: {
        set value(value) {
            this.value = value
        },
        get value() {
            return this.value
        }
    },
    size: {
        set value(value) {
            this.value = value
        },
        get value() {
            return this.value
        }
    },
    p_color: {
        set value(value) {
            this.value = value
        },
        get value() {
            return this.value
        }
    },

    s_color: {
        set value(value) {
            this.value = value
        },
        get value() {
            return this.value
        }
    },
    b_class: {
        set value(value) {
            this.value = value
        },
        get value() {
            return this.value
        }
    },
    template() {
        return (`
            <a data-role="${ this.role }" class="${ this.b_class } "type="button">
                <i class="fa-duotone fa-${ this.icon } fa-${ this.size }x" style="-fa-primary-color=${ this.p_color } fa-secondary-color=${ this.s_color }"></i>
                <label>${ this.label }</label>
            </a>
            <script src="index.js" type="module"></script>
        `)
    },

    build(options) {
        let { role, label, icon, size, p_color, s_color, b_class } = options
        this.role = role
        this.label = label
        this.icon = icon
        this.p_color = p_color
        this.s_color = s_color
        this.size = size
        this.b_class = b_class
        return this.template()
    }
}