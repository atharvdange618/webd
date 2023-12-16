const cl = console.log.bind(console);
// cl("this is the shortcut for console");

//check if a string is an anagram of another string
const isAnagram = (str1, str2) => [...str1.toLowerCase()].sort().join('')
    === [...str2.toLowerCase()].sort().join('');

cl(isAnagram('listen', 'silent')); //true

//merge two arrays and remove duplicates
const mergeArrays = (arr1, arr2) => [new Set([...arr1, ...arr2])];
cl(mergeArrays([1, 2, 3], [3, 4, 5])); //[ Set(5) { 1, 2, 3, 4, 5 } ]

//generate an array of numbers from 1 to n
const generateArray = n => [...Array(n).keys()].map(i => i + 1);
cl(generateArray(6)); //[ 1, 2, 3, 4, 5, 6 ]

//Randomly shuffles an array
const shuffleArray = arr => arr.sort(() => Math.random() - 0.5);
cl(shuffleArray([1, 2, 3, 4, 5, 6])); //[ 4, 3, 2, 1, 5, 6 ]

//find the maximum value in an array
const maxNumber = arr => Math.max(...arr);
cl(maxNumber([26, 9, 45, 18, 37, 12])); //45

//get the current date in the format "yyyy-mm-dd"
const currenDate = () => new Date().toISOString().split("T")[0];
cl(currenDate()); //2023-12-16

//check if an object is empty
const isObjectEmpty = obj => Object.keys(obj).length === 0;
cl(isObjectEmpty({ name: "atharv" })); //false

//group an array of objects by a specific property
const groupByProperty = (arr, prop) => arr.reduce((result, obj) => {
    if (obj.hasOwnProperty(prop)) {
        result[obj[prop]] = [...result[obj[prop]] || [], obj];
    }
    return result;
}, {});

const objArray = [
    { id: 1, name: "atharv" },
    { id: 2, age: 21 },
    { id: 3, name: "kamlesh" }
];
cl(groupByProperty(objArray, 'name'));

//generate a range of numbers from start to end with a step
const range = (start, end, step) => [...Array(Math.floor((end - start) / step) + 1)].map((_, i) => start + (i * step));
cl(range(3, 55, 4));