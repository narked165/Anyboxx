const { createWriteStream, createReadStream } = require('fs')
const { join: joinPath } = require('path')


exports.writeConfig = function(config) {
    let location = joinPath(__dirname, '..', '..', 'src', 'cfg', 'index.json')
    let options = {encoding: 'utf-8', flags: 'w', mode: 0o666}
    let configWriter = createWriteStream(location, options)
    configWriter.write(JSON.stringify(config))
    return function() {
        let options = {encoding: 'utf-8', flags: 'r', mode: 0o666}
        return createReadStream(location, options)
    }
}