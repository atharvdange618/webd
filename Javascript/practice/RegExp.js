// const text = 'Contact us at email@example.com or info@example.org for more information.';
// const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
// const extractedEmails = text.match(emailRegex);
// console.log(extractedEmails);

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