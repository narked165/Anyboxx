const {parse: parsePath} = require('path')
const exconvert = require('exconvert')

exports.ResponseHeaders = function(request, response) {
    let { ext } = parsePath(request.url),
        client = new URL(`http://${ request.socket.remoteAddress }/${ request.socket.remotePort}`),
        status, contentType, origin

    if(ext && routes.query(request.url)) {
        status = 200
        contentType = exconvert('ext')
        origin = client.origin
    }

    else if (!ext || !routes.query(request.url)) {
        status = 404
        contentType = null
        origin = "*"
    }

    else if(!ext && routes.query(request.url)) {
        status = 200
        contentType = exconvert(routes.queryExtension(request.url))
        origin = client.origin
    }
    else {
        status = 500
        contentType = null
        origin: '*'
    }
    return () => {
        response.writeHead(status, {
            'Content-Type': contentType,
            'Access-Control-Allow-Origin': origin,
            'Connection': 'keep-alive',
            'Transfer-Encoding': 'chunked'
        })
    }

}