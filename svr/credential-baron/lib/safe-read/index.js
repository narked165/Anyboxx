const { join: joinPath, relative } = require('path')
const { access, open, readFile } = require('fs/promises')
const { READ_OK, WRITE_OK } = require('fs').constants

function isJSONString(data) {
   return [
       typeof data !== 'undefined' &&
       typeof data === 'string' &&
       !(data instanceof Object)
       && data.startsWith(`{`)
       && data.endsWith(`}`)
       && data.includes(':')
   ]
}

async function exists(location) {
    let options = [ READ_OK | WRITE_OK ]
    try {
        await access(location, ...options)
        return location
    }
    catch(e) {
        await Promise.reject(e)
    }
}

async function fileRead(location) {
    let options = [ 'r', 0o666 ], exists_location, fd, data
    try {
        exists_location = await exists(location)
        fd = await open(exists_location, ...options)
        data = await fd.readFile('utf-8')
        await fd.close()
        return data
    }
    catch(e) {
       await Promise.reject(e)
    }
}

exports.safeRead = async function(location) {
    let data

    try {
        data = await fileRead(location)
        return (typeof data === 'undefined')
            ? await Promise.reject(`Can not parse document; Location: ${location} is empty and is returning undefined.`)
            : (isJSONString(data))
                ? JSON.parse(data)
                : data
    }

    catch(e) {
       await Promise.reject(e)
    }
}

