
// Bulls and Cows
// Get library for user input
// we need to keep the next line, so we can prompt the user for input



import readline from "readline-sync"

// Generate a random secret number
function generateSecretNumber() {
    let digits = [];
    while (digits.length < 4) {
        let digit = Math.floor(Math.random() * 10).toString();
        if (!digits.includes(digit)) {
            digits.push(digit);
        }
    }
    return digits.join('');
}

// Validate the player's guess
function isUniqueDigits(guess) {
    for (let i = 0; i < guess.length; i++) {
        if (guess.indexOf(guess[i]) !== guess.lastIndexOf(guess[i])) {
            return false; // Duplicate digit found
        }
    }
    return true;
}

function getPlayerGuess() {
    let guess;
    let valid = false;

    while (!valid) {
        guess = readline.question('Enter your guess (4 unique digits): ');

        if (guess.length !== 4) {
            console.log('Your guess must be exactly 4 digits long.');
            continue;
        }

        let allDigits = true;
        for (let i = 0; i < guess.length; i++) {
            if (isNaN(guess[i])) {
                allDigits = false;
                break;
            }
        }

        if (!allDigits) {
            console.log('Your guess must only contain digits.');
            continue;
        }

        if (!isUniqueDigits(guess)) {
            console.log('All digits must be unique.');
            continue;
        }

        valid = true;
    }

    return guess;
}

// Calculate the number of bulls and cows
function calculateBullsAndCows(secret, guess) {
    let bulls = 0;
    let cows = 0;

    for (let i = 0; i < 4; i++) {
        if (guess[i] === secret[i]) {
            bulls++;
        } else if (secret.includes(guess[i])) {
            cows++;
        }
    }

    return { bulls, cows };
}

// Randomized messages for no bulls and cows
const noMatchMessages = [
    "Oops! Not even close!",
    "Try again, better luck next time!",
    "No bulls, no cows! Keep guessing!",
    "Zilch! Give it another shot!"
];

// Play the game
function playGame(playerName, maxAttempts) {
    const secretNumber = generateSecretNumber();
    console.log(`${playerName}, I have generated a secret 4-digit number. Try to guess it!`);

    let guess;
    let attempts = 0;
    let result;

    do {
        guess = getPlayerGuess();
        attempts++;
        result = calculateBullsAndCows(secretNumber, guess);

        if (result.bulls === 0 && result.cows === 0) {
            console.log(noMatchMessages[Math.floor(Math.random() * noMatchMessages.length)]);
        } else {
            console.log(`${result.bulls} bull(s) and ${result.cows} cow(s)`);
        }

        if (maxAttempts && attempts >= maxAttempts) {
            console.log(`Sorry, ${playerName}! You've reached the maximum number of attempts (${maxAttempts}). The secret number was ${secretNumber}.`);
            return attempts;
        }

    } while (result.bulls !== 4);

    console.log(`Congratulations, ${playerName}! You've guessed the number in ${attempts} attempts.`);
    return attempts;
}

function startGame() {
    const playerName = readline.question('What is your name? ') || 'Player';

    let totalGames = 0;
    let gamesData = [];

    let playAgain;
    do {
        totalGames++;
        const difficulty = readline.question('Choose difficulty (easy/hard): ').toLowerCase();
        const maxAttempts = difficulty === 'hard' ? 5 : 10;

        const attempts = playGame(playerName, maxAttempts, difficulty);
        gamesData.push({ game: totalGames, attempts });

        playAgain = readline.question('Do you want to play another round? (yes/no): ').toLowerCase();
    } while (playAgain === 'yes');

    console.log(`\nThanks for playing, ${playerName}!`);
    console.log(`You played ${totalGames} game(s).`);
    gamesData.forEach(game => {
        console.log(`Game ${game.game}: ${game.attempts} attempts`);
    });
}

// Start the game
startGame();