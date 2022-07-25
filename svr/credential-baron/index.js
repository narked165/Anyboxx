const { createWriteStream } = require('fs')
const { open, readFile, readdir, rm } = require('fs/promises')
const { join: joinPath, parse: parsePath } = require('path')
const {pipeline} = require('stream')
const { khan_remote } = require('./khan_remote.js')

const { LogAgent } = require('./lib/log-agent')
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
const {_username_} = require('./cfg/file-path-index.json')
const { appWelcomeTemplate } = require('./src/components/app-welcome/app-welcome.js')
const {safeWrite} = require('./lib/safe-write')
const { serverUtilApp, serverUtilApi } = require('./lib/server-utils')
const logs = LogAgent()

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
                    return value in this._keys
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
            _firstname_: {
                _firstnames: {},
                add(id, value) {
                    this._firstnames[id] = this._firstnames[id] || value
                },
                query(id) {
                    return id in this._firstnames
                },
                remove(id) {
                    delete this._firstnames[id]
                },
                update(id, value) {
                    this._firstnames[id] = value
                },
                select(id) {
                    return this._firstnames[id]
                }
            },

            _lastname_: {
                _lastnames: {},
                add(id, value) {
                   this._lastnames[id] =  this._lastnames[id] || value
                },
                query(id) {
                    return id in this._lastnames
                },
                remove(id) {
                    delete this._lastnames[id]
                },
                update(id, value) {
                    this._lastname[id] = value
                },
                select(id) {
                    return this._lastnames[id]
                }
            },

            _email_: {
                _emails: {},
                add(id, value) {
                    this._emails[id] = this._emails[id] || value
                },
                query(id) {
                    return id in this._emails
                },
                remove(id) {
                    delete this._emails[id]
                },
                update(id, value) {
                    this._emails[id] = value
                },
                select(id) {
                    return this._emails[id]
                }
            },
            _username_: {
                _usernames: {},
                add(id, value) {
                    this._usernames[id] = this._usernames[id] || value

                },

                query(id) {
                    return id in this._usernames
                },

                remove(id) {
                    delete this._usernames[id]
                },

                update(id, value) {
                   this._usernames[id] = value


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
                   delete this._passwords[id]
                },

                update(id, value) {
                    this._passwords[id] = value
                    return this._passwords[id] === value
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
                   delete this._apps[id]
                },

                update(id, value) {
                    this._apps[id] = value

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
                    return id in this._urls
                },

                remove(id) {
                   delete this._urls[id]
                },

                update(id, value) {
                    this._urls[id] = value

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

            log(m) {
                return logs.log(m)
            },

            readLogs() {
                return logs.read()
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

            async create({firstname, lastname, email, username, password, app, url}) {

                if (this._key_.query(username)) {
                    this.log(`[CB_CREATE] :: User: ${username}, already exists.`)
                    return this._key_.select(username)
                }

                let uniqueKey = createUniqueKey(8)
                this._key_.add(uniqueKey, username)
                this._firstname_.add(uniqueKey, firstname)
                this._lastname_.add(uniqueKey, lastname)
                this._email_.add(uniqueKey, email)
                this._username_.add(uniqueKey, username)
                this._password_.add(uniqueKey, password)
                this._app_.add(uniqueKey, app)
                this._url_.add(uniqueKey, url)
                try {
                    await this.emit('create_new_user', { uniqueKey, user: { firstname, lastname, email, username, password, app, url }})

                } catch (e) {
                    await Promise.reject(e)
                }

            },

            enable_syncData() {
                this.on('create_new_user', async ({uniqueKey, user}) => {
                    try {
                        await this.write({ uniqueKey, user })
                    } catch (e) {
                        await Promise.reject(e)
                    }
                })
                this.on('password-change', async ({AUTH_KEY, POST_N_PASS }) => {
                    let location = joinPath(this.filePathIndex._password_, `${ AUTH_KEY }.json`)
                    let content = JSON.stringify({ password: POST_N_PASS }, null, 2)
                    try {
                            await safeWrite(location, content)
                    }
                    catch(e) {
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
                let { firstname, lastname, email, username, password, app, url } = user
               let { _firstname_, _lastname_, _email_, _username_, _password_, _url_, _app_ } = require('./cfg/file-path-index.json'),
                   filename = `${ uniqueKey }.json`
                try {
                    await this.writeKey(uniqueKey, username)
                    await createDataFile(joinPath(_firstname_, filename), JSON.stringify({ firstname }))
                    await createDataFile(joinPath(_lastname_, filename), JSON.stringify({ lastname }))
                    await createDataFile(joinPath(_email_, filename), JSON.stringify({ email }))
                    await createDataFile(joinPath(_username_, filename), JSON.stringify({ username }))
                    await createDataFile(joinPath(_password_, filename), JSON.stringify({ password }))
                    await createDataFile(joinPath(_app_, filename), JSON.stringify({ app }))
                    await createDataFile(joinPath(_url_, filename), JSON.stringify({ url }))

                }
                catch(e) {
                    console.error(e)
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
                        this.log('[CB_PURGE] :: Purge Completed...')
                    } catch (e) {
                        await Promise.reject(e)
                    }

                }
            },

            async readFile(location) {
                let options = ['r', 0o666]
                this.log(`[CB_READFILE] :: Reading from location: ${ location }`)

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
                    console.log(`[CB_REMOVE_USER_DATA] :: User: ${ username } has been removed`)
                })
                this.on('user_data_removed', (username) => this[k].query(uniqueKey) ? this[k].remove(uniqueKey) : console.warn(`[!] [WARN] :: ${ usernname } has already been removed from ${ k }\n`) )
                let uniqueKey = this._key_.select(username)
                let filtered_data_keys = user_data_keys.splice(user_data_keys.indexOf('_key_'), 1)
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
                let dirs = ['_firstname_', '_lastname_', '_email_', '_username_', '_password_', '_url_', '_app_'],
                    r_location = joinPath(__dirname, '_dat_')

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
              //let userList = await this.createTestUsers()
                //  console.log(await userList)
               let restoreServer = await CredentialBaron.restore()
                   this.log(`[INIT_SERVER] :: Restored Keys: ${restoreServer}\n`)

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


            }

        }
    }



function api() {
    CredentialBaron = _CredentialBaron.apply(this)

    let api = {
        async startServer() {
            let userList = await CredentialBaron.initServer()
            return userList

        },

        checkUrlMethodIncomming(request) {
            let { url, method }  = request
            let accept = METHOD[method.toUpperCase()]
            console.log(method)
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

        serverUtilities({ responseStream }) {
            let app = serverUtilApp()

            responseStream._transform(app, 'utf-8', ()=>{})
           // responseStream._transform(serverUtilApp, 'utf-8', ()=>{})
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

        queryUser({ responseStream, options }) {
            let { username } = options
            let queryResponse = CredentialBaron._key_.query(username)
                let response = JSON.stringify({
                    user: username,
                    value: queryResponse
                })
            responseStream._transform(Buffer.from(response), 'utf-8', (e) => e ?console.error(e) : !e)
        },
        authenticate( responseStream, { username, password, url, app }) {
          let AUTH_KEY = CredentialBaron._key_.select(username),
              AUTH_USERNAME = CredentialBaron._username_.select(AUTH_KEY),
              AUTH_PASSWORD = CredentialBaron._password_.select(AUTH_KEY),
              AUTH_URL = CredentialBaron._url_.select(AUTH_KEY),
              AUTH_APP = CredentialBaron._app_.select(AUTH_KEY)
            let authenticate = [
                AUTH_USERNAME === username &&
                AUTH_PASSWORD === password &&
                AUTH_URL === url &&
                AUTH_APP === app
            ]
            let response = JSON.stringify({ username, url, app, verify: authenticate }, null, 2)
            responseStream._transform(JSON.stringify(response), 'utf-8', ()=>{})
        },

        showUsers(responseStream) {
                    let users = CredentialBaron.getUsersWithFilter()
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
        },

        async updatePassword({ responseStream, options}) {
                let err = null
                let { POST_USERNAME, POST_C_PASS, POST_N_P_MATCH, POST_N_PASS } = options
                let AUTH_KEY = CredentialBaron._key_.select(POST_USERNAME)
                let AUTH_USERNAME = CredentialBaron._username_.select(AUTH_KEY)
                let AUTH_PASSWORD = CredentialBaron._password_.select(AUTH_KEY)

                let optUndefined = [POST_USERNAME, POST_C_PASS, POST_N_PASS].some(v => typeof v === 'undefined')
                if(optUndefined) {
                    err = 'Some of your post arguments were missing or invalid.  Please try again.'
                }
                if(!POST_N_P_MATCH) {
                    err = 'Your new password(s) do not match, please try again.'
                }

                let status = (AUTH_USERNAME === POST_USERNAME && AUTH_PASSWORD === POST_C_PASS && POST_N_P_MATCH)
                    ? CredentialBaron._password_.update(AUTH_KEY, POST_N_PASS)
                    : err='The server expierinced an error while processing your request.'
                    if (status) {
                        CredentialBaron.emit('password-change', { AUTH_KEY, POST_N_PASS })
                    }
                responseStream._transform(JSON.stringify({POST_USERNAME, status, error:err }), 'utf-8', ()=>{})
        },
        async updateInfo({ responseStream, options }) {
            let { POST_UNAME, POST_USERNAME, POST_FIRSTNAME, POST_LASTNAME, POST_EMAIL } = options
            let AUTH_KEY = CredentialBaron._key_.select(POST_UNAME)
        },

        async getAppOptions(username) {

            AUTH_KEY = CredentialBaron._key_.select(username)

          return {
                tempTitle: 'Credential Barron User Management',
                firstname: CredentialBaron._firstname_.select(AUTH_KEY),
                lastname: CredentialBaron._lastname_.select(AUTH_KEY),
                email: CredentialBaron._email_.select(AUTH_KEY),
                username: CredentialBaron._username_.select(AUTH_KEY),
                password: CredentialBaron._password_.select(AUTH_KEY),
                apps: CredentialBaron._app_.select(AUTH_KEY),
                urls: CredentialBaron._url_.select(AUTH_KEY)
            }

        },

        async publishTemplate({ responseStream, sendHeaders, options }) {
           let { appTemplate, username } = options
            user_options = await this.getAppOptions(username)
           sendHeaders('.html')
            try {

                let {template} = appWelcomeTemplate()
                let app = template.transform(user_options)
                responseStream._transform(app, 'utf-8', ()=>{})
            }
            catch(e) {
               await Promise.reject(e)
           }
        },
        log(m) {
            return CredentialBaron.log(m)
        },

        readLogs() {
            return CredentialBaron.readLogs()
        },
        getLogs({ responseStream }) {
           let logArray =  CredentialBaron.readLogs(),
                logBody = logArray.map(l => `<h4>${ l }</h4><br />`)

            responseStream._transform(Buffer.from(logBody.join('')), 'utf-8', ()=>{})
        },
        async getDataBaseData({ responseStream }) {

            let database_data = require('./_dat_/index.json')
            responseStream._transform(JSON.stringify(database_data), 'utf-8', () => {})

        },
        async getDatabaseView({ responseStream }) {
           let database_data = require('./_dat_/index.json')
            try {
                let dir = await readdir(__dirname, { withFileTypes: true })

                let databaseList = dir.filter(dirent => dirent.isDirectory() && dirent.name.includes('_dat_'))
                let database_view = databaseList.map(dirent => {

                    return (`<a data-role="${dirent.name}-${database_data.name}" data-element-group="database-links">
                    <i data-element-group="database-icons" class="fa-duotone fa-database fa-5x" style="--fa-primary-color: white; --fa-secondary-color: yellow;"></i>
                    <h4 class="database-view-name">${database_data.name}</h4>
                </a>`)


                })
                responseStream._transform(database_view.join(''), 'utf-8', () => {})
            }
            catch(e) {
                await Promise.reject(e)
            }
        }
    }
    return api
}




exports.CredentialBaron = api


















