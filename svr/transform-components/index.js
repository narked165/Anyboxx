const { Transform, pipeline } = require('stream')
const { createReadStream } = require('fs')
const { open, readFile } = require('fs/promises')
const { join: joinPath } = require('path')
const transformComponents = function(documentStream) {
    let HTMLParser = Transform({
        readableObjectMode: true,
        writableObjectMode: true,
        transform(chunk, encoding, callback) {
            callback()
            let charArray = Array.from(chunk.toString())
            let elementMap = charArray.map((char, i, a) => {
                let head = [], tail = []
                if (char === '<' && charArray[i + 1] !== '/') {
                    let end = charArray.indexOf('>')
                    head.push(charArray.splice(i, charArray.length - end).join(''))
                } else if (char === '<' && charArray[i + 1] === '/') {
                    let end = charArray.indexOf('>')
                    tail.push(charArray.splice(i, charArray.length - end).join(''))
                }
                console.log('head :: ' + head, 'tail :: ' + tail)
            })
            elementMap.forEach((el, i) => console.log(`${i} :: ${el}\n`) )



        }
    })
    let response = process.stdout
    let htmlParser = HTMLParser
    pipeline(
        htmlParser,
        response,
        ()=>{}
    )
    htmlParser._transform(documentStream, 'utf-8', console.error)
}

async function getHTML(location) {
    let options = ['r', 0o666]
    try {
        let fd = await open(location, ...options)
        let data = await fd.readFile('utf-8')
        await fd.close()
        transformComponents(Buffer.from(data))

    }
    catch(e) {
        console.error(e)
    }
}

const location = joinPath(__dirname, '..', '..', 'src','index.html')

let parse = getHTML(location)
parse.catch(console.error)