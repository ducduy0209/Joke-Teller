const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const loader = document.querySelector('.loader');

// Show loader
const showLoader = () => {
    loader.hidden = false;
}

// Hide Loader
const hideLoader = () => {
    loader.hidden = true;
}

// Text-to-speech
function tellMe(joke) {
    VoiceRSS.speech({
        key: '1be303d9a79f4ddfac57b8c2c69da4d6',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
    // Hide loader
    hideLoader();
}

// Enable / Disable button
function toggleButton() {
    button.disabled = !button.disabled;
}


// Get Joke From API
async function getJokesFromAPI() {
    // Show loader
    showLoader();
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming,Spooky?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    let joke = '';
    try {
        const res = await axios.get(apiUrl);
        const data = res.data;
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`
        } else {
            joke = data.joke;
        }
        // text-to-speech
        tellMe(joke);
        // Disable button
        toggleButton();
    } catch (error) {
        alert(error);
    }
}

button.addEventListener('click', getJokesFromAPI);
audioElement.addEventListener('ended', toggleButton);