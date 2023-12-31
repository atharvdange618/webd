console.log('Hello world')
console.log('Hello from atharv')
let a = 23
let b = 34
console.log('sum is :', a + b)

let pencilPrice = 5;
let eraserPrice = 10;
// let output = "Total price is: " + (pencilPrice + eraserPrice) + " Rupees";
let output = `Total price is: ${pencilPrice + eraserPrice}`;
console.log(output)

// let a = 10;
// console.log(a++)
// console.log(++a)

//practice question one
let trafficLight = "green";

if (trafficLight == "red") {
    console.log("Stop! Traffic light is " + trafficLight)
}
else if (trafficLight == "yellow") {
    console.log("Slow down. Traffic light is " + trafficLight);
}
else {
    console.log("Go. Traffic light is " + trafficLight);
}

//practice question two
let size = 'L';

if (size == 'M') {
    console.log("Price is Rs. 100.");
}
else if (size == 'L') {
    console.log("Price is Rs. 200");
}
else if (size == 'XL') {
    console.log("Price is Rs. 250");
}
else if (size == 'S') {
    console.log("Price is Rs. is 50");
}
else {
    console.log("Wrong size");
}

//nested if-else statements

let marks = 75;

if (marks >= 33) {
    console.log("pass");
    if (marks >= 80) {
        console.log("Grade is O")
    } else {
        console.log("Grade is A")
    }
}
else {
    console.log("better luck next time");
}

//logical operators
if (marks >= 33 && marks >= 80) {
    console.log("pass");
    console.log("A+");
}

if (marks >= 33 || marks <= 80) {
    console.log("pass");
    console.log("A+");
}

//practice question 4
/*
a good string is a string that starts with a letter a and has a length > 3. write a program to find if a string starts with a letter is good or not.
*/
let str = "ankle";
if (str.length > 3 && str[0] === "a") {
    console.log("good string");
}
else {
    console.log("bad string");
}

//practice question 4
let num = 12;
if ((num % 3 === 0) && ((num + 1 == 15) || (num - 1 == 11))) {
    console.log("safe");
}
else {
    console.log("unsafe");
}

//truthy and falsey
if (true) {
    console.log("it has true value")
} else {
    console.log("it has false value")
}

//switch statement
let day = 6;
switch (day) {
    case 1:
        console.log("Monday");
        break;
    case 2:
        console.log("Tuesday");
        break;
    case 3:
        console.log("Wednesday");
        break;
    case 4:
        console.log("Thursday");
        break;
    case 5:
        console.log("Friday");
        break;
    case 6:
        console.log("Saturday");
        break;
    case 7:
        console.log("Sunday");
        break;
    default:
        console.log("Invalid day")
        break;
}

// array
let students = ['atharv', 'kamlesh', 'ishwar'];

let mark = [60, 78, 98];

let info = ["atharv", 21, 8.31];

console.log(students[0].length);

students[2] = 'suraj';
students[10] = 'narlawar'
console.log(students);
console.log(students.length);

//array methods

let cars = ['audi', 'bmw', 'koneigsegg', 'mclaren'];

cars.push("toyota");

console.log(cars);

cars.pop();

console.log(cars);

cars.unshift('toyota');

console.log(cars);

let followers = ['suraj', 'anushree', 'parnal'];

let blocked = followers.shift();

console.log(blocked);

//practice ques
let months = ['january', 'july', 'march', 'august'];

months.shift();
months.shift();
months.unshift("june");
months.unshift("july");

console.log(months);

//indexOf and includes
cars
//(5) ['toyota', 'audi', 'bmw', 'koneigsegg', 'mclaren']
cars.indexOf('bmw');
//2
cars.indexOf('xuv');
//-1
mark
//(3) [60, 78, 98]
mark.indexOf(98);
//2
cars.includes('xuv')
//false

//concat, reverse and slice
let primary = ['red', 'blue', 'green'];

let secondary = ['yellow', 'orange', 'violet'];

primary.concat(secondary);
//(6) ['red', 'blue', 'green', 'yellow', 'orange', 'violet']

primary
//(3) ['red', 'blue', 'green']

secondary
//(3) ['yellow', 'orange', 'violet']

let allColors = primary.concat(secondary);

allColors
//(6) ['red', 'blue', 'green', 'yellow', 'orange', 'violet']

cars
//(5) ['toyota', 'audi', 'bmw', 'koneigsegg', 'mclaren']

cars.reverse();
//(5) ['mclaren', 'koneigsegg', 'bmw', 'audi', 'toyota']

cars
//(5) ['mclaren', 'koneigsegg', 'bmw', 'audi', 'toyota']

cars.slice();
//(5) ['mclaren', 'koneigsegg', 'bmw', 'audi', 'toyota']

cars.slice(2, 3);
//['bmw']

cars.slice(3);
//(2) ['audi', 'toyota']

cars.slice(-3);
//(3) ['bmw', 'audi', 'toyota']

//splice method
allColors
//(6) ['red', 'blue', 'green', 'yellow', 'orange', 'violet']

allColors.splice(4);
//(2) ['orange', 'violet']

allColors
//(4) ['red', 'blue', 'green', 'yellow']

allColors.splice(0, 1);
//['red']

allColors
//(3) ['blue', 'green', 'yellow']

allColors.splice(0, 1, 'black', 'gray');
//['blue']

allColors
//(4) ['black', 'gray', 'green', 'yellow']

allColors.push('red');
//5

allColors.push('blue');
//6

allColors
//(6) ['black', 'gray', 'green', 'yellow', 'red', 'blue']

cars
//(5) ['mclaren', 'koneigsegg', 'bmw', 'audi', 'toyota']

cars.splice(0, 0, 'xuv', 'maruti');
//[]

cars
//(7) ['xuv', 'maruti', 'mclaren', 'koneigsegg', 'bmw', 'audi', 'toyota']

cars.splice(1, 0, 'mercedes');
//[]

cars
//(8) ['xuv', 'mercedes', 'maruti', 'mclaren', 'koneigsegg', 'bmw', 'audi', 'toyota']

cars.splice(1, 1, 'gwagon');
//['mercedes']

cars
//(8) ['xuv', 'gwagon', 'maruti', 'mclaren', 'koneigsegg', 'bmw', 'audi', 'toyota']

//sort method

cars.sort();
//(8) ['audi', 'bmw', 'gwagon', 'koneigsegg', 'maruti', 'mclaren', 'toyota', 'xuv']0: "audi"1: "bmw"2: "gwagon"3: "koneigsegg"4: "maruti"5: "mclaren"6: "toyota"7: "xuv"length: 8[[Prototype]]: Array(0)

mark
//(3) [60, 78, 98]

mark.push(108)
//4

mark
//(4) [60, 78, 98, 108]

mark.unshift(111)
//5

mark
//(5)[111, 60, 78, 98, 108]

mark.sort()
//(5)[108, 111, 60, 78, 98]

//practice question
months
//(4)['july', 'june', 'march', 'august']

months = ['january', 'july', 'march', 'august'];
//(4)['january', 'july', 'march', 'august']

months.splice(1, 1, 'june')
//['july']

months.splice(0, 1, 'july')
//['january']

months
//(4)['july', 'june', 'march', 'august']

let lang = ['c', 'c++', 'html', 'javascript', 'python', 'java', 'c#', 'sql'];

lang.reverse().indexOf('javascript');
//4

//array references
let arr = ['a', 'b'];

let arrCopy = arr;

arrCopy
//(2) ['a', 'b']

arrCopy.push('c');
//3

arr
//(3) ['a', 'b', 'c']

arr == arrCopy
//true

arr === arrCopy
//true

//const arrays
const arr1 = [1, 2, 3];

arr1
//(3) [1, 2, 3]

arr1.push(4)
//4

arr1
//(4) [1, 2, 3, 4]

arr1.pop()
//4
arr1
//(3) [1, 2, 3]

//arr1 = [1, 2, 3];
//TypeError: Assignment to constant variable.

//nested/multidimensional arrays
let nums = [[1, 2], [3, 4], [5, 6]];

nums
//(3) [Array(2), Array(2), Array(2)]
nums.length
//3

nums[0]
//(2) [1, 2]

nums[0].length
//2

nums[0][0]
//1

//tic tac toe game state in array
let tic_tac_toe = [[1, null, 0], [null, 1, null], [0, null, 1]];
console.log(tic_tac_toe);

//practice question
let exp = [7, 9, 0, -2];
undefined

exp.slice(0, 3)
//    (3)[7, 9, 0]

let n = 3;
//undefined

exp.slice(0, n);
//(3)[7, 9, 0]

n = 4;
//undefined

exp.slice(0, n);
//(4)[7, 9, 0, -2]

exp.slice(exp.length - n);
//(4)[7, 9, 0, -2]

n = 3;
//undefined

exp.slice(exp.length - n);
//(3)[9, 0, -2]


//let string = prompt("please enter a string");
// if (string == '') { //or str.length == 0
//     console.log('string is blank');
// } else {
//     console.log('string is not blank');
// }

str = 'ApNaCoLlEgE';
let idx = 2;
if (str[idx] == str[idx].toLowerCase()) {
    console.log('character is lowercase');
} else {
    console.log('character is not lowercase');
}

// console.log(string.trim());

let item = 'c';
if (arr.indexOf(item) != -1) {
    console.log('element exists');
}
else {
    console.log('element does not exist');
}

//practice loops
for (let i = 1; i <= 15; i = i + 2) {
    console.log(i);
}

for (let i = 2; i <= 20; i = i + 2) {
    console.log(i);
}

for (let i = 5; i <= 50; i = i + 5) {
    console.log(i);
}

// let num1 = prompt("write your number");
// num1 = parseInt(num1);
// for (let i = num1; i <= num1 * 10; i = i + num1) {
//     console.log(i);
// }

//nested for loop
for (let i = 1; i <= 3; i++) {
    console.log(`outer loop ${i}`)
    for (let j = 1; j <= 3; j++) {
        console.log(j);
    }
}

//while loop
let x = 0;
// while (x <= 10) {
//     console.log(x)
//     x++;
// }

//break keyword
while (x <= 5) {
    if (x == 3) {
        break;
    }
    console.log(x)
    x++;
}
console.log("we used break at 3");

//loops with arrays
let fruits = ['apple', 'orange', 'kiwi', 'banana', 'litchi'];
fruits.unshift("mosambi");
fruits.push('pineapple');
for (let index = 0; index < fruits.length; index++) {
    console.log(index, fruits[index]);
}

//nested loops in arrays
let heroes = [['ironman', 'spiderman', 'thor'], ['superman', 'wonder woman', 'flash']];

for (let i = 0; i < heroes.length; i++) {
    console.log(`List ${i}`);
    for (let j = 0; j < heroes[i].length; j++) {
        console.log(heroes[i][j]);
    }
}

let student = [['Atharv', 98], ['Tanu', 96], ['Kamlesh', 93]];
for (let i = 0; i < student.length; i++) {
    console.log(`Info of student #${i}`);
    for (let j = 0; j < student[i].length; j++) {
        console.log(student[i][j]);
    }
}

//for of loop
for (let fruit of fruits) {
    console.log(fruit);
}

for (let char of "Atharv Dange") {
    console.log(char)
}

for (let list of heroes) {
    for (let name of list) {
        console.log(name);
    }
}

//array spread operator
//it allows an iterable such as an array or string to be expanded in places where zero or more argumnets are expected
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let maximum = Math.max(...numbers);
console.log(maximum);

//works with strings also
let string = "Atharv Dange";
console.log(...string);

//it is helpful while merging arrays
let class1 = ["ben", "allen", "kevin"];
let class2 = ["atharv", "bumblebee", "johnny"];

class1.push(...class2);
console.log(class1);

//rest parameters
//represents an indefinite number of parameters(packs argument into an array)
function sum(...numbers) {
    let total = 0;
    for (let number of numbers) {
        total += number;
    }
    return total;
}

console.log(sum(1, 2, 3, 4, 5));

//map method
//executes a provided callback func once for each array element and creates a new array
let squares = numbers.map(square);
print(squares);
function square(element) {
    return Math.pow(element, 2);
}

function print(output) {
    console.log(output);
}

//filter method
//creates a new array with all elements that pass the test provided by a function
let ages = [16, 18, 23, 17, 56, 19];
let adults = ages.filter(checkAge);
print(adults);

function checkAge(element) {
    return element >= 18;
}

//reduce method
//reduces an array to a single value
let prices = [5, 12, 56, 78, 23, 34, 57];
let total = prices.reduce(checkOut);
print(total);

function checkOut(total, element) {
    return total + element;
}

//sorting array in ascending and descending order
let grades = [90, 50, 60, 34, 23, 98];
let descendingSort = (x, y) => {
    return y - x;
}

let ascendingSort = (x, y) => {
    return x - y;
}
grades.sort(descendingSort);
grades.forEach(print);
console.log("\n");
grades.sort(ascendingSort);
grades.forEach(print);

//object literals 
//how to create them
const student2 = {
    name: "atharv",
    age: 21,
    marks: 98
};
//different ways to access them
console.log(student2);
console.log(student2.name)
console.log(student2["name"]);

//way to manipulate them using a new obj ref
const newName = new Object(student2);
newName.name = "maithili";
console.log(newName);

//way to add new value
student2.gender = "male";
console.log(student2);

//way to delete them 
delete student2.gender;
console.log(student2);

//objects of objects
const classInfo = {
    atharv: {
        grade: "A",
        city: "Pune"
    },

    maithili: {
        grade: "A+",
        city: "Daund"
    }
}

console.log(classInfo);
console.log(classInfo.atharv);

//array of objects
var class3 = [
    {
        name: "atharv",
        age: 21
    },
    {
        name: "shraddha",
        age: 25
    }
]

console.log(class3[0].name);

const cl = console.log.bind(console);
cl("hello");

//this exp
const student3 = {
    name: "atharv",
    eng: 96,
    maths: 96,
    science: 98,
    getAvg() {
        let avg = (this.eng + this.maths + this.science) / 3;
        cl(avg);
    }
}

student3.getAvg()

//arrow functions with implicit return
const mul = (a, b) => (a * b); //or this way too const mul = (a, b) => a * b;
//we use parenthesis instead of curly bracket because of syntax change
cl(mul(3, 4));

//setTimeout function
cl("hi there!");
// setTimeout(() => {
//     cl("apna college");
// }, 1000);

cl("welcome to");

//set interval function
let func1 = setInterval(() => {
    cl("hello world");
}, 2000);

let func2 = setInterval(() => {
    cl("fuck you bitches");
}, 3000);

clearInterval(func1)
clearInterval(func2)

const student4 = {
    name: "atharv",
    marks: 86,
    getName: function () {
        console.log(this); //global
        return cl(this.name);
    },
    getMarks: () => { 
        console.log(this); //parent's scope => window
        return cl(this.marks);
    }
}

student4.getName();
student4.getMarks();
