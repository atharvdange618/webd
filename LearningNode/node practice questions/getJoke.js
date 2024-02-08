const axios = require('axios');

async function getJoke() {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    const data = response.data;
    const setup = data.setup;
    const punchline = data.punchline;
    return console.log(setup + " " + punchline);
}

getJoke();