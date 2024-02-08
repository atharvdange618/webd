function moveZeros(nums) {
    let index = 0;

    //move all non zero elements to the front of the array
    for (const num of nums) {
        if (num !== 0) {
            nums[index++] = num;
        }
    }

    //fill the rest of the space with zeros
    while (index < nums.length) {
        nums[index++] = 0;
    }

    return nums;
}

console.log(moveZeros([1, 0, 2, 0, 4, 2, 89, 5]));