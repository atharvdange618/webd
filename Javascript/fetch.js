// var randomUser = fetch('https://randomuser.me/api/');
// randomUser
//     .then(async function (response) {
//         var user = await response.json();
//         console.log(user);
//     })
//     .catch(function (error) {
//         console.log('Error:', error);
//     });

// fetch("https://restcountries.com/v3.1/all").then(response => response.json())
//     .then(data => {
//         console.log(data);
//     })

let catfact = fetch("https://catfact.ninja/fact");
catfact.then(async (response) => {
    var fact = await response.json();
    console.log(fact.fact)
})

let boredacc = fetch("https://www.boredapi.com/api/activity");
boredacc.then(async (response) => {
    var activity = await response.json();
    console.log(activity.activity + ': ' + activity.type);
})

let dogpic = fetch("https://dog.ceo/api/breeds/image/random");
dogpic.then(async (response) => {
    let pic = await response.json();
    console.log(pic.message);
})