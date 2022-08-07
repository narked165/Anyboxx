export { TableView as default }
import { default as UtilButton } from '../util-button/index.js'

const TableView = {
    head0Key: {
        set(value) {
            this.value=value
        },
        get value() {
            return this.value
        }
    },
    head1Key: {
        set(value) {
            this.value=value
        },
        get value() {
            return this.value
        }
    },
    head2Key: {
        set(value) {
            this.value=value
        },
        get value() {
            return this.value
        }
    },
    head3Key: {
        set(value) {
            this.value=value
        },
        get value() {
            return this.value
        }
    },
    head4Key: {
        set(value) {
            this.value=value
        },
        get value() {
            return this.value
        }
    },
    head5Key: {
        set(value) {
            this.value=value
        },
        get value() {
            return this.value
        }
    },
    head6Key: {
        set(value) {
            this.value=value
        },
        get value() {
            return this.value
        }
    },
    head7Key: {
        set(value) {
            this.value=value
        },
        get value() {
            return this.value
        }
    },
    head8Key: {
        set(value) {
            this.value=value
        },
        get value() {
            return this.value
        }
    },
    detail0: {
        set(value) {
            this.value=value
        },
        get value() {
            return this.value
        }
    },
    detail1: {
        set(value) {
            this.value=value
        },
        get value() {
            return this.value
        }
    },
    detail2: {
        set(value) {
            this.value=value
        },
        get value() {
            return this.value
        }
    },
    detail3: {
        set(value) {
            this.value=value
        },
        get value() {
            return this.value
        }
    },
    detail4: {
        set(value) {
            this.value=value
        },
        get value() {
            return this.value
        }
    },
    detail5: {
        set(value) {
            this.value=value
        },
        get value() {
            return this.value
        }
    },
    detail6: {
        set(value) {
            this.value=value
        },
        get value() {
            return this.value
        }
    },
    detail7: {
        set(value) {
            this.value=value
        },
        get value() {
            return this.value
        }
    },

    template() {

        return (`
            <div data-role="table-main">
            <script src="./index.js" type="module"></script>
            <link rel="stylesheet" type="text/css" href="/components/table-view/index.css" />
                <div data-role="table-header">
                    <div data-role="head-0" data-element-group="head-keys">
                        <a data-role="a-head-0" data-element-group="head-links">
                            ${ this.head0Key }
                        </a>
                    </div>
                    <div data-role="head-1" data-element-group="head-keys">
                        <a data-role="a-head-1" data-element-group="head-keys">
                            ${ this.head1Key }
                        </a>
                    </div>
                    <div data-role="head-2" data-element-group="head-keys">
                        <a data-role="a-head-2" data-element-group="head-links">
                            ${ this.head2Key }
                        </a>
                    </div>
                    <div data-role="head-3" data-element-group="head-keys">
                        <a data-role="a-head-3" data-element-group="head-links">
                            ${ this.head3Key }
                        </a>
                    </div>
                    <div data-role="head-4" data-element-group="head-keys">
                        <a data-role="a-head-4" data-element-group="head-keys">
                            ${ this.head4Key }
                        </a>
                    </div>
                    <div data-role="head-5" data-element-group="head-keys">
                        <a data-role="a-head-5" data-element-group="head-links">
                            ${ this.head5Key }
                        </a>
                    </div>
                    <div data-role="head-6" data-element-group="head-keys">
                        <a data-role="a-head-6" data-element-group="head-links">
                            ${ this.head6Key }
                        </a>
                    </div>
                    <div data-role="head-7" data-element-group="head-keys">
                        <a data-role="a-head-7" data-element-group="head-links">
                            ${ this.head7Key }
                        </a>
                    </div>
                    <div data-role="head-8" data-element-group="head-keys">
                        <a data-role="a-head-8" data-element-group="head-links">
                            ${ this.head8Key }
                        </a>
                    </div>
                     <div data-role="head-9" data-element-group="head-keys">
                        <a data-role="a-head-9" data-element-group="head-links">
                            ${ this.head9Key }
                        </a>
                    </div>
                </div>
                    <div data-role="callout-0"></div>
                    <div data-role="callout-1"></div>
                    <div data-role="callout-2"></div>
                    <div data-role="callout-3"></div>
                    <div data-role="callout-4"></div>
                 
                    <div data-role="details-0">${ this.detail0 }</div>
                     <div data-role="details-1">${ this.detail1 }</div>
                     <div data-role="details-2">${ this.detail2 }</div>
                     <div data-role="details-3">${ this.detail3 }</div>
                     <div data-role="details-4">${ this.detail4 }</div>
                     <div data-role="details-5">${ this.detail5 }</div>
                     <div data-role="details-6">${ this.detail6 }</div>
                     <div data-role="details-7">${ this.detail7 }</div>
                     <div data-role="details-8">${ this.detail8 }</div>
                      <div data-role="details-9">${ this.detail9 }</div>
                     
                  
                  
                    ${ UtilButton.build({
       
                        role: 'back-button',
                        label: 'Back',
                        icon: 'square-arrow-left',
                        size: 2,
                        p_color: 'yellow',
                        s_color: 'black',
                        b_class: 'back-button'
                  
                    }
                )}
            </div>
        `)
    },

    build(tables) {
        tables.map((tab, i) => {

            this[`head${i}Key`] = tab.name
            this[`detail${i}`] = `<ul>
              <li><span class="key">Type:</span><span class="value">${ tab.type }</span></li>
              <li><span class="key">Name:</span><span class="value"> ${ tab.name }</span></li>
              <li><span class="key">Is-Key:</span><span class="value"> ${ tab.isKey }</span></li>
              <li><span class="key">Is-Pointer:</span><span class="value"> ${ tab.isPointer}</span></li>
              <li><span class="key">Auto-Increment:</span><span class="value"> ${ tab['auto-increment'] }</span></li>
              <li><span class="key">Options-Table:</span><span class="value"> ${ tab['option-table'] }</span></li>
              <li><span class="key">Contains-Secret:</span><span class="value"> ${ tab['contains-secret'] }</span></li>
          </ul>`
        })
        return {template: this.template}
    }
}