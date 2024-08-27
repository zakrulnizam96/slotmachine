const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');
const spinButton = document.getElementById('spinButton');
const resultDisplay = document.getElementById('result');

const symbols = ["🍒", "🍋", "🍇", "🍉", "⭐", "7"];
const winProbability = 0.2; // Set winning probability to 20%

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// This function handles the spinning animation by cycling through random symbols
function spinReelAnimation(reel, duration, speed) {
    return new Promise((resolve) => {
        const startTime = Date.now();
        const spinInterval = setInterval(() => {
            reel.textContent = getRandomSymbol();
        }, speed); // Change symbol every 'speed' milliseconds

        // Stop spinning after the specified duration
        setTimeout(() => {
            clearInterval(spinInterval);
            resolve(); // Resolve the promise when the spinning stops
        }, duration);
    });
}

// This function reveals the final symbol after the animation
function revealFinalSymbol(reel, forcedSymbol = null) {
    if (forcedSymbol) {
        reel.textContent = forcedSymbol;
    } else {
        reel.textContent = getRandomSymbol();
    }
}

async function spin() {
    resultDisplay.textContent = ""; // Clear previous result
    spinButton.disabled = true; // Disable the spin button during spinning

    // Set all reels to "?" initially
    reel1.textContent = "❓";
    reel2.textContent = "❓";
    reel3.textContent = "❓";

    // Determine whether to force a win based on the set probability
    const isWin = Math.random() < winProbability;
    let forcedSymbol = null;

    if (isWin) {
        // If it's a winning spin, pick a random symbol to force a win
        forcedSymbol = getRandomSymbol();
    }

    // Spin each reel with a delay and reveal the final symbol
    await spinReelAnimation(reel1, 2000, 50); // Spin the first reel for 2 seconds, speed: 50ms
    revealFinalSymbol(reel1, isWin ? forcedSymbol : null);

    await spinReelAnimation(reel2, 3000, 50); // Spin the second reel for 3 seconds, speed: 50ms
    revealFinalSymbol(reel2, isWin ? forcedSymbol : null);

    await spinReelAnimation(reel3, 4000, 50); // Spin the third reel for 4 seconds, speed: 50ms
    revealFinalSymbol(reel3, isWin ? forcedSymbol : null);

    checkResult();
    spinButton.disabled = false; // Re-enable the spin button
}

function checkResult() {
    if (reel1.textContent === reel2.textContent && reel2.textContent === reel3.textContent) {
        resultDisplay.textContent = "🎉 BIG WIN!";
    } else {
        resultDisplay.textContent = "😢 Try Again!";
    }
}

spinButton.addEventListener('click', spin);
