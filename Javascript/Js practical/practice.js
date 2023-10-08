//flow control statement if
// Prompt the user for a number
const userInput = prompt("Enter a number:");

// Convert the user input to a number
const number = parseFloat(userInput);

// Check if the number is even or odd using the "if" statement
if (isNaN(number)) {
    alert("Invalid input. Please enter a valid number.");
} else if (number % 2 === 0) {
    alert("The number is even.");
} else {
    alert("The number is odd.");
}


// Write a Java Script program to extract out the values at the specified
// indexes from a specified array

// Step 1: Define the array
const myArray = [10, 20, 30, 40, 50, 60];

// Step 2: Define the indexes
const indexes = [0, 2, 4];

// Step 3: Create an array to store extracted values
const extractedValues = [];

// Step 4: Extract values based on specified indexes
for (let i = 0; i < indexes.length; i++) {
    const index = indexes[i];
    const value = myArray[index];
    extractedValues.push(value);
}

// Step 5: Print the extracted values
console.log(extractedValues);


//Create an object in Java Script and add different properties to that object dynamically
// Creating an empty object
var myObject = {};

// Adding properties dynamically using dot notation
myObject.property1 = "Value 1";
myObject.property2 = 42;
myObject.property3 = true;

// Adding properties dynamically using square bracket notation
myObject["property4"] = ["Apple", "Banana", "Orange"];
myObject["property5"] = { key: "Value" };

// Accessing the properties
console.log(myObject.property1); // Output: Value 1
console.log(myObject.property4[0]); // Output: Apple
console.log(myObject["property5"].key); // Output: Value