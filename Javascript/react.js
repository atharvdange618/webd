const cl = console.log.bind(console)

//copying correctly (immutable vs mutable)
var state = [1, 2, 3, 4]
var copy = state //wrong way to copy state
var copyState = [...state] //write way to copy state
cl("State: " + state)
copyState.pop()
cl("State: " + state)

//object and array destructuring
var obj = { name: "Atharv", age: 25 }
cl(obj.name) //inefficient way to do it
const { name } = obj //efficient way to do it
cl(name)

//same with array destructuring
var arr = [12, function () { }, 34]
const [first, , third] = arr //way to do array destructuring
cl(first)
cl(third)