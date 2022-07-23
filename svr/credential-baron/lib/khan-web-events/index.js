const { EventEmitter } = require('events')



class Khan extends EventEmitter {
    constructor() {
        super()
    }

}

const khan = new Khan()



function _RemoteResponse(responseStream) {
    return async function(response) {
       responseStream._transform(await response, 'utf-8', () => {})
    }
}


async function _remoteEvent({ responseStream, sendHeaders, options}) {
    let _rc = _RemoteResponse(responseStream)
   let [ DIRECTIVE, ARGUMENT, FLAGS ] = options
    console.log(DIRECTIVE)
    try {
        await khan.emit(DIRECTIVE, {  ARGUMENT, FLAGS, _rc }, )
    }

    catch(e) {
        await Promise.reject(e)
    }
}

exports.KhanRemote =  function() {
    khan
    return function() {
        return {
            khan,
            remote_events: {

                on(handle, handler) {
                    return khan.on(handle, handler)
                },
                emit(handle, data) {
                    return khan.emit(handle, data)
                },
                once() {
                    return khan.emit(handle, handler)
                },
                async remoteEvent({ responseStream, sendHeaders, options}) {

                    return await _remoteEvent({ responseStream, sendHeaders, options })
                }
        }
        }
    }
}




