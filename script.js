// script.js
let betAmount = 0;
let totalMoney = 1000;
let totalProfit = 0;
let zeplinMultiplier = 1;
let gameInterval;
let gameStarted = false;

document.getElementById('bet-button').addEventListener('click', startGame);
document.getElementById('stop-button').addEventListener('click', stopGame);

const backgroundMusic = document.getElementById('background-music');
const explosionSound = document.getElementById('explosion-sound');
const winSound = document.getElementById('win-sound');

backgroundMusic.play();

function startGame() {
    if (gameStarted) return;

    betAmount = parseFloat(document.getElementById('bet-amount').value);
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > totalMoney) {
        alert('Geçerli bir bahis miktarı girin!');
        return;
    }

    totalMoney -= betAmount;
    updateInfo();

    gameStarted = true;
    toggleButtons();

    zeplinMultiplier = 1;
    updateCurrentValues();
    let zeplinElement = document.querySelector('.zeplin');
    zeplinElement.style.animation = 'none';
    setTimeout(() => {
        zeplinElement.style.animation = '';
    }, 10);

    gameInterval = setInterval(() => {
        zeplinMultiplier += 0.1;
        updateCurrentValues();

        if (Math.random() < 0.05) { // Zeplin rastgele bir anda patlar, %5 ihtimalle her 0.1 saniye
            clearInterval(gameInterval);
            explosionSound.play();
            alert(`Zeplin patladı! ${zeplinMultiplier.toFixed(1)}x kaçırdınız!`);
            resetGame();
        }
    }, 100);
}

function stopGame() {
    if (!gameStarted) return;

    clearInterval(gameInterval);
    let profit = betAmount * zeplinMultiplier;
    totalProfit += profit;
    totalMoney += profit;
    updateInfo();
    winSound.play();
    alert(`Kazandınız! ${zeplinMultiplier.toFixed(1)}x ile ${profit.toFixed(2)} kazandınız!`);
    resetGame();
}

function resetGame() {
    gameStarted = false;
    toggleButtons();
    updateCurrentValues();
}

function toggleButtons() {
    document.getElementById('stop-button').disabled = !gameStarted;
    document.getElementById('bet-button').disabled = gameStarted;
}

function updateInfo() {
    document.getElementById('total-money').textContent = totalMoney.toFixed(2);
    document.getElementById('total-profit').textContent = totalProfit.toFixed(2);
}

function updateCurrentValues() {
    document.getElementById('current-x').textContent = zeplinMultiplier.toFixed(1);
    document.getElementById('current-profit').textContent = (betAmount * zeplinMultiplier).toFixed(2);
}
