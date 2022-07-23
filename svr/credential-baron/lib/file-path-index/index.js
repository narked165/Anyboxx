const { join: joinPath } = require('path')
const { opendir, open, readFile } = require('fs/promises')
const { safeWrite } = require('../safe-write')


exports.createFilePathIndex = async function () {

    let r_location = joinPath(__dirname, '..', '..', '_dat_', '_path_'),
        w_location = joinPath(__dirname, '..', '..', 'cfg', 'file-path-index.json'),
        d_options = { encoding: 'utf-8', bufferSize: 64 },
        r_options = [ 'r', 0o66 ],
        d_location, fd, data, content
    try {
        let dir = await opendir(r_location, d_options)
        let index = {}
        for await (let d of dir) {
            console.log(d)
            d_location = joinPath(r_location, d.name)
            fd = await open(d_location, ...r_options)
            data = await fd.readFile('utf-8')
            await fd.close()
            data = JSON.parse(data)
            console.log(data.path)
            index[d.name] = index[d.name] || data.path
        }
        content = Buffer.from(JSON.stringify(await index, null, 2))

        await safeWrite(w_location, content)
        return index
    }

    catch(e) {
        await Promise.reject(e)
    }
}



