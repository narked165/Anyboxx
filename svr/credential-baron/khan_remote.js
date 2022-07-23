const { KhanRemote } = require('./lib/khan-web-events')
const { join: joinPath } =require('path')
const { readdir } = require('fs/promises')
const connect  = KhanRemote()
const { khan, remote_events } = connect()
const config = require('./cfg/default.json')


remote_events.on('echo', async ({ ARGUMENT, FLAGS, _rc }) => {
    _rc(await ARGUMENT)
})

remote_events.on('ls', async ({ ARGUMENT=".", FLAGS, _rc }) => {
    let $HOME = joinPath(__dirname, config.directoryRoot)
    let options = { withFileTypes: true }
    let dir = await readdir(joinPath($HOME, ARGUMENT), options)
    let contents = dir.map(dirent => `<ol>${ dirent.name }}</ol>`)

    _rc(Buffer.from(contents.join('')))
})

remote_events.on('touch', (location) => {

})

remote_events.on('mkdir', (location) => {

})
exports.khan_remote = remote_events