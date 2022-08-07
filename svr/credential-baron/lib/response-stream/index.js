const { Transform } = require('stream')

exports.ResponseStream = function() {
    let responseStream = Transform({
        readableObjectMode: true,
        writableObjectMode: false,
        allowHalfOpen: true,
        transform(chunk, encoding='utf-8', callback) {
            callback()
            this.push(chunk, encoding)
            this.push(null)

        },


    })
    responseStream.on('error', () => {})
    return responseStream
}

