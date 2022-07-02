let { networkInterfaces, hostname } = require('os')
let { USER } = require('process').env


exports.getOSInfo = function() {
    let intObject = networkInterfaces(),
        { en0 } = intObject,
        _ipv4Interface = en0.filter(k => k.family === 'IPv4'),
        _ipv6Interface = en0.filter(k => k.family === 'IPv6'),
        appArray = process.env.PWD.split('/').filter(k => k),

        INTERFACE_EN0 = {
            interface: en0,
            ipv4Interface: _ipv4Interface[0],
            ipv6Interface: _ipv6Interface[0],
            hostname: hostname,
            user: USER,
            app: appArray.pop().trim()
        }
    return INTERFACE_EN0
}


