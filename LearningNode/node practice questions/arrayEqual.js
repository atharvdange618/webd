const arrayStringsAreEqual = function (word1, word2) {
    let arr1 = [];
    let arr2 = [];

    for (a of word1) {
        arr1 += a;
    }

    for (b of word2) {
        arr2 += b;
    }

    return arr1 === arr2
}

const word1 = ["ab", "c"];
const word2 = ["a", "bc"];

console.log(arrayStringsAreEqual(word1, word2));
