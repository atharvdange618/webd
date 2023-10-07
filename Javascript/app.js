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

let marks = 32;

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