
//reverse string using inbuilt functions
function reverseStringInbuilt() {
    var inputElement = document.getElementById("String");
    var reversedStringElement = document.getElementById("reversedString");

    var str = inputElement.value;
    var reversedStr = str.split('').reverse().join('');

    reversedStringElement.textContent = reversedStr;
}

//for replacing string 
function performReplacement() {
    const originalString = document.getElementById('originalString').value;
    const replaceString = document.getElementById('replaceString').value;
    const replacementString = document.getElementById('replacementString').value;

    const replacedString = originalString.replace(replaceString, replacementString);
    document.getElementById('replacedString').textContent = replacedString;
}

function performReplaceAll() {
    const originalString = document.getElementById('originalString').value;
    const replaceString = document.getElementById('replaceString').value;
    const replacementString = document.getElementById('replacementString').value;

    const replacedString = originalString.replaceAll(replaceString, replacementString);
    document.getElementById('replacedString').textContent = replacedString;
}

//pallindrome checker
function checkPalindrome() {
    const inputString = document.getElementById('inputString').value;
    const cleanedString = inputString.toLowerCase().replace(/[^a-zA-Z0-9]/g, ''); // Remove non-alphanumeric characters

    const reversedString = cleanedString.split('').reverse().join('');

    if (cleanedString === reversedString) {
        document.getElementById('palindromeResult').textContent = 'Yes, it is a palindrome!';
    } else {
        document.getElementById('palindromeResult').textContent = 'No, it is not a palindrome.';
    }
}