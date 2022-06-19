const { webs } = require('webnode-http-server')
const { writeConfig } = require('./svr/write-config')
const { open, readFile } = require('fs/promises')
const { pipeline } = require('stream')
const CURRENT_CONFIG = writeConfig(JSON.stringify(webs.config))
const { join: joinPath } = require('path')

let configStream = CURRENT_CONFIG()

webs.use('/a/translateComponent', async (responseStream, data) => {
    try {
        let { body } = await data
        let { component_handle } = JSON.parse(body)

        let location = joinPath(__dirname, 'src', 'components', component_handle, 'index.html')
        let fd = await open(location, 'r', 0o666)
        let doc = await fd.readFile('utf-8')
        await fd.close()
        responseStream.end(doc)
    }
    catch(e) {
        webs.emit('error', e)
    }
})
webs.listen(webs.config.server_port, webs.config.server_address)