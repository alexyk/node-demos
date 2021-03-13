/**
   Features:
   - GET, POST
   - msgpack
   - lz4
   - lz4 + msgpack
  
   Usage:
   - run 'node serve/index.js'
   - go to 'http://localhost:3000'
   - follow instructions
 */

const http = require('http')
const fs = require('fs')
const msgpack = require('msgpack')
const lz4 = require('lz4js')
const args = process.argv.slice(2)
const DEBUG = false

const MIME = {
  json: 'application/json',
  msgpack: 'application/msgpack',
  lz4: 'application/msgpack',
  zmsgpack: 'application/msgpack',
  html: 'text/html'
}
const ROOT = '/Library/WebServer/Documents/files/'
const FILES = {
  json: `${ROOT}z.json`,
  msgpack: `${ROOT}z.json`,
  lz4: `${ROOT}z.json`,
  zmsgpack: `${ROOT}z.json`,
  flz4: `${ROOT}z.lz4`,
  html: `${ROOT}z.html`,
  error: `${ROOT}/error.html`,
}
const keys = Object.keys(MIME)
let mimeType = MIME.json

function HTTPServer() {
  let server = http.createServer(function (req, res) {
    const { url } = req

    const type = url?.substr(1)
    mimeType = MIME[type]

    if (!mimeType || !keys.includes(type)) {
      console.log(`url=${url}`)
      res.writeHead(400, {
        'Content-Type': MIME.html,
        'Access-Control-Allow-Origin': '*'
      })

      let theCase = 'string'
      switch (theCase) {
        case 'string':
          res
            .write(`<html><head><title>Error in Request</title><style>span { color: gray }</style></head><body>
                    <br /><br /><br /><br />
                    <center>
                    <h1>Error in Request</h1>
                    Expected path is one of <span>/${keys.join(', /')}</span>.<br/>
                    Current path is <span>${url}</span>.</center>
                    </body></html>`)
          res.end()
          break

        case 'file':
          fs
            .createReadStream(response, 'UTF-8')
            .pipe(res)
          break
      }
      return
    }

    switch (req.method) {
      case 'GET':
        console.log(`GET ${url}     =>     Serving: '${FILES[type]}' as '${mimeType}'`)
        DEBUG && console.log(`Request`, req)

        const data = fs.readFileSync(FILES[type])

        res.writeHead(200, {
          'Content-Type': mimeType,
          'Access-Control-Allow-Origin': '*'
        })
        // console.log(`mime:${mimeType} filename=${FILES[arg1]} url=${req.url}`, req)
        let response = Buffer.from(data)
        DEBUG && console.log(`Response before`, response)
        if (['msgpack', 'zmsgpack'].includes(type)) {
          console.log(`  > Formatting as MsgPack`)
          response = msgpack.pack(JSON.parse(response))
          DEBUG && console.log(`Response MsgPack`, response)
        }
        if (['lz4', 'zmsgpack'].includes(type)) {
          console.log(`  > Compressing data with LZ4`)
          response = lz4.compress(response)
          DEBUG && console.log(`Response LZ4`, response)
        }

        DEBUG && console.log(`Response to-be-sent`, response)
        res.write(response)
        res.end()
        break

      case 'POST':
        console.log(`POST ${url}     =>     Serving: '${FILES[mimeType]}' as '${mimeType}'`)
        var body = ''
        req.on('data', function (chunk) {
            body += chunk
        })
        req.on('end', function(){
            res.writeHead(200, { 'Content-Type': mimeType })
            res.end(body)
        })
        break
      }
  })

  server.listen(3000)
}

HTTPServer()
