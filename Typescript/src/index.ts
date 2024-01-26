// let age = 30;
// console.log(age);
//the code may look similar to js code there is strict type check going on in the backgorund
//we use tsc command (typescript compiler ) to compile ts code into js code

const cl = console.log.bind(console);

// declare variables
let age: number = 30;
let firstName: string = 'atharv';
let isFictional: boolean; // declare without assigning a value

// age = 'hello'; // gives a type error

// you can change them like this
age = 31;
firstName = 'maithili';
isFictional = true;

// we can also see the type of variables when we hover on them
let planet: string = 'earth';
planet = 'jupiter';

// null and undefined
let something: null = null;
let anotherThing: undefined = undefined;

console.log('Hello friend');

//arrays 
let names: string[] = ['atharv', 'maithili'];
let ages: number[] = [12, 21, 33, 24, 25];

//push new items onto the array
names.push('kamlesh');
ages.push(6);

//type inference with the arrays
let fruits = ['apples', 'pears', 'bananas', 'mangoes']

fruits.push('peaches');

const f = fruits[3];

let allfruits = fruits.map((ele) => {
    return ele;
});

console.log(allfruits);

let things = [1, true, 'hello'];
const t = things[0];

//object literals
let user: {
    firstName: string,
    age: number,
    id: number
} = {
    firstName: 'deadpool', age: 21, id: 1
}

user.firstName = 'wolverine'
user.age = 100

console.log(user);

//type inference with object literals
let person = {
    name: 'atharv',
    score: 60
}

person.name = 'maithili'

cl(person);

//functions
function reverse(str: string) {
    return str.split('').reverse().join('');
}

cl(reverse('hello'));

const addNum = (a: number, b: number) => {
    return a + b;
}

cl(addNum(30, 40));

function addAll(items: number[]) {
    return items.reduce((a, c) => a + c, 0);
}

cl(addAll([1, 2, 3, 4, 5, 5,]));

function formalGreet(name: string, greeting: string) {
    return `${greeting}, ${name}!`
}

cl(formalGreet('kamlesh', 'hello'));

//any type in ts
let student: any
//it can hold any datatype

let stuff: any[] = ['hello', 2, true, null]
stuff.push({ id: 1 });
cl(stuff);

//functions and any
function addAny(value: any): any {
    return value + value;
}

cl('hello', 2)

//tuples in ts
//it is like an array but elements are in a specific order here
let data: [string, number, boolean] = ['atharv', 21, true];
//it will give error if we don't follow the sequence

//examples
let hsla: [number, string, string, number]
hsla = [200, '100%', '50%', 1]

let xy: [number, number]
xy = [97.4, 23.2];

//named tuples
let user2: [name: string, age: number]

user2 = ['peach', 21];
cl(user2[0])

//interfaces
interface Author {
    name: string,
    title: string
}

const authorOne: Author = {
    name: 'atharv',
    title: 'hello world'
}

interface Post {
    title: string,
    body: string,
    tags: string[],
    created_at: string,
    author: Author
}

const newPost: Post = {
    title: "something new",
    body: "this is a demo body",
    tags: ['greatt', 'interesting', 'salty'],
    created_at: new Date().toString().substring(0, 10),
    author: authorOne
}

cl(authorOne);
cl(newPost);


//interfaces as function argument types
function createPost(post: Post): void {
    cl(`Created post: ${post.title} by ${post.author.name}`)
}

createPost(newPost);

//interfaces with arrays
let posts: Post[] = []
posts.push(newPost);