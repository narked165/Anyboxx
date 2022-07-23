const serverUtils = require('./server-utils.json')

function createUtilElements() {
    let utility, SERVER_UTIL = {}


    for (let u in serverUtils) {

        utility = serverUtils[u]
        SERVER_UTIL[u] = SERVER_UTIL[u] || {}
        SERVER_UTIL[u].element = `<div data-role="c-${ utility.app_name }">
                         <a data-role=${ utility.app_name }><i id="ui-${ u }"data-element-group="utility-icons" class="${ utility.token }"></i><h3>${ utility.app_name }</h3></a>
                   </div>`
    }
    return SERVER_UTIL
}


function createUtilApi() {
    let api = {}

}


function createUtilApp() {
    let SERVER_UTIL = createUtilElements(), elements = []
    for (let u in SERVER_UTIL) {
        elements.push(SERVER_UTIL[u].element)
    }

    return Buffer.from(`
        <div data-role="util-app" class="util-app">
            <link rel="stylesheet" type="text/css" href="/components/app-server-utilities/index.css" />
            ${ elements.join('') }
        </div>
    `)
}



exports.serverUtilApp = () => createUtilApp()


exports.serverUtilApi = () => {
    let api_src = {}
    for(let u in serverUtils) {
        api_src[u] = api_src[u] || serverUtils[u].app_path
    }

    return api_src
}
