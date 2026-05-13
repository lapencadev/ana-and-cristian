const targetDate = new Date(2026, 5, 13, 0, 0, 0);
const monthlyEggStartDate = new Date(2026, 2, 13, 0, 0, 0);

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const monthlyEggElement = document.getElementById("monthlyEgg");
const magicTextElement = document.getElementById("magicText");

function calculateMonthsLeft(now, endDate) {
  let monthsLeft = (endDate.getFullYear() - now.getFullYear()) * 12;
  monthsLeft += endDate.getMonth() - now.getMonth();

  if (now.getMonth() > endDate.getMonth()) {
    monthsLeft -= 1;
  }

  return Math.max(monthsLeft, 0);
}

function updateMonthlyEgg(now) {
  if (now < monthlyEggStartDate) {
    monthlyEggElement.classList.remove("is-special");
    monthlyEggElement.classList.add("is-hidden");
    monthlyEggElement.innerHTML = "";
    return;
  }

  monthlyEggElement.classList.remove("is-hidden");

  const isThirteenth = now.getDate() === 13;
  const monthsLeft = calculateMonthsLeft(now, targetDate);
  const monthsLabel = monthsLeft === 1 ? "mes" : "meses";
  monthlyEggElement.classList.toggle("is-special", isThirteenth);
  monthlyEggElement.innerHTML = `
    <span class="plane" aria-hidden="true">✈</span>
    <p class="monthly-egg-main">${monthsLeft === 1 ? "Falta" : "Faltan"} <strong>${monthsLeft}</strong> ${monthsLabel} para el "si, quiero".</p>
  `;
}

function renderFinishedState() {
  document.body.classList.add("is-finished");
  document.body.innerHTML = '<h1 class="finished-message">Ha llegado el momento</h1>';
}

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    renderFinishedState();
    return;
  }

  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  daysElement.textContent = days;
  hoursElement.textContent = hours;
  minutesElement.textContent = minutes;
  secondsElement.textContent = seconds;

  const nights = days;
  const sunrises = days + 1;
  const fullMoons = Math.floor(days / 29.5);

  updateMonthlyEgg(now);

  magicTextElement.innerHTML = `
    🌙 Faltan <strong>${nights}</strong> noches<br>
    🌅 <strong>${sunrises}</strong> amaneceres<br>
    🌕 y aproximadamente <strong>${fullMoons}</strong> lunas llenas
    <div class="final-line">
      Al amor no se le dictan leyes✨
    </div>
  `;
}

updateCountdown();
setInterval(updateCountdown, 1000);

const despedidaToggle = document.getElementById("despedidaToggle");
const despedidaGallery = document.getElementById("despedidaGallery");
const galleryTrack = document.getElementById("galleryTrack");

despedidaToggle.addEventListener("click", () => {
  const isOpen = despedidaToggle.getAttribute("aria-expanded") === "true";
  despedidaToggle.setAttribute("aria-expanded", String(!isOpen));
  despedidaGallery.hidden = isOpen;
  if (!isOpen) galleryTrack.scrollLeft = 0;
});

document.querySelector(".gallery-prev").addEventListener("click", () => {
  galleryTrack.scrollBy({ left: -270, behavior: "smooth" });
});

document.querySelector(".gallery-next").addEventListener("click", () => {
  galleryTrack.scrollBy({ left: 270, behavior: "smooth" });
});
