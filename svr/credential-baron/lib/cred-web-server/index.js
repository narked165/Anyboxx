const { createServer } = require('http')
const { CredentialBaron } = require('../../index.js')
const { Transform, pipeline } = require('stream')
const { open, readFile } = require('fs/promises')
const { join: joinPath, parse: parsePath } = require('path')
const { StaticProxy } = require('../static-proxy')
const { Router } = require('../cred-router')
const { ResponseStream } = require('../response-stream')
const { sourceIndex } = require('../create-soure-file-index')
const { documentProxy } = require('../response-headers')
const exconvert = require('exconvert')
const {getOSInfo} = require('../os-info')






const credentialBaron = CredentialBaron()
const EN0_INTERFACE = getOSInfo()

const creds = createServer()
const routes = Router('/')

async function startServices() {

    let userList = await credentialBaron.startServer()

    let files = await routes.init()
    return { userList, files }
}

routes.add('/error404', ({ responseStream, sendHeaders, request }) => {
    let errorResponse = `
        <div style=" margin:0 auto; display: block; text-align: center; font-family: 'Roboto', sans-serif">
        <h1>HTTP/1.1  ERROR 404</h1>
        <h2>NOT FOUND</h2>
        <h3>THE URL ${ request } COULD NOT BE LOCATED\n</h3>
        <hr />
        <h4>${ new Date().toLocaleTimeString() }</h4>
    </div>`
    sendHeaders('.html')
    responseStream._transform(errorResponse, 'utf-8', ()=>{})
})

//  routes for the Router
routes.add('/show-routes', ({ responseStream, sendHeaders }) => {
   routes.addExtension('/show-routes','.json')
    sendHeaders('.json')
    let r = routes.show()
    responseStream._transform(r, 'utf-8', ()=>{})
})
routes.add('/interfaces', async ({ responseStream, sendHeaders, data }) => {
    routes.addExtension('/interfaces', '.json')
    sendHeaders('.json')
    responseStream._transform(JSON.stringify(EN0_INTERFACE), 'utf-8', () => {})
})

routes.add('/purge-db', async ({ responseStream, sendHeaders }) => {
    routes.addExtension('/purge-db', '.json')
    sendHeaders('.json')
    await credentialBaron.purgeDB(responseStream)
})

routes.add('/show-users', ({ responseStream, sendHeaders }) => {
    routes.addExtension('/show-users', '.json')
    sendHeaders('.json')
    credentialBaron.showUsers(responseStream)
})

routes.add('/', ({ responseStream, sendHeaders }) => {
    routes.addExtension('/', '.html')
    sendHeaders('.html')
    routes.dispatch('/index.html', { responseStream, sendHeaders } )
})

routes.add('/verify-user', ({ responseStream, sendHeaders, body }) => {
    routes.addExtension('/verify-user', '.json')
    sendHeaders('.json')
    let options =  body
    let response = credentialBaron.authenticate(responseStream, options)

})

routes.add('/add-user', async ({ responseStream, sendHeaders, body }) => {
    routes.addExtension('/add-user', '.json')
    sendHeaders('.json')
    let options = {username, password, url, app} = await body
    let userCreated = await credentialBaron.createUser(options, responseStream)
})

routes.add('/add-test-users', async ({ responseStream, sendHeaders }) => {
    routes.addExtension('/add-test-user', '.json')
    sendHeaders('.json')
    await credentialBaron.addTestUsers(responseStream)
})

routes.add('/delete-user', async ({responseStream, sendHeaders, body}) => {
    routes.addExtension('/delete-user', '.json')
    sendHeaders('.json')
    let options = await body
    await credentialBaron.removeUser(options, sendHeaders, responseStream)
})

routes.add('/query-user', async ({ responseStream, sendHeaders, body }) => {
    routes.addExtension('/query-user', '.json')
    sendHeaders('.json')
    let { username } = await body
    credentialBaron.queryUser(username, responseStream)
})

// Server Events

creds.on('GET', async ({ request, response, responseStream }) => {
   let sendHeaders = ResponseHeaders(request, response), data

    if (routes.query(request.url)) {
        data = { responseStream, sendHeaders }
        routes.dispatch(request.url, data)
    }
    else {
        data = { responseStream, sendHeaders, request: request.url }
        routes.dispatch('/error404', data)
    }

})

creds.on('POST', async ( { request, response, responseStream } ) => {


    try {
        let buffer = []
        for await (const chunk of request) {
            buffer.push(chunk)
        }

        let postData = Buffer.concat(buffer).toString(),
            body = JSON.parse(await postData)
        console.log('Body:' + require('util').inspect(body, 1, 5, 1))
        let sendHeaders = ResponseHeaders(request, response)
        let data = {responseStream, sendHeaders, body}


        if (!body) {
            responseStream._transform(Buffer.from(`HTTP/1.1  ERROR  403\nFORBIDDEN\nThe url requested: ${request.url}, can not accept an empty request.\n `), 'utf-8', () => {})
        }
        else {
            routes.dispatch(request.url, data)
        }

    }
catch(e) {

            await Promise.reject(e)
       }


})

creds.on('PUT', async ( { request, response, responseStream }) => {
    console.log('POST ' + request.url)
    let sendHeader = ResponseHeaders(request, response)
    try {
        let buffer = []
        for await (const chunk of request) {
            buffer.push(chunk)
        }

        let postData = Buffer.concat(buffer).toString(),
            body = JSON.parse(postData)

        let data = { responseStream, sendHeaders, body }
        await routes.dispatch(request.url,  data)
    }
    catch(e) {
        responseStream.end(Buffer.from(`HTTP/1.1  ERROR  403\nFORBIDDEN\nThe url requested: ${ request.url }, can not accept an empty request.\n  `))

    }
})

creds.on('DELETE', async ({ request, response, responseStream }) => {
    let sendHeader = ResponseHeaders(request, response)

    try {
        let buffer = []
        for await (const chunk of request) {
            buffer.push(chunk)
        }

        let postData = Buffer.concat(buffer).toString(),
            body = JSON.parse(postData)

        let data = { responseStream, sendHeaders, body }
        await routes.dispatch(request.url,  data)
    }
    catch(e) {
        responseStream.end(Buffer.from(`HTTP/1.1  ERROR  403\nFORBIDDEN\nThe url requested: ${ request.url }, can not accept an empty request.\n  `))

    }
})

creds.on('error', (e) => console.error(e))

creds.on('listening', () => console.info(`creds listening at http://${ EN0_INTERFACE.ipv4Interface.address }:9090\n`))

creds.on('request', (request, response) => {
    let responseStream = ResponseStream()
    let data = {request, response, responseStream}
    let METHOD = request.method.toUpperCase()
    console.log(`INCOMMING REQUEST FOR: ${request.method.toUpperCase()} ${ request.url}`)
    if (request.method === "GET" || request.method === "get") {
        let isGetForbiddenUrl = credentialBaron.checkGetForbiddenUrl(request)

        if (METHOD === 'GET' && isGetForbiddenUrl) {
            response.end(`HTTP/1.1  ERROR  405\nMETHOD NOT ALLIOWED\nThe url ${request.url} may not be accessed with the GET method.`)
        }
    }
     else if (METHOD !== 'GET' && !credentialBaron.checkUrlMethodIncomming(request)) {
            console.log(credentialBaron.checkUrlMethodIncomming(request))
            response.end(`HTTP/1.1  ERROR  405\nMETHOD NOT ALLOWED\nmethod: ${request.method} is not allowed for the url: ${request.url}\n${new Date().toLocaleTimeString()}`)
    }

            pipeline(
                responseStream,
                response,
                () => {
                }
            )

            creds.emit(METHOD, data)
})


exports.credServer  = async function() {
    let { userList, files } = await startServices()
    console.log({ userList, files })
    return { creds, EN0_INTERFACE }
}

function ResponseHeaders(request, response) {

        let client = new URL(`http://${ request.socket.remoteAddress }/${ request.socket.remotePort}`)


    return (ext, status) => {
        let contentType = exconvert(ext) || exconvert(routes.queryExtension(request.url)) || exconvert('text/plain')
        status = status || (routes.query(request.url)) ? '200' : '404'
        response.writeHead(status, {
            'Content-Type': contentType,
            'Access-Control-Allow-Origin': client.origin,
            'Connection': 'keep-alive',
            'Transfer-Encoding': 'chunked'
        })
    }

}

