// Convert Celsius to Fahrenheit using arrow function
const cToF = (celsius) => {
    const cTemp = celsius;
    const cToFahr = cTemp * 9 / 5 + 32;
    const message = `${cTemp}\xB0C is ${cToFahr} \xB0F.`;
    console.log(message);
};

// Convert Fahrenheit to Celsius using arrow function
const fToC = (fahrenheit) => {
    const fTemp = fahrenheit;
    const fToCel = (fTemp - 32) * 5 / 9;
    const message = `${fTemp}\xB0F is ${fToCel} \xB0C.`;
    console.log(message);
};

// Example usage
cToF(60);
fToC(45);
