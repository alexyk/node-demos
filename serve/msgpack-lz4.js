var lz4 = require("lz4js")
var msgpack = require("msgpack")
var fs = require("fs")

const src = 'serve/info.json'
const dstMsg = 'serve/info.msg'
const dstLz4 = 'serve/info.lz4s'
const dstLz4Msg = 'serve/info.lz4msg'

const data = fs.readFileSync(src)
// Compress 128 bytes of zero
var compressed = lz4.compress(new Array(128)) 
// Decompress
var decompressed = lz4.decompress(compressed)

// MsgPack
const packed = Buffer.from(msgpack.pack(data))
fs.writeFileSync(dstMsg, packed)
 
// Compress info.json
compressed = Buffer.from(lz4.compress(data))
fs.writeFileSync(dstLz4, compressed)

// Pack and compress info.json
compressed = Buffer.from(lz4.compress(msgpack.pack(data)))
fs.writeFileSync(dstLz4Msg, compressed)

