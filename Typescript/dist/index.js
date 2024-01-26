"use strict";
// let age = 30;
// console.log(age);
//the code may look similar to js code there is strict type check going on in the backgorund
//we use tsc command (typescript compiler ) to compile ts code into js code
const cl = console.log.bind(console);
// declare variables
let age = 30;
let firstName = 'atharv';
let isFictional; // declare without assigning a value
// age = 'hello'; // gives a type error
// you can change them like this
age = 31;
firstName = 'maithili';
isFictional = true;
// we can also see the type of variables when we hover on them
let planet = 'earth';
planet = 'jupiter';
// null and undefined
let something = null;
let anotherThing = undefined;
console.log('Hello friend');
//arrays 
let names = ['atharv', 'maithili'];
let ages = [12, 21, 33, 24, 25];
//push new items onto the array
names.push('kamlesh');
ages.push(6);
//type inference with the arrays
let fruits = ['apples', 'pears', 'bananas', 'mangoes'];
fruits.push('peaches');
const f = fruits[3];
let allfruits = fruits.map((ele) => {
    return ele;
});
console.log(allfruits);
let things = [1, true, 'hello'];
const t = things[0];
//object literals
let user = {
    firstName: 'deadpool', age: 21, id: 1
};
user.firstName = 'wolverine';
user.age = 100;
console.log(user);
//type inference with object literals
let person = {
    name: 'atharv',
    score: 60
};
person.name = 'maithili';
cl(person);
//functions
function reverse(str) {
    return str.split('').reverse().join('');
}
cl(reverse('hello'));
const addNum = (a, b) => {
    return a + b;
};
cl(addNum(30, 40));
function addAll(items) {
    return items.reduce((a, c) => a + c, 0);
}
cl(addAll([1, 2, 3, 4, 5, 5,]));
function formalGreet(name, greeting) {
    return `${greeting}, ${name}!`;
}
cl(formalGreet('kamlesh', 'hello'));
//any type in ts
let student;
//it can hold any datatype
let stuff = ['hello', 2, true, null];
stuff.push({ id: 1 });
cl(stuff);
//functions and any
function addAny(value) {
    return value + value;
}
cl('hello', 2);
//tuples in ts
//it is like an array but elements are in a specific order here
let data = ['atharv', 21, true];
//it will give error if we don't follow the sequence
//examples
let hsla;
hsla = [200, '100%', '50%', 1];
let xy;
xy = [97.4, 23.2];
//named tuples
let user2;
user2 = ['peach', 21];
cl(user2[0]);
const authorOne = {
    name: 'atharv',
    title: 'hello world'
};
const newPost = {
    title: "something new",
    body: "this is a demo body",
    tags: ['greatt', 'interesting', 'salty'],
    created_at: new Date().toString().substring(0, 10),
    author: authorOne
};
cl(authorOne);
cl(newPost);
//interfaces as function argument types
function createPost(post) {
    cl(`Created post: ${post.title} by ${post.author.name}`);
}
createPost(newPost);
//interfaces with arrays
let posts = [];
posts.push(newPost);
//create a function that takes array as an input and returns it's first element
function getFirst(arr) {
    return arr[0];
}
cl(getFirst(['kamlesh', 'atharv', 'maithili']));
