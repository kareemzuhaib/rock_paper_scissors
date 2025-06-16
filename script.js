// Initialize scores
let playerScore = 0;
let botScore = 0;

// Dom element references
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const playerScorePara = document.querySelector("#player");
const botScorePara = document.querySelector("#bot");

const winSound = document.querySelector("#win-sound");
const loseSound = document.querySelector("#lose-sound");
const drawSound = document.querySelector("#draw-sound");

const resetBtn = document.querySelector("#reset");

// Utility function for sound play
const playSound = (sound) => {
    sound.pause();
    sound.currentTime = 0;
    sound.play();
};


// Generate random choice for the bot
const genBotChoice = () => {
    const options = ["rock", "paper", "scissor"];
    const randomIndex = Math.floor(Math.random() * 3);
    return options[randomIndex];
};

// For draw
const drawGame = () => {
    msg.innerText = "Match Drawn!";
    msg.style.backgroundColor = "#081b31";
    playSound(drawSound);
};

// Declaring the winner and updating scoreboard
const showWinner = (playerWins, playerChoice, botChoice) => {
    if (playerWins) {
        playerScore++;
        msg.innerText = `You Win! Bot chose ${botChoice}`;
        msg.style.backgroundColor = "green";
        playerScorePara.innerText = playerScore;
        playSound(winSound);
    } else {
        botScore++;
        msg.innerText = `You Lose! Bot chose ${botChoice}`;
        msg.style.backgroundColor = "red";
        botScorePara.innerText = botScore;
        playSound(loseSound);
    }
};

// Game logic
const playGame = (playerChoice) => {
    const botChoice = genBotChoice();

    if (playerChoice === botChoice) {
        drawGame();
        return;
    }

    let playerWins = false;

    // Determine winner
    if (playerChoice === "rock") {
        playerWins = botChoice === "scissor";
    } else if (playerChoice === "paper") {
        playerWins = botChoice === "rock";
    } else if (playerChoice === "scissor") {
        playerWins = botChoice === "paper";
    }

    showWinner(playerWins, playerChoice, botChoice);
};

// Add event listener to all choice
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const playerChoice = choice.getAttribute("id");

        // Animate the choice
        choice.classList.add("active");
        setTimeout(() => choice.classList.remove("active"), 50);

        playGame(playerChoice);
    });
});

// Reset
resetBtn.addEventListener("click", () => {
    playerScore = 0;
    botScore = 0;
    playerScorePara.innerText = "0";
    botScorePara.innerText = "0";
    msg.innerText = "Choose Any One";
    msg.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
});