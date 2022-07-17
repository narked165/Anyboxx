exports.TempTest = function() {
    let template = {
            tempTitle: {
                set(value) {
                    this.value = value
                },
                get() {
                    return this.value
                }
            },
            username: {
                set(value) {
                    this.value = value
                },
                get() {
                    return this.value
                }
            },
            password: {
                set(value) {
                    this.value = value
                },

                get() {
                    return this.value
                }
            },
            email: {
                set(value) {
                    this.value = value
                },

                get() {
                    return this.value
                }
            },
            firstName: {
                set(value) {
                    this.value = value
                },

                get() {
                    return this.value
                }
            },
            lastName: {
                set(value) {
                    this.value = value
                },

                get() {
                    return this.value
                }
            },
            template() {
                return Buffer.from(`
                <link rel="stylesheet" href="components/app-welcome/index.css" type="text/css" />
                <script src="components/app-welcome/index.js" type="module"></script>
               
                <form data-role="app-test-template" app-component="app-test-template">
                    <h1 data-role="t-app-temp">${this.tempTitle}</h1>
                    <h2 data-role="s-app-temp">Welcome ${this.firstName}</h2>
                    <div data-role="c-info-uname">
                        <label data-role="l-info-uname"></label>
                        <input data-role="i-info-uname" value="${this.username}" />   
                    </div>
                    <div data-role="c-info-fname">
                        <label data-role="l-info-fname"></label>
                        <input data-role="i-info-fname" value="${this.firstNamw}" />   
                    </div>
                    <div data-role="c-info-lname">
                        <label data-role="l-info-lname"></label>
                        <input data-role="i-info-lname" value="${this.lastName}" />   
                    </div>
                    <div data-role="c-info-password">
                        <label data-role="l-info-password"></label>
                        <input data-role="i-info-password" />   
                    </div>
                    <div data-role="c-info-email">
                        <label data-role="l-info-email"></label>
                        <input data-role="i-info-email" value="${this.email}" />   
                    </div>
                    <div data-role="c-info-update">
                        <output data-role="o-info-update"></output>
                        <button data-role="b-info-update"></button>   
                    </div>
                    
                    <div data-role="util-panel">
                        
                        <form data-role="util-pass">
            
                            <h1 data-role="t-pass"></h1>
                        
                            <h2 data-role="s-pass"></h2>
                        
                            <div data-role="c-pass">
                                <label data-role="l-pass"></label>
                                <input data-role="i-pass" />
                                <output data-role="o-pass"></output>
                            </div>
                            
                            <div data-role="c-pass-new">
                                <label data-role="l-pass-new-0"></label>
                                <input data-role="i-pass-new-0" />
                                <output data-role="o-pass-new-0"></output>
                                
                                <label data-role="l-pass-new-1"></label>
                                <input data-role="i-pass-new-1" />
                                <output data-role="o-pass-new-1"></output>
                            </div>
                            
                            <div data-role="c-pass-control">
                                <output data-role="o-pass-io"></output>
                                <button data-role="b-pass-submit"></button>
                            </div>
                        </form>
                    </div>  
                              
                </form>
                `)

            },
            transform({tempTitle, username, password, email, firstName, lastName}) {
                this.tempTitle = tempTitle
                this.username = username
                this.password = password
                this.email = email
                this.firstName = firstName
                this.lastName = lastName
                console.log(this)
                return this.template().toString()
            }
    }

    return { template }
}

















