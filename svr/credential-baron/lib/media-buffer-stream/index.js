const { createReadStream } = require('fs')
const { parse: parsePath, join: joinPath } = require('path')
const { Transform, pipeline } = require('stream')





function getMediaStream(location) {
     return createReadStream(location)
}



function streamMedia({ responseStream, mediaStream }) {
    responseStream.setEncoding='binary'
    pipeline(mediaStream, responseStream, ()=>{})
}

async function sendMedia({ responseStream, location }) {
    try {
        let mediaStream = getMediaStream(location)
        await streamMedia({ responseStream, mediaStream })
        return true
    }
    catch(e) {
        await Promise.reject(e)
    }
}

exports.dispatchMediaStream = async ({ responseStream, location }) => {
    try {
        await sendMedia({ responseStream, location })
    }
    catch(e) {
        await Promise.reject(e)
    }
}

exports.isMedia = (location) => {
    let _media_types = ['.img', '.png', '.jpeg', '.jpg', '.pdf', '.svg', '.ico', '.gif']
    let { ext } = parsePath(location)
    return _media_types.includes(ext)
}