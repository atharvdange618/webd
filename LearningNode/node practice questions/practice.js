const fs = require('fs');

fs.writeFileSync('./test.txt', "Hello world form vim", (err) => {
    console.log(err);
},
    console.log("file created"))

const result = fs.readFileSync('./test.txt', "utf8", (err) => {
    console.log(err)
})
console.log(result)

//reading it in the async way
fs.readFile('./test.txt', 'utf8', (err,result)=>{
	if(err){
		console,log(err)
	}else{
		console.log(result)
	}
})

//appending data

const append = fs.appendFileSync('./test.txt',"\nHello nigga")
console.log("data appended")

const cp = fs.cpSync("./test.txt", "./copy.txt")
console.log("data copied")

//fs.unlinkSync("./copy.txt")

console.log(fs.statSync("./test.txt"))
