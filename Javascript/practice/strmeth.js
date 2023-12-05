let str = "Hello, World!";

// 1. Length of a string
console.log("Length of the string:", str.length);

// 2. Accessing individual characters
console.log("Character at index 0:", str.charAt(0)); // Accessing character at index 0
console.log("Character at index 7:", str[7]); // Accessing character at index 7

// 3. Substring extraction
console.log("Substring from index 1 to 4:", str.substring(1, 5)); // Extracting substring from index 1 to 4

// 4. Substring extraction with substr
console.log("Substring from index 1 to end:", str.substr(1)); // Extracting substring from index 1 to end
console.log("Substring from index 1 with length 5:", str.substr(1, 5)); // Extracting substring from index 1 with length 5

// 5. Finding index of a specific character/substring
console.log("Index of 'World':", str.indexOf("World")); // Finding the index of 'World'

// 6. Changing case
console.log("Uppercase:", str.toUpperCase()); // Convert to uppercase
console.log("Lowercase:", str.toLowerCase()); // Convert to lowercase

// 7. Replacing a substring
console.log("Replacing 'World' with 'Universe':", str.replace("World", "Universe")); // Replace 'World' with 'Universe'

// 8. Splitting a string into an array
console.log("Splitting the string by comma:", str.split(",")); // Splitting the string by comma

// 9. Trimming whitespace
let whitespaceStr = "    Trim this string    ";
console.log("Original string:", whitespaceStr);
console.log("Trimmed string:", whitespaceStr.trim()); // Trim whitespace from the string

// 10. Checking if a string includes a substring
console.log("Does the string include 'Hello'?", str.includes("Hello")); // Checking if the string includes 'Hello'
