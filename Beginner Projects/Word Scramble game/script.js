// Array of words with their corresponding hints

let words = [
    // Each object represents a word and its hint
    {
        word: "addition",
        hint: "The process of adding numbers"
    },
    {
        word: "meeting",
        hint: "Event in which people come together"
    },
    {
        word: "number",
        hint: "Math symbol used for counting"
    },
    {
        word: "exchange",
        hint: "The act of trading"
    },
    {
        word: "canvas",
        hint: "Piece of fabric for oil painting"
    },
    {
        word: "garden",
        hint: "Space for planting flower and plant"
    },
    {
        word: "position",
        hint: "Location of someone or something"
    },
    {
        word: "feather",
        hint: "Hair like outer covering of bird"
    },
    {
        word: "comfort",
        hint: "A pleasant feeling of relaxation"
    },
    {
        word: "tongue",
        hint: "The muscular organ of mouth"
    },
    {
        word: "expansion",
        hint: "The process of increase or grow"
    },
    {
        word: "country",
        hint: "A politically identified region"
    },
    {
        word: "group",
        hint: "A number of objects or persons"
    },
    {
        word: "taste",
        hint: "Ability of tongue to detect flavour"
    },
    {
        word: "store",
        hint: "Large shop where goods are traded"
    },
    {
        word: "field",
        hint: "Area of land for farming activities"
    },
    {
        word: "friend",
        hint: "Person other than a family member"
    },
    {
        word: "pocket",
        hint: "A bag for carrying small items"
    },
    {
        word: "needle",
        hint: "A thin and sharp metal pin"
    },
    {
        word: "expert",
        hint: "Person with extensive knowledge"
    },
    {
        word: "statement",
        hint: "A declaration of something"
    },
    {
        word: "second",
        hint: "One-sixtieth of a minute"
    },
    {
        word: "library",
        hint: "Place containing collection of books"
    }
];

const wordText = document.querySelector(".word"),
    hintText = document.querySelector(".hint span"),
    timeText = document.querySelector(".time b"),
    inputField = document.querySelector("input"),
    refreshBtn = document.querySelector(".refresh-word"),
    checkBtn = document.querySelector(".check-word"),
    messageElement = document.getElementById("message");
let correctWord, timer;

// Function to initialize the timer
const initTimer = (maxTime) => {
    // Clear any previous timer
    clearInterval(timer);

    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            // Update the time displayed on the page
            timeText.innerText = maxTime;
        } else {
            // When time is up, reveal the hidden time-off message
            const timeOffMessage = document.getElementById("timeOffMessage");
            timeOffMessage.textContent = `Time off! ${correctWord.toUpperCase()} was the correct word`;
            timeOffMessage.style.display = "block";

            // Clear the timer and hide the message after 1 second
            clearInterval(timer);
            setTimeout(() => {
                timeOffMessage.style.display = "none";
                initGame();
            }, 2000);
        }
    }, 1000); // Timer runs every second (1000 milliseconds)
};

// Function to initialize the game
const initGame = () => {
    initTimer(30); // Start the timer with 30 seconds
    let randomObj = words[Math.floor(Math.random() * words.length)]; // Pick a random word and hint
    let wordArray = randomObj.word.split(""); // Split the word into an array of characters
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        // Shuffle the characters in the wordArray for a scrambled word
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    // Display the scrambled word, its hint, and store the correct word
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
};
initGame();

// Function to check the user's input word
const checkWord = () => {
    let userWord = inputField.value.toLowerCase();
    if (!userWord) {
        messageElement.textContent = "Please enter the word to check!";
        messageElement.className = "message error"; // Apply error styling
        messageElement.style.display = "block"; // Display the message
        setTimeout(() => {
            // Hide the message after a 1-second delay
            messageElement.style.display = "none";
        }, 1000);
        return;
    }
    if (userWord !== correctWord) {
        messageElement.textContent = `Oops! ${userWord} is not a correct word`;
        messageElement.className = "message error"; // Apply error styling
        messageElement.style.display = "block"; // Display the message
        setTimeout(() => {
            // Hide the message after a 1-second delay
            messageElement.style.display = "none";
        }, 1000);
    } else {
        messageElement.textContent = `Congrats! ${correctWord.toUpperCase()} is the correct word`;
        messageElement.className = "message success"; // Apply success styling
        messageElement.style.display = "block"; // Display the message
        setTimeout(() => {
            // Hide the message after a 1-second delay
            messageElement.style.display = "none";
        }, 1000);
        initGame();
    }
};

// Event listeners for the refresh and check buttons
refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);