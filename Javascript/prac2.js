// Write a JS program to delete all occurrences of element ‘num’ in a given array
let arr = [1, 2, 3, 4, 5, 6, 2, 3];
let num = 2;

// Loop through the array
for (let i = 0; i < arr.length; i++) {
    // Check if the current element matches 'num'
    if (arr[i] == num) {
        // Remove the matching element from the array
        arr.splice(i, 1);
        // Adjust index to account for the removed element
        i--;
    }
}
console.log(arr); // Output the modified array without 'num' occurrences

// Write a JS program to find the no of digits in a number
let number = 287152;
let copy = number;
let count = 0;

// Count the number of digits in the given number
while (copy > 0) {
    count++;
    copy = Math.floor(copy / 10); // Remove the last digit
}
console.log(`no of digits in the number is ${count}`); // Output the count of digits

// Write a JS program to find the sum of digits in a number
let sum = 0;
let dupe = number;

// Calculate the sum of digits in the given number
while (dupe > 0) {
    let digit = dupe % 10; // Extract the last digit
    sum += digit; // Add the extracted digit to the sum
    dupe = Math.floor(dupe / 10); // Remove the last digit
}
console.log(`sum of digits in the number is ${sum}`); // Output the sum of digits

// Print the factorial of a number n.
let n = 5;
let factorial = 1;

// Calculate the factorial of the given number
for (let i = 1; i <= n; i++) {
    factorial *= i; // Multiply each number from 1 to n to calculate factorial
}
console.log(`factorial of ${n} is ${factorial}`); // Output the factorial

// Find the largest number in an array with only positive numbers
let arr2 = [2, 5, 10, 4, 2, 7, 1, 9];
let largest = 0;

// Iterate through the array to find the largest positive number
for (let i = 0; i < arr2.length; i++) {
    if (largest < arr2[i]) {
        largest = arr2[i]; // Update 'largest' if a larger number is found
    }
}
console.log(largest); // Output the largest number in the array

//Create a program that generates a random number representing a dice roll.
//[The number should be between 1 and 6]
const cl = console.log.bind(console);

let random = Math.floor(Math.random() * 6) + 1;
cl("dice roll: " + random);

/*
Create an object representing a car that stores the following properties for the
car: name, model, color.
Print the car’s name
*/
const car = {
    name: "Honda",
    model: "i10",
    color: "silver"
};
cl(car.name);

/*
Create an object Person with their name, age and city.
Edit their city’s original value to change it to “New York”.
Add a new property country and set it to the United States
*/

const person = {
    name: "atharv",
    age: 21,
    city: "ohio"
};
person.city = "New York";
person.country = "United States";
cl(person);


//higher order functions
//as a function that takes other function as an arg
let greet = () => {
    cl("Hello");
}

let multipleGreet = (func, count) => {
    for (let i = 0; i < count; i++) {
        func();
    }
}

multipleGreet(greet, 3);


//as a function that returns the other function
let oddOrEvenTest = (request) => {
    if (request == "odd") {
        let odd = (n) => {
            cl(!(n % 2 == 0));
        }

        return odd;
    } else if (request == "even") {
        let even = (n) => {
            cl(n % 2 == 0);
        }

        return even;
    }
    else {
        cl("wrong request");
    }
}

let request = "even";
let func = oddOrEvenTest(request);
func(3);
func(10);

//methods
const calculator = {
    add: function (a, b) {
        return a + b;
    },

    sub: function (a, b) {
        return a - b;
    },

    mul(a, b) {
        return a * b; //shorthand
    },

    div: function (a, b) {
        return a / b;
    }
}

cl(calculator)
cl(calculator.mul(3, 4));

//practice questions
//Write a JavaScript function that returns array elements larger than a number
let arr3 = [8, 9, 10, 1, 2, 3, 4, 5, 6, 7];
let num1 = 6;

let getElements = (arr, num) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > num1) {
            cl(arr[i]);
        }
    }
}

getElements(arr3, num1);

//Write a JavaScript function to extract unique characters from a string.
//Example: str = “abcdabcdefgggh” ans = “abcdefgh”
let str = "abcdabcdefgggh";

let uniqueChar = (str) => {
    const extractChars = {};
    for (let char of str) {
        extractChars[char] = true;
    }

    return Object.keys(extractChars);
}

cl(uniqueChar(str));

let id = setInterval(() => {
    cl("hello world");
}, 2000);

setTimeout(() => {
    clearInterval(id);
}, 10000);

