let a = [1,76,90,3.7]
let no = 1

function line() {
	console.log("\n")
}

function print(title,arr=null,doCount=false) {
	let sNo= (no == 1 ? '' : '   ')
	if (doCount) {
		sNo=`[${no}]`
		no++
	}
	console.log(`${sNo} ${title}:`)
	console.log(` `.padEnd(20,' '),arr)
	line()
}

// execute
line()
print(`Init`,a)

let b = a.map((item) => item/2)
print(`Array.map()`,a,true)
print(`Result returned`,b)

let c = a.forEach((item) => item/2)
print(`Array.forEach()`,a,true)
print(`Result returned`,c)

line()