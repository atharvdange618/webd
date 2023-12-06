const text = 'Contact us at email@example.com or info@example.org for more information.';
const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const extractedEmails = text.match(emailRegex);
console.log(extractedEmails);

var pattern = /*RegExp("http", "i");*/ /http/i
console.log(pattern.test("HTTP://WWW.GOOGLE.ORG")); //true
//test is the most basic method in RegExp , which is a boolean method
//that returns true if pattern exists in searched string and false if not

console.log(/http/i.test("HTTP://WWW.GOOGLE.ORG")); //true
//this is possible due to js's automatic type conversion
//we can call regex methods on regex literals

//position indicators
// ^(beginning) and $(end)
console.log(/^http/.test("Protocol is http")); //false
console.log(/http$/.test("Protocol is http")); //true
console.log(/^http$/.test("Protocol is http")); //only matches http hence false

//escape codes
console.log(/http:\/\/www.\google.\org/i.test("HTTP://WWW.GOOGLE.ORG")); //this pattern matches the whole site address //true

//repetition quantfiers
console.log(/ab*/.test("abbabababab")); //true (* means b should be repeated zero or more times)
console.log(/ab*c/.test("ac")); //true (as b is zero times repeated so this string returns true too)
console.log(/ab+c/.test("ac")); //false (+ means at least one or more times)
console.log(/ab?c/.test("abbc")); //false (? means zero or one time but no more)
console.log(/ab{5}c/.test("abbbbbc")); //true ({} means how many number of repetitions is allowed)
console.log(/ab{5,7}c/.test("abbbbbbbbc")); //false (exceeds the max range i.e 7)

//grouping
let regex = /(ab)+/;
console.log(regex.test("ababab")); // Output: true
console.log(regex.test("acde")); // Output: false

//character classes
//allows to match any characters from the class ([...]), they are considered as a single units like parathesized groups
var pat2 = /[pbm]ill/; //read as p or b or m followed by ill 
console.log(pat2.test("pill")); //true
console.log(pat2.test("billiards")); //true
console.log(pat2.test("paper mill")); //true
console.log(pat2.test("chill")); //ill not followed by p or b or m

//to match a range of values you can use dash - 
var patt3 = /[0-9]/;
console.log(patt3.test(12341235)); //true

//to match lowercase patterns
var lowercase = /[a-z]/;
console.log(lowercase.test("QWER")); //false

//to match alphanumeric patterns we use contigious character sequence
var alphanumeric = /[a-zA-z0-9]/;

//finally we can write our phone number validation pattern using such sequences
function isPhoneNumber(phone) {
    let pattern = /^\d{10}$/;
    return pattern.test(phone.toString()); // Convert to string before testing
}

console.log(isPhoneNumber(81490119560)); //false

function isUsername(username) {
    let pattern = /^[a-z][a-z0-9._-]*/i;
    return pattern.test(username);
}

console.log(isUsername("atharvdange._")); //true


//negative class are very useful when you want some characters to be not present
//you can define them by placinga caret ^ at the start of the pattern
var negative = /[^a-zA-z]/ //this pattern will match only non alphabetic patterns

//exec method
let text2 = "The quick brown fox jumps over the lazy dog";
let pattern4 = /quick (\w+) fox/;

let result = pattern4.exec(text2);

console.log(result); // Output: ["quick brown fox", "brown"]

//lookahead positive
//Matches apple only if apple is followed by banana
//Syntax: x(?=y)
const text3 = 'apple orange banana';
const regex2 = /apple(?=\sorange)/;
console.log(text3.match(regex2)); // Output: ['apple']

//lookahead negative
//Matches apple only if apple is not followed by banana
//Syntax: x(?!y)
const text4 = 'apple banana orange';
const regex3 = /apple(?!.*banana)/;
console.log(text4.match(regex3)); // Output: null

//lookbehind positive
//Matches apple only if apple is preceded by orange
//Syntax: (?<=y)x
const text5 = 'orange apple banana';
const regex4 = /(?<=orange\s)apple/;
console.log(text5.match(regex4)); // Output: ['apple']

//lookbehind positive
//Matches orange only if orange is not preceded by apple.
//Syntax: (?<!y)x
const text6 = 'apple orange banana';
const regex5 = /(?<!apple\s)orange/;
console.log(text6.match(regex5)); // Output: null

//search method
const text7 = 'Hello World';
const regex6 = /W/;
console.log(text7.search(regex6)); // Output: 6

//match method
const text8 = 'The cat and the hat';
const regex7 = /at/g;
console.log(text8.match(regex7)); // Output: [ 'at', 'at' ]

//replace
const text9 = 'The red car and the blue car';
const regex8 = /red|blue/g;
const newText = text9.replace(regex8, 'green');
console.log(newText); // Output: 'The green car and the green car'

//split
const text10 = 'apple,orange,banana';
const regex9 = /,/;
const newArray = text10.split(regex9);
console.log(newArray); // Output: [ 'apple', 'orange', 'banana' ]