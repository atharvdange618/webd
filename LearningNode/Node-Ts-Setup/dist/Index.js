import fs from 'fs';
console.log("Hello World");
const addNumber = (a, b) => {
    return a + b;
};
console.log(fs.readFileSync('package.json'));
console.log(addNumber(1, 2));
