/*

//basic understanding of data types and operations
age
23
typeof age
'number'
a = 10
10
b = 34
34
a * b
340
a - b
-24
a + b
44
a / b
0.29411764705882354
10 * 9
90
2 ** 3
8
2 % 2
0
10 % 2
0
sum = a + b
44
diff = a - b
-24
multi = a * b
340
div = a / b
0.29411764705882354
modulo = a % b
10
a
10
b
34
modulo = b % a
4
power = a ** b
1.0000000000000001e+34
power = b ** a
2064377754059776
9 % 2
1
10 % 2 == 0
true
11 % 2 == 0
false
0 / 0
NaN
typeof NaN
'number'
(2+1) * 3
9
3 / 1 + 2 ** 2
7
4 + 1 * 6 /2 
7
age
23
age + 2
25
undefined
let hindi = 80;
let eng = 90;
let math = 100;
let avg = ( hindi + math + eng)/3;
undefined
age = age + 2
25
age
25
eng
90
math
100
let avg = ( hindi + math + eng) / 3;
undefined
avg
90

//operators learned 
let age = 10
undefined
let newage = ++age
undefined
age
11
newage
11
newage = age++
11
age
12
newage
11
let a = 5
undefined
a++
5
a
6
++a
7
a
7

//boolean ans string learned
let age = 13;
undefined
let isAdult = false
undefined
isAdult
false
age = 23;
23
isAdult = true;
true
isAdult
true
typeof isAdult
'boolean'
isAdult = 'True'
'True'
typeof isAdult
'string'
let a = 5;
undefined
typeof a
'number'
a = "atharv"
'atharv'
typeof a
'string'

//string indices
let name = "Tony Stark"
undefined
name
'Tony Stark'
name[0]
'T'
name[5]
'S'
name[9]
'k'
name.le
undefined
name.length
10
typeof name.length
'number'
name[name.length-1]
'k'
name[name.length-4]
't'
"atharv".length
6
"atharv"[3]
'a'
"atharv" + " " + "dange"
'atharv dange'
"atharv" + 1
'atharv1'
"atharv" - 1
NaN
"atharv" - "dange"
NaN
1 - "atharv"
NaN

null and undefined learnt
let name
undefined
name
undefined
typeof name
'undefined'
name = "atharv dange"
'atharv dange'
name.length
12
let firstName = "atharv"
undefined
firstName[0]
'a'
firstName.length
6
firstName[5]
'v'
firstName[firstName.length-1]
'v'
"atharv"+123
'atharv123'
let emptyString = " "
undefined
emptyString.len
undefined
emptyString.length
1
let emptyString = ""
undefined
emptyString.length
0

*/

let square = (a) => {
    return a * a;
}

let sum_of_squares = () => {
    let z = square(4) + square(5);
    console.log(z);
}

sum_of_squares();


// Function to add two objects and display the result
function addObjects(obj1, obj2) {
    let result = {};

    for (let key in obj1) {
        if (typeof obj1[key] === 'number' && typeof obj2[key] === 'number') {
            result[key] = obj1[key] + obj2[key];
        } else {
            result[key] = obj1[key];
        }
    }

    for (let key in obj2) {
        if (!obj1.hasOwnProperty(key)) {
            result[key] = obj2[key];
        }
    }

    console.log(result);
}

// Example objects
let objA = { a: 5 };
let objB = { a: 15 };

// Call addObjects function to perform addition of objects
addObjects(objA, objB);

// Function that receives parameters and returns a value
function add(a, b) {
    return a + b;
}

// Function that calls another function and uses its returned value
function performAddition() {
    let x = 5;
    let y = 10;

    // Call the 'add' function and pass 'x' and 'y' as arguments
    let result = add(x, y);

    // Return the result from 'add' function
    return result;
}

// Call the 'performAddition' function and get the result
let sum = performAddition();

// Display the result obtained from 'add' function
console.log("Sum:", sum); // Output: Sum: 15

// Function to append an object to an array
function appendToObjectArray(obj, arr) {
    arr.push(obj);
}

// Function to check if an object is an array
function checkIfArray(obj) {
    return Array.isArray(obj);
}

// Example object and array
let myObject = { name: 'John', age: 25 };
let myArray = [1, 2, 3];

// Appending an object to the array
appendToObjectArray(myObject, myArray);

// Checking if objects are arrays
console.log("Is myObject an array?", checkIfArray(myObject)); // Output: Is myObject an array? false
console.log("Is myArray an array?", checkIfArray(myArray));   // Output: Is myArray an array? true