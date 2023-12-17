var randomUser = fetch('https://randomuser.me/api/');
randomUser
    .then(async function (response) {
        var user = await response.json();
        console.log(user);
    })
    .catch(function (error) {
        console.log('Error:', error);
    });

fetch("https://restcountries.com/v3.1/all").then(response => response.json())
    .then(data => {
        console.log(data);
    })