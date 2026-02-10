const dictionary = [
    "APPLE", "BEACH", "BRAIN", "BREAD", "BRUSH", "CHAIR", "CHEST", "CHORD", "CLICK", "CLOCK",
    "CLOUD", "DANCE", "DIARY", "DRINK", "DRIVE", "EARTH", "FEAST", "FIELD", "FRUIT", "GLASS",
    "GRAPE", "GREEN", "GHOST", "HEART", "HOUSE", "JUICE", "LIGHT", "LEMON", "MELON", "MONEY",
    "MUSIC", "NIGHT", "OCEAN", "PARTY", "PIANO", "PILOT", "PLANE", "PHONE", "PLANT", "PLATE",
    "POWER", "RADIO", "RIVER", "ROBOT", "SHIRT", "SHOES", "SMILE", "SNAKE", "SPACE", "SPOON",
    "STORM", "SUGAR", "TABLE", "TIGER", "TOAST", "TOUCH", "TOWER", "TRAIN", "TRUCK", "VALLEY",
    "VIDEO", "VOICE", "WATER", "WATCH", "WHALE", "WORLD", "WRITE", "YOUTH", "ZEBRA", "ABUSE",
    "ADULT", "AGENT", "ANGER", "AWARD", "BASIS", "BLOCK", "BLOOD", "BOARD", "BRAIN", "BREAK",
    "BROWN", "BUYER", "CAUSE", "CHAIN", "CHEST", "CHIEF", "CHILD", "CHINA", "CLAIM", "CLASS",
    "CLOCK", "COACH", "COAST", "COURT", "COVER", "CREAM", "CRIME", "CROSS", "CROWD", "CROWN",
    "CYCLE", "DANCE", "DEATH", "DEPTH", "DOUBT", "DRAFT", "DRAMA", "DREAM", "DRESS", "DRINK",
    "DRIVE", "EARTH", "ENEMY", "ENTRY", "ERROR", "EVENT", "FAITH", "FAULT", "FIELD", "FIGHT",
    "FINAL", "FLOOR", "FOCUS", "FORCE", "FRAME", "FRANK", "FRONT", "FRUIT", "GLASS", "GRANT",
    "GRASS", "GREEN", "GROUP", "GUIDE", "HEART", "HENRY", "HORSE", "HOTEL", "HOUSE", "IMAGE",
    "INDEX", "INPUT", "ISSUE", "JAPAN", "JONES", "JUDGE", "KNIFE", "LAURA", "LAYER", "LEVEL",
    "LEWIS", "LIGHT", "LIMIT", "LUNCH", "MAJOR", "MARCH", "MATCH", "METAL", "MODEL", "MONEY",
    "MONTH", "MOTOR", "MOUTH", "MUSIC", "NIGHT", "NOISE", "NORTH", "NOVEL", "NURSE", "OFFER",
    "ORDER", "OTHER", "OWNER", "PANEL", "PAPER", "PARTY", "PEACE", "PETER", "PHASE", "PHONE",
    "PIECE", "PILOT", "PITCH", "PLACE", "PLANE", "PLANT", "PLATE", "POINT", "POUND", "POWER",
    "PRESS", "PRICE", "PRIDE", "PRIZE", "PROOF", "QUEEN", "RADIO", "RANGE", "RATIO", "REPLY",
    "RIGHT", "RIVER", "ROUND", "ROUTE", "RUGBY", "SCALE", "SCENE", "SCOPE", "SCORE", "SENSE",
    "SHAPE", "SHARE", "SHEEP", "SHEET", "SHIFT", "SHIRT", "SHOCK", "SIGHT", "SIMON", "SKILL",
    "SLEEP", "SMILE", "SMITH", "SMOKE", "SOUND", "SOUTH", "SPACE", "SPEED", "SPITE", "SPORT",
    "SQUAD", "STAFF", "STAGE", "START", "STATE", "STEAM", "STEEL", "STOCK", "STONE", "STORE",
    "STUDY", "STUFF", "STYLE", "SUGAR", "TABLE", "TASTE", "TERRY", "THEME", "THING", "TITLE",
    "TOTAL", "TOUCH", "TOWER", "TRACK", "TRADE", "TRAIN", "TREND", "TRIAL", "TRUST", "TRUTH",
    "UNCLE", "UNION", "UNITY", "VALUE", "VIDEO", "VISIT", "VOICE", "WASTE", "WATCH", "WATER",
    "WHILE", "WHITE", "WHOLE", "WOMAN", "WORLD", "WORRY", "YOUTH"
];

// Tricky words for Valentine mode
const valentineHardWords = ["JAZZY", "CRYPT", "XYLYL", "GLYPH", "PIGGY", "MAMMA", "STAFF", "PUFFY"];

const state = {
    targetWord: "",
    grid: Array(6).fill().map(() => Array(5).fill("")),
    currentRow: 0,
    currentCol: 0,
    gameOver: false,
    valentineMode: false,
    valentineResponseMode: false
};

const keyboardLayout = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"]
];

function initGame() {
    // Reset state
    if (state.valentineMode) {
        state.targetWord = valentineHardWords[Math.floor(Math.random() * valentineHardWords.length)];
    } else {
        state.targetWord = dictionary[Math.floor(Math.random() * dictionary.length)];
    }

    state.grid = Array(6).fill().map(() => Array(5).fill(""));
    state.currentRow = 0;
    state.currentCol = 0;
    state.currentRow = 0;
    state.currentCol = 0;
    state.gameOver = false;
    state.valentineResponseMode = false;

    // Clear styles if restarting from valentine validation
    document.body.classList.remove("valentine-mode");
    const h1 = document.querySelector("header h1");
    h1.textContent = "WORDLE";

    console.log("Target Word:", state.targetWord);

    renderGrid();
    renderKeyboard();

    document.getElementById("modal-overlay").classList.add("hidden");

    if (state.valentineMode) {
        showMessage("Game is ON! Good luck...", 2000);
    }
}

function renderGrid() {
    const container = document.getElementById("grid-container");
    container.innerHTML = "";

    for (let i = 0; i < 6; i++) {
        const row = document.createElement("div");
        row.className = "grid-row";

        for (let j = 0; j < 5; j++) {
            const tile = document.createElement("div");
            tile.className = "tile";
            tile.id = `tile-${i}-${j}`;
            tile.textContent = state.grid[i][j];

            // Add active state for styling current input
            if (i === state.currentRow && j === state.currentCol && !state.gameOver) {
                // optionally add a cursor effect if desired
            }

            row.appendChild(tile);
        }
        container.appendChild(row);
    }
}

function renderKeyboard() {
    const container = document.getElementById("keyboard-container");
    container.innerHTML = "";

    keyboardLayout.forEach(rowKeys => {
        const rowDiv = document.createElement("div");
        rowDiv.className = "keyboard-row";

        rowKeys.forEach(key => {
            const btn = document.createElement("button");
            btn.className = "key";
            btn.textContent = key;
            btn.setAttribute("data-key", key);

            if (key === "ENTER" || key === "⌫") {
                btn.classList.add("large");
            }

            btn.onclick = () => handleInput(key);
            rowDiv.appendChild(btn);
        });

        container.appendChild(rowDiv);
    });
}

function handleInput(key) {
    if (state.gameOver) return;

    if (key === "⌫" || key === "BACKSPACE") {
        deleteLetter();
    } else if (key === "ENTER") {
        submitRow();
    } else if (/^[A-Z]$/.test(key)) {
        addLetter(key);
    }
}

function addLetter(letter) {
    const maxCols = state.valentineResponseMode ? 3 : 5;
    if (state.currentCol < maxCols) {
        state.grid[state.currentRow][state.currentCol] = letter;

        // Update DOM directly for performance and animation
        const tile = document.getElementById(`tile-${state.currentRow}-${state.currentCol}`);
        tile.textContent = letter;
        tile.setAttribute("data-state", "active");

        state.currentCol++;
    }
}

function deleteLetter() {
    if (state.currentCol > 0) {
        state.currentCol--;
        state.grid[state.currentRow][state.currentCol] = "";

        const tile = document.getElementById(`tile-${state.currentRow}-${state.currentCol}`);
        tile.textContent = "";
        tile.removeAttribute("data-state");
    }
}

async function submitRow() {
    const maxCols = state.valentineResponseMode ? 3 : 5;

    // Special handling for "NO" in valentine mode (2 letters)
    const rowContent = state.grid[state.currentRow];
    const currentWord = rowContent.join("");

    if (state.valentineResponseMode) {
        if (currentWord === "NO" || currentWord === "NO " || currentWord === "YES") {
            // allow proceeding
        } else if (state.currentCol !== maxCols) {
            showMessage("Type YES or NO");
            shakeRow();
            return;
        }
    } else if (state.currentCol !== 5) {
        showMessage("Not enough letters");
        shakeRow();
        return;
    }



    if (state.valentineResponseMode) {
        if (currentWord === "YES") {
            celebrateValentine();
        } else if (currentWord === "NO" || currentWord.startsWith("NO")) {
            rejectValentine();
        } else {
            showMessage("Type YES or NO");
            shakeRow();
        }
        return;
    }

    if (!verifyWord(currentWord)) {
        showMessage("Not in word list");
        shakeRow();
        return;
    }

    await revealTiles(currentWord);

    if (currentWord === state.targetWord) {
        state.gameOver = true;
        if (state.valentineMode) {
            setTimeout(triggerValentineFinale, 1000);
        } else {
            showMessage("Splendid!", 2000);
            setTimeout(() => showModal(true), 2500);
        }
    } else if (state.currentRow === 5) {
        state.gameOver = true;
        if (state.valentineMode) {
            setTimeout(triggerValentineFinale, 1000);
        } else {
            setTimeout(() => showModal(false), 2500);
        }
    } else {
        state.currentRow++;
        state.currentCol = 0;
    }
}

function verifyWord(word) {
    return true;
}

function revealTiles(guess) {
    return new Promise(resolve => {
        const row = state.currentRow;

        // Count frequencies of letters in target for correct coloring logic
        const targetFreq = {};
        for (let char of state.targetWord) {
            targetFreq[char] = (targetFreq[char] || 0) + 1;
        }

        const guessStates = Array(5).fill("absent");
        const remainingTargetFreq = { ...targetFreq };

        // First pass: Find greens (correct positions)
        for (let i = 0; i < 5; i++) {
            if (guess[i] === state.targetWord[i]) {
                guessStates[i] = "correct";
                remainingTargetFreq[guess[i]]--;
            }
        }

        // Second pass: Find yellows (present but wrong spot)
        for (let i = 0; i < 5; i++) {
            if (guessStates[i] !== "correct" && remainingTargetFreq[guess[i]] > 0) {
                guessStates[i] = "present";
                remainingTargetFreq[guess[i]]--;
            }
        }

        // Apply animations and styles sequentially
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const tile = document.getElementById(`tile-${row}-${i}`);
                tile.classList.add("flip");

                // Change color halfway through flip
                setTimeout(() => {
                    tile.setAttribute("data-state", guessStates[i]);
                    updateKeyboardKey(guess[i], guessStates[i]);
                }, 250);

            }, i * 300);
        }

        setTimeout(resolve, 5 * 300 + 500);
    });
}

function updateKeyboardKey(key, state) {
    const btn = document.querySelector(`button[data-key="${key}"]`);
    if (!btn) return;

    // Priority: correct > present > absent > default
    const currentState = btn.getAttribute("data-state");

    if (state === "correct") {
        btn.style.backgroundColor = "var(--tile-correct)";
        btn.setAttribute("data-state", "correct");
    } else if (state === "present" && currentState !== "correct") {
        btn.style.backgroundColor = "var(--tile-present)";
        btn.setAttribute("data-state", "present");
    } else if (state === "absent" && currentState !== "correct" && currentState !== "present") {
        btn.style.backgroundColor = "var(--tile-absent)";
        btn.setAttribute("data-state", "absent");
    }
}

function showMessage(msg, duration = 1000) {
    const modal = document.createElement("div");
    modal.textContent = msg;
    modal.style.position = "absolute";
    modal.style.top = "10%";
    modal.style.left = "50%";
    modal.style.transform = "translateX(-50%)";
    modal.style.backgroundColor = "white";
    modal.style.color = "black";
    modal.style.padding = "10px 20px";
    modal.style.borderRadius = "5px";
    modal.style.fontWeight = "bold";
    modal.style.zIndex = "50";
    modal.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";

    document.body.appendChild(modal);

    setTimeout(() => {
        modal.remove();
    }, duration);
}

function shakeRow() {
    const row = document.querySelectorAll(".grid-row")[state.currentRow];
    row.style.animation = "shake 0.5s";
    setTimeout(() => row.style.animation = "", 500);
}

// Add shake keyframes dynamically
const style = document.createElement('style');
style.innerHTML = `
@keyframes shake {
    0% { transform: translateX(0); }
    10% { transform: translateX(-5px); }
    30% { transform: translateX(5px); }
    50% { transform: translateX(-5px); }
    70% { transform: translateX(5px); }
    90% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
}`;
document.head.appendChild(style);

function showModal(won) {
    const modal = document.getElementById("modal-overlay");
    const title = document.getElementById("modal-title");
    const msg = document.getElementById("modal-message");

    title.textContent = won ? "You Won!" : "Game Over";
    msg.innerHTML = won
        ? "Great job! You guessed the word."
        : `The word was <strong>${state.targetWord}</strong>`;

    modal.classList.remove("hidden");
}

document.getElementById("restart-btn").addEventListener("click", initGame);

// Toggle Secret Valentine Mode
const secretBtn = document.getElementById("secret-btn");
secretBtn.addEventListener("click", () => {
    state.valentineMode = !state.valentineMode;
    secretBtn.classList.toggle("active");

    const msg = state.valentineMode
        ? "Secret Checkbox Checked! Next game will be special..."
        : "Valentine Mode Deactivated";

    showMessage(msg, 2000);

    // Optional: Immediately restart game to lock in the mode choice if user wants immediate effect
    initGame();
});

// Valentine Finale Sequence
async function triggerValentineFinale() {
    // 1. Switch Theme
    document.body.classList.add("valentine-mode");

    // 2. Clear Board
    const container = document.getElementById("grid-container");
    container.innerHTML = "";

    // 3. Define the Message Layout
    // "WILL YOU BE MY VALENTINE?"
    // R1: W I L L _  (4)
    // R2: _ Y O U _  (3)
    // R3: B E _ M Y  (4)
    // R4: V A L E N  (5)
    // R5: T I N E ?  (5)
    // R6: <Hearts>

    const rows = [
        ["W", "I", "L", "L", ""],
        ["", "Y", "O", "U", ""],
        ["B", "E", "", "M", "Y"],
        ["V", "A", "L", "E", "N"],
        ["T", "I", "N", "E", "?"],
        ["❤", "❤", "❤", "❤", "❤"]
    ];

    // Create empty grid first
    for (let i = 0; i < 6; i++) {
        const rowDiv = document.createElement("div");
        rowDiv.className = "grid-row";
        for (let j = 0; j < 5; j++) {
            const tile = document.createElement("div");
            tile.className = "tile";
            tile.id = `v-tile-${i}-${j}`;
            // Pre-style hearts
            if (i === 5) {
                tile.setAttribute("data-state", "heart");
            } else {
                tile.setAttribute("data-state", "empty"); // default
            }
            rowDiv.appendChild(tile);
        }
        container.appendChild(rowDiv);
    }

    // 4. Animate typing with delay
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            const char = rows[i][j];
            if (char) {
                await new Promise(r => setTimeout(r, 80)); // typing speed
                const tile = document.getElementById(`v-tile-${i}-${j}`);
                tile.textContent = char;
                tile.classList.add("pop");
                tile.style.borderColor = "var(--tile-present)";
                tile.style.backgroundColor = "rgba(255, 100, 150, 0.2)";

                if (char === "❤") {
                    tile.style.color = "red";
                }
            }
        }
    }

    // 5. Update Header at the end
    const header = document.querySelector("header h1");
    // Fade out
    header.style.opacity = 0;
    setTimeout(() => {
        header.textContent = "Will you be my valentine?";
        header.style.fontSize = "1.5rem"; // Adjust for length
        header.style.opacity = 1;

        // Transition to input mode after reading
        setTimeout(setupValentineInput, 3000);
    }, 500);
}

function setupValentineInput() {
    state.valentineResponseMode = true;
    state.currentRow = 0;
    state.currentCol = 0;
    state.gameOver = false; // Enable typing
    state.grid = Array(1).fill().map(() => Array(3).fill("")); // 1 row, 3 cols

    const container = document.getElementById("grid-container");
    container.innerHTML = "";

    const rowDiv = document.createElement("div");
    rowDiv.className = "grid-row short"; // short row for 3 letters

    for (let j = 0; j < 3; j++) {
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.id = `tile-${0}-${j}`; // use standard ID format for handleInput compatibility
        rowDiv.appendChild(tile);
    }
    container.appendChild(rowDiv);

    // Reset keyboard colors?
    document.querySelectorAll(".key").forEach(k => {
        k.style.backgroundColor = "var(--key-bg)";
        k.removeAttribute("data-state");
    });
}

function celebrateValentine() {
    document.body.classList.add("celebrating");
    document.querySelector(".app-container").style.display = "none";

    // Create celebration text
    const h1 = document.createElement("h1");
    h1.textContent = "YAY!!! ❤❤❤";
    h1.style.position = "absolute";
    h1.style.top = "50%";
    h1.style.left = "50%";
    h1.style.transform = "translate(-50%, -50%)";
    h1.style.fontSize = "5rem";
    h1.style.color = "white";
    h1.style.textShadow = "0 0 20px #ff0055";
    h1.style.zIndex = "1000";
    document.body.appendChild(h1);

    // Confetti
    for (let i = 0; i < 100; i++) {
        createConfetti();
    }
    setInterval(createConfetti, 100);
}

function createConfetti() {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    c.style.animationDuration = Math.random() * 3 + 2 + "s";
    c.style.top = "-10px";
    document.body.appendChild(c);

    setTimeout(() => c.remove(), 5000);
}

function rejectValentine() {
    document.body.classList.add("rejected");
}

// Physical keyboard support
document.addEventListener("keydown", (e) => {
    const key = e.key.toUpperCase();
    if (key === "ENTER" || key === "BACKSPACE" || /^[A-Z]$/.test(key)) {
        handleInput(key);
    }
});

// Initialize
initGame();
