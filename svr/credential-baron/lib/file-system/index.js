const { readdir, open} = require('fs/promises')
const { join: joinPath, parse: parsePath } = require('path')
const { createWriteStream, createReadStream } = require('fs')
const {Transform} = require('stream')


exports.sendFile = async function (url, responseStream) {
    let location = getFileSourceLocation(url)
    let options = ['r', 0o666]
    try {
        let fd = await open(location, ...options)
        let data = await fd.readFile('utf-8')
        fd.close()
        let dataBuffer = Buffer.from(data)
        responseStream._transform(dataBuffer, 'utf-8', (e) => e ? console.error(e) : !e)
    }
    catch(e) {
        Promise.reject(e)
    }
}


exports.read = async function (location) {
    let options = ['r', 0o666]
    try {
        let fd = await open(location, ...options)
        let data = await fd.readFile('utf-8')
        fd.close()
        return data
    }
    catch(e) {
        Promise.reject(e)
    }
}


exports.readMedia = function (location) {
    let options = { encoding: null, flags: 'r', mode: 0o666 }
    return createReadStream(location, options)
}


exports.getFileSourceLocation =  function (value) {
    return joinPath(__dirname, '..', '..', 'src', value)
}


exports.readDirectory = async function(location) {
    let options = { withFileTypes: true }
    try {
        return await readdir(location, options)
    }
    catch(e) {
        await Promise.reject(e)
    }
}


