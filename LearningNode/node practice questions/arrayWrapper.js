class ArrayWrapper {
    //create a constructor to get the array
    constructor(array) {
        this.array = array;
    }

    //create a function to add both arrays
    valueOf() {
        return this.array.reduce((sum, current) => sum + current, 0);
    }

    //create a function to print the arrays in comma separated form
    toString() {
        return '[' + this.array.join(',') + ']';
    }
}

const arr1 = new ArrayWrapper([1, 2, 3]);
const arr2 = new ArrayWrapper([4, 5, 6]);

//invokes the valueOf function
const sum = arr1 + arr2;
console.log(sum);

//invokes the toString function 
console.log(String(arr1));
console.log(String(arr2));