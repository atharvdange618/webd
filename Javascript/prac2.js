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