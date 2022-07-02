const { read, readMedia, getFileSourceLocation } = require('../file-system')
const { sourceIndex } = require('../create-soure-file-index')


exports.StaticProxy = function(root) {

    let _staticProxy = {
        _buffer_: {},
        set source(value) {
            this.$SOURCE = value
        },
        get source() {
            return this.$SOURCE
        },
        query(value) {
            return value in this._buffer_
        },

        select(value) {
            console.log(value)
            if (this.query(value)) {
                return this._buffer_[value].toString('utf-8')
            } else {
                return false
            }
        },
        
        add(key, value) {
            console.log(key)
            this._buffer_[key] = this._buffer_[key] || []
            this._buffer_[key].push(Buffer.from(value))

                console.log(`File added to Buffer: ${ key }`)
            return key

        },

        remove(value) {
            if (this.query(value)) {
                delete this._buffer_[value]
                return true
            } else {
                return false
            }
        },
        list() {

        },

       async addFileList(_fileList) {
            let fileList = JSON.parse(_fileList),
            keyList = Object.keys(fileList)

            try {

               return await keyList.map(async (k, i) => {

                   try {
                       let data = await read(fileList[k])
                       let key = await this.add('/' + fileList[k], data)
                       return key

                   }
                   catch(e) {
                      await Promise.reject(e)
                   }

               })
            }
            catch(e) {
                await Promise.reject(e)
            }

        },

        async init() {
            try {
                let FileIndex = await sourceIndex(this.source)
                let files = await FileIndex.getCurrentFileIndex()
                files = JSON.parse(files)

                for (let k of Object.values(files)) {
                    console.log({k})

                    let keyArray = k.split('/src').filter(k => k)
                    console.log(keyArray[1])
                    let key = keyArray[1]
                    let data = await read(k)
                    this.add(key, data)
                }
                return files


            }
            catch(e) {
               await Promise.reject(e)
            }
        }

    }


    //----------------------
    let _api = {
        query(value) {
            return _staticProxy.query(value)
        },
        select(value) {
            return _staticProxy.select(value)
        },
        add(key, value) {
            return _staticProxy.add(key, value)
        },
        remove(key) {
            return _staticProxy.remove(key)
        },
        list() {
            return _staticProxy.list()
        },

        addFiles(list) {
            return _staticProxy.addFileList(list)
        },
        init() {
            return _staticProxy.init()
        },
        setSource(value) {
            _staticProxy.source = value
        }

    }
    _api.setSource(root)
    console.log(_staticProxy.source)
    return _api


}

