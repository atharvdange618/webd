function findDifference(nums1, nums2) {
    const set1 = new Set(nums1);
    const set2 = new Set(nums2);

    const diff1 = [];
    const diff2 = [];

    //check all elements of set2 that are not present in set1 and push them to the diff1
    for (const num of set1) {
        if (!set2.has(num)) {
            diff1.push(num);
        }
    }

    //check all elements of set1 that are not present in set2 and push them to the diff2
    for (const num of set2) {
        if (!set1.has(num)) {
            diff2.push(num);
        }
    }

    return [diff1, diff2];
}

console.log(findDifference([1, 2, 3], [3, 2, 4, 4]));
console.log(findDifference([1, 1, 2, 2,], [3, 1, 2, 2]));