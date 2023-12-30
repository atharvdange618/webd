let leapTest = (year) => {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return "It is a leap year";
    } else {
        return "Not a leap year";
    }
}

console.log(leapTest(2016));