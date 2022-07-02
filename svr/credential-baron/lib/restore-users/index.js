const { join: joinPath } = require('path')
const { readdir, open, readFile, opendir } = require('fs/promises')
const { safeRead } = require('../safe-read')



async function directoryStream(location) {
    let options = { encoding: 'utf-8', bufferSize: 64 }
    try {
        let dir = await opendir(location, options)
        return dir
    }

    catch(e) {
        await Promise.reject(e)
    }
}

async function readFileStream(location) {
    let options = ['r', 0o666]
    try {
        return await safeRead(location)
    }
    catch(e) {
        await Promise.reject(e)
    }
}

exports.contentStream = async function *(location)  {
    console.log(location)
    let files = []
    let i = 0
    let dir = await directoryStream(location)
    for await (dirent of dir) {
        files.push({[dirent.name.replace('.json', '')]: await readFileStream(joinPath(location, dirent.name)) })

    }

    for (let i in files) {
        yield files[i]
    }

}

/*
* (async function datContents() {
    let location = joinPath(__dirname, '..', '..', '_dat_', '_key_')

    let datStream = await contentStream(location)


    for await (let user of datStream) {
       _key_.add(Object.keys(user).toString(),Object.values(user).pop().id)

    }
      console.log(_key_.select('mFoss'))

})()
*
* */


