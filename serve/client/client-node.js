const lz4 = require('lz4js')
const msgpack = require('msgpack-js')
const axios = require('axios').default
const { request } = require('./client')

const DEBUG = false
const args = process.argv.slice(2)

console.log(`[@@@][GW-WS] Import lz4 and msgpack`)
DEBUG &&  console.debug({msgpack, lz4, request, axios, args})


const baseURL = 'http://localhost:3000'
const path = arg[0] ? `/${arg[0]}` : '/msgpack'

console.log(`[@@@][GW-WS] LZ4 testing, GET - ${baseURL + path}`)
DEBUG && console.debug({lz4, apisauce, api})    

axios
  .get(baseURL + path, {
    responseType: 'arraybuffer', // stream, arraybuffer; browser only - blob
    headers: {
      'Accept': 'application/msgpack'
    }
  })
  .then((res) => {
    let { data: rawData } = res
    
    // @@@ debug
    var uint8Array = new Uint8Array(rawData);
    // let theCase = 'msgpack'
    let theCase = 'msgpack-lz4'
    console.log(`[@@@][GW-WS] RESULT (${rawData.byteLength} bytes)`, {uint8Array, rawData})

    switch (theCase) { // string, object-lz4, msgpack
      case 'msgpack':
        console.log(`[@@@][GW-WS] Start of processing msgpck raw data - in one step`, { rawData, uint8Array })
        console.log(`[@@@][GW-WS] Unpack msg rawData`, { d: msgpack.decode(uint8Array), res })
        break
      case 'msgpack-lz4':
        console.log(`[@@@][GW-WS] Start of processing msg+lz4 raw data - in two steps`, { rawData, uint8Array })
        let d1 = lz4.decompress(uint8Array)
        console.log(`[@@@][GW-WS] (1/2) Decompress lz4 from msg+lz4 raw data`, { d1, rawData })
        let d2 = msgpack.decode(d1)
        console.log(`[@@@][GW-WS] (2/2) Unpack msgpack from msg+lz4 raw data`, d2)
        break
      case 'string':
        console.log(`[@@@][GW-WS] LZ4 decompress string`, { d: lz4.decompress(rawData), rawData })
        break
    }
  })
  .catch((e) => console.error(`[@@@][GW-WS] Error`, e))