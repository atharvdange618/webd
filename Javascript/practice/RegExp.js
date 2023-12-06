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
