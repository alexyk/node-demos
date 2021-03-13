(function() {
    if ( typeof Object.id == "undefined" ) {
        var id = 0;

        Object.id = function(o) {
            if ( typeof o.__uniqueid == "undefined" ) {
                Object.defineProperty(o, "__uniqueid", {
                    value: ++id,
                    enumerable: false,
                    // This could go either way, depending on your 
                    // interpretation of what an "id" is
                    writable: false
                });
            }

            return o.__uniqueid;
        };
    }
})();

var obj = { a: 1, b: 1 };

console.log('')
console.log('')
console.log('---------------')
console.log(`obj: ${Object.id(obj)}`);
console.log(`[]: ${Object.id([])}`);
console.log(`{}: ${Object.id({})}`);
console.log(`\/.\/: ${Object.id(/./)}`);
console.log(`function: ${Object.id(function() {})}`);

for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
        console.log(`k: ${k}`);
    }
}
ala = {id2:'eee'}
bala = {id1:'eee'}
console.log(`ala: ${ala.id}`)
console.log(`bala: ${bala.id}`)
console.log('---------------')
console.log('')
console.log('')
