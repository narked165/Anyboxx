const { StaticProxy } = require('../static-proxy')
const { ResponseHeaders } = require('../response-headers')
const { parse: parsePath, sep } = require('path')

exports.Router = function(root) {

    let _router =  {
        set root(value) {
            this.$ROOT = value
        },
        get root() {
          return this.$ROOT
        },
        set staticProxy(value) {
            this.$STATIC_PROXY = value
        },
        get staticProxy() {
            return this.$STATIC_PROXY
        },
        routes: {},
        extensions: {},
        add(route, handler) {
            this.routes[route] = this.routes[route] || []
            this.routes[route].push(handler)
            console.log(`New Route added: ${ route }`)
        },


        dispatch(route, data) {
                console.log(`Routes is Dispatching... ${route}`)
                this.routes[route] && this.routes[route]
                    .forEach(r => r.call(this, data))
        },
        remove(route) {
            this.routes[route] && delete this.routes[route]
        },
        once(route, handler) {
            this.add(route, handler)
            this.add(route, () => this.remove(route))
        },
        show() {
            let r = Object.keys(this.routes)
            console.log(r)
            return r
        },

        query(route) {
            return route in this.routes
        },


        addExtension(handle, ext) {
            this.extensions[handle] = this.extensions[handle] || ext
        },
        queryExtension(handle) {
            return handle in this.extensions
        },

        selectExtension(handle) {
            return this.extensions[handle]
           },

        _hasHashData(requestUrl) {
          return requestUrl.includes(`${ sep }#`)
        },
        async init() {
            try {
                let fileIndex = await this.staticProxy.init()
                for await (let v of Object.values(fileIndex)) {
                    let keyArray = v.split('/src').filter(k => k)
                    let key = keyArray[1].trim()

                    this.add(key, ({ responseStream, sendHeaders }) => {
                        let { ext } = parsePath(v)
                        this.addExtension(ext)
                        let encoding
                        if (key === `/favicon.ico`) {
                            encoding = null
                        } else {
                            encoding = 'utf-8'
                        }
                        if (this.staticProxy.query(key)) {
                            sendHeaders(ext)

                            let document = this.staticProxy.select(key)
                            responseStream._transform(document, encoding, (e) => e ? console.error(e) : !e)
                        }
                    })
                }
                    return fileIndex
            }
            catch(e){
                    await Promise.reject(e)
                }
            }

        }


    _router.root = root

    _router.staticProxy = StaticProxy(_router.root)
    return _router

}

