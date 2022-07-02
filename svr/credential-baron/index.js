const { createWriteStream } = require('fs')
const { open, readFile, readdir, rm } = require('fs/promises')
const { join: joinPath, parse: parsePath } = require('path')
const { data_path_index, user_data_keys, user_key_index } = require('./_dat_/_cfg_/index.json')
const METHOD = require('./cfg/accepts.json')
const { GET_FORBIDDEN } = require('./cfg/forbidden.json')
const users = require('./cfg/test-users.json')
const { contentStream } = require('./lib/restore-users')
const { sourceIndex } = require('./lib/create-soure-file-index')
const { createUniqueKey } = require('./lib/key-creator')
const { createFilePathIndex } = require('./lib/file-path-index')
const { createDataFile } = require('./lib/create-data-file')
const {safeRead} = require('./lib/safe-read')



const _CredentialBaron =  function() {

        return {
            _path_: {
                select(value) {
                    return this.index[value]
                }
            },

            _key_: {
                _keys: {},
                //reverse lookup

                add(id, value) {
                    this._keys[value] = this._keys[value] = id
                    console.log(`Wrote new userKey for ${ value } -> ${ id }\n---------------------->\n`)

                },

                query(value) {
                    return value in this
                },

                remove(value) {
                    if (this.query(value)) {
                        delete this[value]
                        CredentialBaron.emit('user_key_removed', value)
                    }
                },

                update(value, id) {
                    if (this.query(value)) {
                        this[value].id = id
                        CredentialBaron.emit('user_key_updated', {id, value})
                    }
                },
                select(value) {
                    return this._keys[value]

                }
            },
            _username_: {
                _usernames: {},
                add(id, value) {
                    this._usernames[id] = this._usernames[id] || value

                },

                query(id) {
                    return id in this
                },

                remove(id) {
                    if (this.query(id)) {
                        delete this[id]
                    }
                },

                update(value0, value1, id) {
                    if (this.query(id)) {
                        if (this[id].contains(value0)) {
                            this[id][this[id].indexOf(value0)] = value1
                        }
                    }

                },
                select(id) {
                    return this._usernames[id]

                }
            },

            _password_: {
                _passwords: {},

                add(id, value) {
                    this._passwords[id] = this._passwords[id] || value
                },

                query(id) {
                    return id in this
                },

                remove(id) {
                    if (this.query(id)) {
                        delete this[id]
                    }
                },

                update(value, id) {
                    if (this.query(id)) {
                        this[id].username = value
                    }
                },
                select(id) {
                    return this._passwords[id]
                }
            },
            _app_: {
                _apps: {},
                add(id, value) {
                    this._apps[id] = this._apps[id] || value

                },

                query(id) {
                    return id in this
                },

                remove(id) {
                    if (this.query(id)) {
                        delete this[id]
                    }
                },

                update(value0, value1, id) {
                    if (this.query(id)) {
                        if (this[id].contains(value0)) {
                            this[id][this[id].indexOf(value0)] = value1
                        }
                    }

                },
                select(id) {
                    return this._apps[id]
                }
            },
            _url_: {
                _urls: {},
                add(id, value) {
                    this._urls[id] = this._urls[id] || value

                },

                query(id) {
                    return id in this
                },

                remove(id) {
                    if (this.query(id)) {
                        delete this[id]
                    }
                },

                update(value0, value1, id) {
                    if (this.query(id)) {
                        if (this[id].password === value0) {
                            this[id].password = value1
                        }
                    }

                },
                select(id) {
                    return this._urls[id]


                }
            },
            filePathIndex: {
                set (value) {
                    this.$FILE_PATH_INDEX = value
                },
                get () {
                    return this.$FILE_PATH_INDEX
                }
            },

            createUniqueKey() {
              return createUniqueKey(8)
            },
            async createFilePathIndex() {
                let index = await createFilePathIndex()
                this._path_.index = index
                this.filePathIndex = index
            },
            events: {},
            on(handle, handler) {
                this.events[handle] = this.events[handle] || []
                this.events[handle].push(handler)
            },
            off(handle, handler) {
                this.events[handle] && this.events[handle]
                    .slice(this.events[handle].indexOf(handler), 1)
            },

            emit(handle, data) {
                this.events[handle] && this.events[handle]
                    .forEach(e => e.call(this, data))
            },

            once(handle, handler) {
                this.on(handle, handler)
                this.on(handle, () => delete this.events[handle])
            },
            list() {
                return Object.keys(this.events)
            },

            async create({username, password, app, url}) {

                if (this._key_.query(username)) {
                    console.log(`user: ${username}, already exists.`)
                    return this._key_.select(username)
                }

                let { USERNAME } = require('./cfg/index.json').USER_FIELDS
                console.log(USERNAME)
                let uniqueKey = createUniqueKey(8)
                this._key_.add(uniqueKey, username)
                this._username_.add(uniqueKey, username)
                this._password_.add(uniqueKey, password)
                this._app_.add(uniqueKey, app)
                this._url_.add(uniqueKey, url)
                try {
                    await this.emit('create_new_user', { uniqueKey, user: { username, password, app, url }})

                } catch (e) {
                    await Promise.reject(e)
                }

            },

            enable_syncData() {
                return this.on('create_new_user', async ({uniqueKey, user}) => {
                    try {
                        await this.write({ uniqueKey, user })
                    } catch (e) {
                        await Promise.reject(e)
                    }
                })
            },
            async writeKey(uniqueKey, username) {
                let { _key_ } = require('./cfg/file-path-index.json'),
                    data = JSON.stringify({ uniqueKey }),
                    filename = joinPath(_key_, `${username}.json`)

                try {

                    await createDataFile(filename, data)
                }
                catch(e) {
                    await Promise.reject(e)
                }
            },


            async write({ uniqueKey, user}) {
                let { username, password, app, url } = user
               let { _username_, _password_, _url_, _app_ } = require('./cfg/file-path-index.json'),
                   filename = `${ uniqueKey }.json`




                try {
                    await this.writeKey(uniqueKey, username)
                    await createDataFile(joinPath(_username_, filename), JSON.stringify({ username }))
                    await createDataFile(joinPath(_password_, filename), JSON.stringify({ password }))
                    await createDataFile(joinPath(_app_, filename), JSON.stringify({ app }))
                    await createDataFile(joinPath(_url_, filename), JSON.stringify({ url }))

                }
                catch(e) {
                    console.error(e)
                }
            },
            async writea(username, uniqueKey) {


                let {_username_, _password_, _url_, _app_ } = require('./cfg/file-path-index.json')
                    w_options = {encoding: 'utf-8', flags: 'w', mode: 0o666},
                    KEY_PATH = joinPath(__dirname, '_dat_', '_key_', `${username}.json`),
                    USER_PATH = joinPath(_username_, `${uniqueKey}.json`),
                    PASSWORD_PATH = joinPath(_password_, `${uniqueKey}.json`),
                    APP_PATH = joinPath(_app_, `${uniqueKey}.json`),
                    URL_PATH = joinPath(_url_, `${uniqueKey}.json`),

                   // KEY_WRITER = createWriteStream(KEY_PATH, w_options),
                    //USER_WRITER = createWriteStream(USER_PATH, w_options),
                  //  PASSWORD_WRITER = createWriteStream(PASSWORD_PATH, w_options),
                  //  APP_WRITER = createWriteStream(APP_PATH, w_options),
                  //  URL_WRITER = createWriteStream(URL_PATH, w_options),


                    USER_VALUE = this._username_.select(uniqueKey),
                    PASSWORD_VALUE = this._password_.select(uniqueKey),
                    APP_VALUE = this._app_.select(uniqueKey),
                    URL_VALUE = this._url_.select(uniqueKey)



                try {
                   // await KEY_WRITER.write(JSON.stringify({ id: uniqueKey }, null, 2))
                   // await USER_WRITER.write(JSON.stringify({ username: USER_VALUE }, null, 2))
                  //  await PASSWORD_WRITER.write(JSON.stringify({ password: PASSWORD_VALUE }, null, 2))
                   // await APP_WRITER.write(JSON.stringify({ app: APP_VALUE }, null, 2))
                   // await URL_WRITER.write(JSON.stringify({ url: URL_VALUE }, null, 2))


                } catch (e) {
                    await Promise.reject(e)
                }


            },

            async purge() {
                for (let k of Object.keys(data_path_index)) {
                    let location = joinPath(__dirname, data_path_index[k])
                    let dr_options = {withFileTypes: true}
                    let rm_options = {recursive: false, force: false}
                    try {
                        let dir = await readdir(location, dr_options)
                        let files = dir.filter(dirent => dirent.isFile())
                        for (let f of files) {
                            let filepath = joinPath(location, f.name)
                            await rm(filepath, rm_options)

                        }
                        console.log('Purge Completed...')
                    } catch (e) {
                        await Promise.reject(e)
                    }

                }
            },

            async readFile(location) {
                let options = ['r', 0o666]
                try {
                    let fd = await open(location, ...options)
                    let data = await fd.readFile('utf-8')
                    await fd.close()
                    return data
                } catch (e) {
                    await Promise.reject(e)
                }
            },


            async readDirectory(k) {
                let location = joinPath(__dirname, k)
                let options = {withFileTypes: true}
                try {
                    let dir = await readdir(location, options)

                    return {
                        name: k,
                        location,
                        files: dir.filter(dirent => dirent.isFile()),
                        directories: dir.filter(dirent => dirent.isDirectory())
                    }
                } catch (e) {
                    Promise.reject(e)
                }


            },
            async removeUser(uniqueKey, k) {
                let location = joinPath(__dirname, data_path_index[k], `${uniqueKey}.json`).trim()
                let options = {recursive: false, force: false, maxRetries: 2, retryDelay: 200}
                try {
                    let removed = await rm(location, options)
                    if (typeof removed === 'undefined') {
                        this.emit('user_data_removed', (uniqueKey, k))
                    }
                } catch (e) {
                    await Promise.reject(e)
                }
            },

            async removeUserKey(username) {
                let location = joinPath(__dirname, data_path_index['_key_'], `${username}.json`).trim()
                let options = {recursive: false, force: false, maxRetries: 2, retryDelay: 200}
                try {
                    let fd = open(location, 'r', 0o666)
                    fd.cose()
                    let removeKey = await rm(location, options)
                    if (typeof removeKey === 'undefined') {
                        this.emit('user_removed', username)
                    }
                } catch (e) {
                    Promise.reject(e)
                }
            },
            async removeUserData(username) {
                this.on('user_removed', async (userame) => {
                    try {
                        await this.removeUserKey(username)
                        await Promise.resolve(true)
                    }
                    catch(err) {e
                        if (err.code === 'ENOENT') {
                            await Promise.resolve(true)
                        }
                        else {
                          await Promise.reject(err)
                        }
                    }
                    console.log(`user: ${username} has been removed`)
                })
                this.on('user_data_removed', (username) => this[k].query(uniqueKey) ? this[k].remove(uniqueKey) : console.warn(`[!] [WARN] :: ${ usernname } has already been removed from ${ k }\n`) )
                let uniqueKey = this._key_.select(username)
                let filtered_data_keys = user_data_keys.splice(user_data_keys.indexOf('_key_'), 1)
                // console.log(user_data_keys)
                for (let k of user_data_keys) {
                    await this.removeUser(uniqueKey, k)
                }
                   this.emit('user_removed', username)
            },

            async readContents(d, files) {

                let location, contents = {}
                contents[d] = contents[d] || {}
                for (let f of files) {
                    let key = f.name.replace('.json', '')
                    location = joinPath(__dirname, data_path_index[d], f.name)
                    contents[d][key] = contents[d][key] || await this.readFile(location)
                }
                return contents
            },
            async restoreKeys() {
                let location = joinPath(__dirname, '_dat_', '_key_')

                let datStream = await contentStream(location)

                for await (let user of datStream) {
                    this._key_.add(Object.values(user).pop().uniqueKey, Object.keys(user).toString())
                }

                return Object.values(this._key_._keys)
            },

            async restore() {
                let keys = await this.restoreKeys()
                let dirs = ['_username_', '_password_', '_url_', '_app_'],
                    r_location = joinPath(__dirname, '_dat_'), d

                for await (d of dirs) {

                    let location = joinPath(r_location, d)

                    let datStream = await contentStream(location)
                    let n = d.replace('_', '').replace('_', '').trim()

                    for await (let user of datStream) {
                        this[d].add(Object.keys(user).toString(), Object.values(user).pop()[n])

                    }
                }

                return keys.map(k => this._username_.select(k))

            },
            selectUser(key) {
              let user = {
                  username: this._username_.select(key),
                  password: this._password_.select(key),
                  url: this._url_.select(key),
                  app: this._app_.select(key)
              }
            },

            getUsersWithFilter() {
                let users = Object.keys(CredentialBaron._key_)
                let values = Object.values(CredentialBaron._key_)
                users.map((k, i) => console.log(`[${i}]\t${k}:\t${CredentialBaron._key_.select(k)}`))
                return users.filter((k, i) => {
                    if(typeof values[i]  !== 'function') {
                        return k
                    }
                })
            },

            async initServer() {
                this.enable_syncData()


                try {


                  await this.createFilePathIndex()
                  //await this.purge()
                 // let userList = await this.createTestUsers()
                // console.log(userList)
                 let restoreServer = await CredentialBaron.restore()
                // console.log(`Keys: ${restoreServer}\n`)

              // return restoreServer
                } catch (e) {

                    console.error(e)
                }


            },
           async createTestUsers() {
                    let users = require('./cfg/test-users.json')

                try {
                    let userList = users.map(async u => await CredentialBaron.create(u))
                    await Promise.all(userList)
                    return userList

                }
                catch (e) {
                    await Promise.reject(e)

                }


            },

        }
    }



function api() {
    CredentialBaron = _CredentialBaron.apply(this)

    let api = {
        async startServer() {
            let userList = await CredentialBaron.initServer()
            return userList

        },

        checkUrlMethodIncomming({ url, method }) {
            let accept = METHOD[method.toUpperCase()]
            return accept.includes(url)
        },

        checkGetForbiddenUrl({ url }) {
            return GET_FORBIDDEN.includes(url)
        },

        async addTestUsers(responseStream) {
            let users = require('cfg/test-users.json')

                response
            try {
               let userList = users.map(u => CredentialBaron.create(u))
                await Promise.all(userList)
                response = JSON.stringify({
                    oppertion: 'add-test-users',
                    status: 'complete'
                })
                responseStream._transform(Buffer.from(response), 'utf-8', () => {})
                return userList
            }
            catch (e) {
                response = JSON.stringify({
                    oppertion: 'add-test-users',
                    status: 'complete',
                    error: e
                })

            }


            async function createUserPack(u) {
                return await CredentialBaron.create({
                    username: u,
                    password: 'Spork',
                    url: 'http://127.0.0.1:9090',
                    app: 'Anyboxx'
                })
            }

        },
        async testRebase() {
            try{
               await CredentialBaron.purge()
               let results =  await CredentialBaron.createTestUsers()
                return JSON.parse(results)
            }
            catch(e) {
             await Promise.reject(e)
            }

        },
        async purgeDB(responseStream) {
            let response
            try {
                await CredentialBaron.purge()
                response = JSON.stringify({
                    opperation: 'purge',
                    status: 'complete'
                })
            }
            catch(e) {
                response = JSON.parse({
                    opperaion: 'purge',
                    status: 'failed',
                    error: e
                })
            }
            responseStream._transform(Buffer.from(response), 'utf-8', (e) => e? console.error(e) : !e)
        },
        async createUser(postValue, responseStream) {
            let { username } = postValue
            let uniqueString = await CredentialBaron.create(postValue)
            let user_created = this.verify_user_created(uniqueString, postValue)
            responseStream.end(JSON.stringify({ user: username, value: user_created }))
            return { user: username, value: user_created }
        },

        loadUser(value) {
            if (CredentialBaron._key_.query(value)) {
                let auth_key = CredentialBaron._key_.select(value)
                console.log(auth_key)
                console.log(value)
                let AUTH_USER =  [
                    CredentialBaron._username_.select(auth_key),
                    CredentialBaron._password_.select(auth_key),
                    CredentialBaron._url_.select(auth_key),
                    CredentialBaron._app_.select(auth_key)
                ]
                return AUTH_USER
            }
            else {
                console.error(`No user: named ${ value.user } exists.  `)
            }


        },

            verify_user_created(options) {
                let { username, password, url, app } = options
                let uniqueString = CredentialBaron._key_.select(username)
                let _un = CredentialBaron._user_.select(uniqueString),
                    _us = CredentialBaron._key_.select(uniqueString),
                    _pw = CredentialBaron._password_.select(uniqueString),
                    _ur = CredentialBaron._url_.select(uniqueString),
                    _ap = CredentialBaron._app_.select(uniqueString)
                let COND0 = [
                    typeof uniqueString, typeof username, typeof password, typeof url, typeof app
                ]

                let COND1 = [
                    typeof _us, typeof _un, typeof _pw, typeof _ur, typeof _ap
                ]

                let COND2 = [
                    _un === username,
                    _us === uniqueString,
                    _pw === password,
                    _ur === url,
                    _ap === app
                ]
                return (
                    COND0.every(c => c !== 'undefined')
                    && COND1.every(c => c !== 'undefined')
                    && COND2.every(c => c === true)
                )

            },

        queryUser(username, responseStream) {
            let queryResponse = CredentialBaron._key_.query(username)
                let response = JSON.stringify({
                    user: username,
                    value: queryResponse
                })
            console.log(response)
            responseStream._transform(Buffer.from(response), 'utf-8', (e) => e ?console.error(e) : !e)
        },

        authenticate( responseStream, { username, password, url, app }) {


          let AUTH_KEY = CredentialBaron._key_.select(username),
              AUTH_USERNAME = CredentialBaron._username_.select(AUTH_KEY),
              AUTH_PASSWORD = CredentialBaron._password_.select(AUTH_KEY),
              AUTH_URL = CredentialBaron._url_.select(AUTH_KEY),
              AUTH_APP = CredentialBaron._app_.select(AUTH_KEY)
            console.log(AUTH_KEY)
            console.log(AUTH_USERNAME === username)
            console.log(AUTH_PASSWORD === password)
            console.log(AUTH_URL === url, url, AUTH_URL)
            console.log(AUTH_APP === app)


            responseStream._transform(JSON.stringify({pork: 'Spork'}), 'utf-8', ()=>{})




        },

        showUsers(responseStream) {
          /* let users = Object.keys(CredentialBaron._key_)
            let values = Object.values(CredentialBaron._key_)
            let DATA_USERS = {}
            users.map((k, i) => console.log(`[${i}]\t${k}:\t${CredentialBaron._key_.select(k)}`))
            DATA_USERS.users = users.filter((k, i) => {
                    if(typeof values[i]  !== 'function') {
                        return k
                    }
                })
*/
                    let users = CredentialBaron.getUsersWithFilter()
                 console.log(users)
               let response = JSON.stringify({users})
            responseStream._transform(Buffer.from(response), 'utf-8', e => e? console.error(e): !e)
        },
       async removeUser(user, responseStream) {
            let { username } = user
           await CredentialBaron.removeUserData(username)
           let response = JSON.stringify({
               user: username,
               value: CredentialBaron._key_.query(username)
           })
           responseStream._transform(Buffer.from(reasponse), 'utf-8', e => e ?console.error(e) : !e)
        }
    }

    return api
}




exports.CredentialBaron = api


















