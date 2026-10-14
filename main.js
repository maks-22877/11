const timerDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');

const TOTAL_TIME_MS = 30000; // 30 секунд у мілісекундах
let startTime = null;
let timerInterval = null;

function formatTime(ms) {
  const seconds = Math.floor(ms / 1000);
  const milliseconds = ms % 1000;
  return `${seconds}.${milliseconds.toString().padStart(3, '0')}`;
}

function updateTimer() {
  const elapsedTime = Date.now() - startTime;
  const remainingTime = TOTAL_TIME_MS - elapsedTime;

  if (remainingTime <= 0) {
    // Таймер досяг 0
    clearInterval(timerInterval);
    timerDisplay.textContent = '0.000';
    timerDisplay.classList.remove('warning-animation');
    
    // Активуємо кнопку для нового запуску
    startBtn.disabled = false;
    startBtn.textContent = 'Почати знову';
    return;
  }

  // Відтворення анімації при досягненні <= 10 секунд (10000 мс)
  if (remainingTime <= 10000) {
    timerDisplay.classList.add('warning-animation');
  } else {
    timerDisplay.classList.remove('warning-animation');
  }

  timerDisplay.textContent = formatTime(remainingTime);
}

startBtn.addEventListener('click', () => {
  // Скидаємо стан
  clearInterval(timerInterval);
  timerDisplay.classList.remove('warning-animation');
  
  // Деактивуємо кнопку під час відліку
  startBtn.disabled = true;

  startTime = Date.now();
  // Запускаємо оновлення кожні 10 мс для плавності
  timerInterval = setInterval(updateTimer, 10);
});