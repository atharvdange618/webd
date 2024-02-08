function singleNum(nums) {
    let result = 0;

    //perform XOR operation(numbers that are equal to each other will cancel each other out and numbers who are not , will remain)
    for (let num of nums) {
        result ^= num;
    }

    return result;
}

console.log(singleNum([1]));
console.log(singleNum([4, 1, 2, 1, 2]));
console.log(singleNum([2, 2, 1])); 