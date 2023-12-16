var randomUser = fetch('https://randomuser.me/api/');
randomUser
    .then(async function (response) {
        var user = await response.json();
        console.log(user);
    })
    .catch(function (error) {
        console.log('Error:', error);
    });
