const { Transform } = require('stream')

exports.ResponseStream = function() {
    let responseStream = Transform({
        readableObjectMode: true,
        writableObjectMode: false,
        transform(chunk, encoding, callback) {
            callback()
            this.push(chunk.toString(encoding))
            this.push(null)
        }
    })
    responseStream.on('error', console.warn)
    return responseStream
}
