// var ans = new Promise((res, rej) => {
//     if (true) {
//         return res();
//     }
//     else {
//         return rej();
//     }
// });

// ans
//     .then(function () {
//         console.log("resolve ho gaya hai");
//     })
//     .catch(function () {
//         console.log("reject ho gaya");
//     });

// //if number is below 5 then below and if is greater then above

// var num = new Promise((res, rej) => {
//     var n = Math.floor(Math.random() * 10);
//     if (n < 5) {
//         return res();
//     }
//     else {
//         return rej();
//     };
// })

// num
//     .then(function () {
//         console.log("below");
//     })
//     .catch(function () {
//         console.log("above");
//     })

//promise chaining
var p1 = new Promise((res, rej) => {
    return res("sabse pehle ghar aao");
})

var p2 = p1.then(function (data) {
    console.log(data);
    return new Promise((res, rej) => {
        return res("gate khelo aur gate lagao");
    })
})

var p3 = p2.then(function (data) {
    console.log(data);
    return new Promise((res, rej) => {
        return res("khana pakao, khana khao");
    })
})

var p4 = p3.then(function (data) {
    console.log(data);
    return new Promise((res, rej) => {
        return res("Incognito mode chalu karo");
    })
})

var p5 = p4.then(function (data) {
    console.log(data);
    return new Promise((res, rej) => {
        return res("Soo jao tum thak gaye hoo");
    })
})

var result = p5.then(function (data) {
    console.log(data);
})