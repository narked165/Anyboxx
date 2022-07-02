const { writeFile, access } = require('fs/promises')
const { WRITE_OK, READ_OK } = require('fs').constants
const { join: joinPath } = require('path')


async function fileExists(location) {
    let options = [ WRITE_OK | READ_OK ]
    try {
        return await access(location, ...options)
    }
    catch(e) {
        await Promise.reject(e)
    }

}

async function check(location) {
    let fileExist
    try {
        fileExist = await fileExists(location)
        return true

    }
    catch(e) {
        return false
        Promise.reject(e)
    }
}

async function fileWrite(location, data) {
    let options = { encoding: 'utf-8', flags: 'w', mode: 0o666 }


    try {
        await writeFile(location, data, options)

    }
    catch(e) {
        await Promise.reject(e)
    }
}




exports.createDataFile = async function (location, data) {
    console.log(location, data)
    let exists
    try {
       exists = await check(location)
       if (!exists) {
           await fileWrite(location, data)
       }

    }
    catch(e) {
       await Promise.reject(e)
    }

}
