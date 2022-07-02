const { credServer } = require('./lib/cred-web-server')

async function Server() {
    try {
        let { creds, EN0_INTERFACE }= await credServer()
        console.log()
        creds.listen(9090, EN0_INTERFACE.ipv4Interface.address)
    }

    catch(e) {
        Promise.reject(e)
    }










}

let server = Server()
    server.catch(console.error)