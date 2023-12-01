// Selecting elements from the DOM
let musicTitle = document.querySelector('.container .music-title'); // Title of the music
let artistName = document.querySelector('.container .artist-name'); // Name of the artist
let musicImg = document.querySelector('.container .music-img img'); // Image of the music
let prevBtn = document.querySelector('.container .prev-btn'); // Previous button
let nextBtn = document.querySelector('.container .next-btn'); // Next button
let playPauseBtn = document.querySelector('.container .play-pause-btn'); // Play/Pause button
let playIcon = document.querySelector('.container .play-pause-btn .fa-play'); // Play icon
let pauseIcon = document.querySelector('.container .play-pause-btn .fa-pause'); // Pause icon
let music = document.querySelector('#music'); // Music audio element
let nextMusicBtn = document.querySelector('.container .next-btn'); // Next music button
let prevMusicBtn = document.querySelector('.container .prev-btn'); // Previous music button

let musicIndex = 2; // Current music index

// Function to load music details based on the index
let loadMusic = (musicIndex) => {
    musicTitle.innerHTML = `${allmusic[musicIndex - 1].name}`; // Set music title
    artistName.innerHTML = `${allmusic[musicIndex - 1].artist}`; // Set artist name
    musicImg.src = `${allmusic[musicIndex - 1].img}.jpg`; // Set music image
    music.src = `${allmusic[musicIndex - 1].src}.mp3`; // Set music source
}

// Event listener for Play/Pause button click
playPauseBtn.addEventListener('click', () => {
    if (playPauseBtn.classList.contains('play')) {
        // If currently in play mode
        playPauseBtn.classList.remove('play'); // Remove play class
        playIcon.style.display = 'none'; // Hide play icon
        pauseIcon.style.display = 'block'; // Display pause icon
        musicImg.classList.add('rotate-img'); // Add rotation effect to music image
        music.play(); // Play the music
    } else {
        // If currently in pause mode
        playPauseBtn.classList.add('play'); // Add play class
        playIcon.style.display = 'block'; // Display play icon
        pauseIcon.style.display = 'none'; // Hide pause icon
        musicImg.classList.remove('rotate-img'); // Remove rotation effect from music image
        music.pause(); // Pause the music
    }
})

// Event listener for Next button click
nextMusicBtn.addEventListener('click', () => {
    musicIndex++; // Increment music index
    musicIndex > allmusic.length ? musicIndex = 1 : musicIndex = musicIndex; // Loop back to the first music if reaching the end
    loadMusic(musicIndex); // Load music details based on the updated index
    music.pause(); // Pause the music
    playIcon.style.display = 'block'; // Display play icon
    pauseIcon.style.display = 'none'; // Hide pause icon
    musicImg.classList.remove('rotate-img'); // Remove rotation effect from music image
});

// Event listener for Previous button click
prevMusicBtn.addEventListener('click', () => {
    musicIndex--; // Decrement music index
    musicIndex < 1 ? musicIndex = allmusic.length : musicIndex = musicIndex; // Loop to the last music if reaching the beginning
    loadMusic(musicIndex); // Load music details based on the updated index
    music.pause(); // Pause the music
    playIcon.style.display = 'block'; // Display play icon
    pauseIcon.style.display = 'none'; // Hide pause icon
    musicImg.classList.remove('rotate-img'); // Remove rotation effect from music image
})

loadMusic(musicIndex); // Load initial music details on app start