const { readdir, open } = require('fs/promises')
const { join: joinPath, parse: parsePath } = require('path')
const { createWriteStream } = require('fs')


const { read, getFileSourceLocation, readMedia, readDirectory } = require('../file-system')

const FileIndex = {
    _file_index_:{
        files: {},
        folders: {}
    },
    queryFileIndex(k) {
        return k in this._file_index_
    },
    addFileIndex(k, v) {
        console.log(k,v)
        this._file_index_.files[k] = this._file_index_.files[k] || v
    },
    addFolderIndex(k, v) {
        this._file_index_.folders[k] = this._file_index_.folders[k] || v
    },
    getFileIndex(k) {
        if (this.queryFileIndex(k)) {
            return this.fileIndex[k] && this.fileIndex[k]
        }
    },
    writeFileIndex() {
        let cfg_location = getFileSourceLocation('../cfg/source-files.json'),
            options = { flags: 'w', encoding: 'utf-8', mode: 0o666 }
        let index_writer = createWriteStream(cfg_location, options)
        let index_json = JSON.stringify({
            dir: this.location,
            files: this._file_index_.files
        }, null, 2)
        index_writer.write(index_json)
    },
    getCurrentFileIndex() {
        return JSON.stringify(this._file_index_.files, null, 2)
    }
}

async function parseDirectory(dir_location) {
        options = { withFileTypes: true },
        DIRECTORY = {
            set name(value) {
                this.$NAME = value
            },
            get name() {
                return this.$NAME
            },
            set location(value) {
                this.$LOCATION = value
            },
            get location() {
                return this.$LOCATION
            },

            _file_index_:{
                files: {},
                folders: {}
            },
            queryFileIndex(k) {
                return k in this._file_index_
            },
            addFileIndex(k, v) {
                this._file_index_.files[k] = this._file_index_.files[k] || v
            },
            addFolderIndex(k, v) {
                this._file_index_.folders[k] = this._file_index_.folders[k] || v
            },
            getFileIndex(k) {
                if (this.queryFileIndex(k)) {
                    return this.fileIndex[k] && this.fileIndex[k]
                }
            },
            _folder_index_: [],
            _files_: [],
            _folders_: [],
            _misc_: [],
            fileList(label) {
                console.info(`${ label }\n`)
                this._files_
                    .forEach((f, i) => console.info(`\t[${ i }]\tFile:\t${ f }`))
            },
            folderList(label) {
                console.info(`${ label }\n`)
                this._folders_ .forEach((d, i)=> console.info(`\t[${ i }]\tDir:\t${ d}`))
            },
            miscList(label) {
                console.info(`${ label }\n`)
                this._folders_.forEach((m, i) => console.info(`\t[${ i }]\tMisc:\t${ m }`))
            },
            writeFileIndex() {
                    let cfg_location = joinPath('..', '..', 'cfg', 'source-files.json' )
                    options = { flags: 'w', encoding: 'utf-8', mode: 0o666 }
                let index_writer = createWriteStream(cfg_location, options)
                let index_json = JSON.stringify({
                    dir: this.location,
                    files: this._file_index_.files,
                    folders: this._file_index_.folders
                }, null, 2)
                index_writer.write(index_json)
            },
            build_fileIndex() {

                this._files_.forEach(f => {
                    let key = joinPath(dir_location, f)
                    let value = getFileSourceLocation(`${dir_location}/${f}`)
                    FileIndex.addFileIndex(key, value)
                })

            },
            build_folderIndex() {
                this._folders_.forEach(f => {
                    let value = joinPath(dir_location, f)
                    this._folder_index_.push(value)
                })
            },
            getFolderIndex() {
                return this._folder_index_
            }
        }

    try {
        DIRECTORY.name = dir_location
        DIRECTORY.location = getFileSourceLocation(dir_location)
        console.log(DIRECTORY.location)
        let dir = await readDirectory(DIRECTORY.location)
        let files = dir.map(dirent => {
            if (dirent.isFile() && !dirent.name.startsWith('.')) {
                DIRECTORY._files_.push(dirent.name)
            }
            else
            if (dirent.isDirectory() && !dirent.name.startsWith('.')) {
                DIRECTORY._folders_.push(dirent.name)
            }
            else if (!dirent.isFile() && !dirent.isDirectory()) {
                DIRECTORY._misc_.push(dirent.name)
            }
        })


        return DIRECTORY


    }
    catch(e) {
        Promise.reject(e)
    }
}

async function createDirectoryIndex(source) {
    let location = getFileSourceLocation(source)
    try {
        let DIRECTORY =  await parseDirectory(source)
        DIRECTORY.build_fileIndex()
        DIRECTORY.build_folderIndex()
        return DIRECTORY.getFolderIndex()
    }
    catch (e) {
        if (e && e.code) {
            console.warn(e.code)
        }
        console.warn(e)
    }
}
async function createFileIndex(root) {
    try {
        let childDirectories = await createDirectoryIndex(root)
        console.log(childDirectories)
        return childDirectories


    }
    catch(e) {
       await Promise.reject(e)
    }
}


async function buildIndex(root) {
    try {
        let folders = await createFileIndex(root)
        for (let f of folders) {
            await createFileIndex(f)
        }

    }
    catch(e) {
        await Promise.reject(e)
    }
}

exports.sourceIndex = async function(source) {
    try {
        await buildIndex(source)
        await buildIndex('/components')
        await FileIndex.writeFileIndex()
        return FileIndex
    }
    catch(e) {
       await Promise.reject(e)
    }
}

