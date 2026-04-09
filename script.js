const weddingDate = new Date("2026-06-20T17:00:00");

const countdownMessage = document.getElementById("countdown-message");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const confirmButton = document.getElementById("confirmButton");
const bgMusic = document.getElementById("bgMusic");

const songs = [
  "./songs/a-thousand-years",
  "./songs/turning-page"
]

const selectedSong = Math.random() < 0.5 ? songs[0] : songs[1];
bgMusic.src = selectedSong;

let musicStarted = false;

const whatsappNumbers = [
  "522321782066",
  "522286123149"
];

const whatsappMessage = encodeURIComponent(
  "Hola, queremos confirmar nuestra asistencia a su boda. Muchas felicidades, nos vemos pronto."
);

function startMusicOnce(){
  if (musicStarted) return;
  musicStarted = true;

  bgMusic.volume = 0.45;
  bgMusic.play().catch(() => {
    musicStarted = false;
  });
}

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeddingDay = new Date(
    weddingDate.getFullYear(),
    weddingDate.getMonth(),
    weddingDate.getDate()
  );

  const dayDifference = Math.floor(
    (startOfToday - startOfWeddingDay) / (1000 * 60 * 60 * 24)
  );

  if (diff > 0) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownMessage.textContent = "Faltan";
    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
    return;
  }

  if (dayDifference === 0) {
    countdownMessage.textContent = "Hoy es el gran día";
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  countdownMessage.textContent = "Boda hecha, felices por siempre";
  daysEl.textContent = "00";
  hoursEl.textContent = "00";
  minutesEl.textContent = "00";
  secondsEl.textContent = "00";
}

confirmButton.addEventListener("click", () => {
  const randomIndex = Math.random() < 0.5 ? 0 : 1;
  const selectedNumber = whatsappNumbers[randomIndex];
  const whatsappUrl = `https://wa.me/${selectedNumber}?text=${whatsappMessage}`;
  window.open(whatsappUrl, "_blank");
});

document.addEventListener("click", startMusicOnce, {once: true});
document.addEventListener("touchstart", startMusicOnce, {once: true});

updateCountdown();
setInterval(updateCountdown, 1000);
