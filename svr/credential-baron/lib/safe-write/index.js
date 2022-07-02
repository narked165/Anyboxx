const { join: joinPath } = require('path')
const { open, writeFile, access } = require('fs/promises')
const { READ_OK, WRITE_OK } = require('fs').constants



async function fileExists(location) {
    let options = [ READ_OK | WRITE_OK ]
    try {
        await access(location, ...options)
        return location
    }
    catch(e) {
        await Promise.reject(e)
    }
}


async function fileWrite(location, content) {
    let options = [ 'w', 0o666 ]
    try {
        let exists = await fileExists(location)
        let fd = await open(exists, ...options)
        await fd.writeFile(content, 'utf-8')
        await fd.close()


    }
    catch(e) {
        await Promise.reject(e)
    }
}

exports.safeWrite = async function (location, content){
    try{
        await fileWrite(location, content)
    }
    catch(e) {
        e && e.code === 'ENOENT'
            ? console.warn(`Unable to write, location does not exist: ${ location }\n`)
            : console.warn(`Unable to write to: ${ location }, an error was thrown!\n\t${ e }\n`)
    }
}





