const { Transform, pipeline } = require('stream')
const { TempTest } = require('./temp-test')

function createTemplatingStream() {
    let templatingStream = Transform({
        readableObjectMode: true,
        writableObjectMode:true,
        transform(data, encoding, callback) {
            let template = callback(data)

            this.push(template, encoding)
        }
    })

    return templatingStream
}

function TemplateTransform(user_options) {

    return function(data) {
        console.log(data)
       return data.transform(user_options)

    }
}

exports.testTemplate = function() {
    let { template } = TempTest()
    return template
}

exports.testTemplateStream = function(user_options) {
    let templateStream = createTemplatingStream()
    let templateTransform = TemplateTransform(user_options)
    return { templateStream, templateTransform }
}
