const log1 = console.log;

console.log = (...args) => {
	log1.call()
}