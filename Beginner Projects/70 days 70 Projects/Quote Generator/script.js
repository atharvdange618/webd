let generateQuoteBtn = document.querySelector('.new-quote-btn');
let quote = document.querySelector('.quote');
let author = document.querySelector('.author');
let copyBtn = document.querySelector('.copy');
let copyIcon = document.querySelector('.copy i');
let copyText = document.querySelector('.copy span');
let speakBtn = document.querySelector('.speak');
let twitterBtn = document.querySelector('.twitter');

const url = "https://api.quotable.io/random";

generateQuoteBtn.addEventListener("click", () => {
    generateQuoteBtn.classList.add("click-animation");
    getQuote();
    setTimeout(() => {
        generateQuoteBtn.classList.remove("click-animation");
    }, 200);
});

let getQuote = () => {
    fetch(url).then((res) => res.json()).then((data) => {
        // console.log(data.content)
        // console.log(data.author)
        quote.innerHTML = data.content;
        author.innerHTML = '-' + data.author;
    });
}

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(quote.textContent);
    copyIcon.style.display = "none";
    copyText.style.display = "block";
    setTimeout(() => {
        copyIcon.style.display = "block";
        copyText.style.display = "none";
    }, 400);
});

speakBtn.addEventListener("click", () => {
    let speech = new SpeechSynthesisUtterance();
    speech.text = `${quote.textContent} by ${author.textContent}`;
    speechSynthesis.speak(speech);
});

twitterBtn.addEventListener('click', () => {
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quote.textContent} by ${author.textContent}`;
    window.open(tweetUrl, "_blank");
});

getQuote();