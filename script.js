const days = [
  {
    title: "Rose Day",
    date: "February 7",
    message: "A rose for every time you made my world bloom.",
    wish: "You are my favorite flower.",
    image: "assets/rose-day.jpg",
    alt: "Mahalakshmi on Rose Day",
  },
  {
    title: "Propose Day",
    date: "February 8",
    message: "I choose you today, tomorrow, and for every day after.",
    wish: "Will you be my forever?",
    image: "assets/propose-day.jpg",
    alt: "Mahalakshmi on Propose Day",
  },
  {
    title: "Chocolate Day",
    date: "February 9",
    message: "Sweet treats for the sweetest person in my life.",
    wish: "Keep smiling, my love.",
    image: "assets/chocolate-day.jpg",
    alt: "Mahalakshmi on Chocolate Day",
  },
  {
    title: "Teddy Day",
    date: "February 10",
    message: "Sending you a teddy-soft hug across the miles.",
    wish: "Snuggle up with my love.",
    image: "assets/teddy-day.jpg",
    alt: "Mahalakshmi on Teddy Day",
  },
  {
    title: "Promise Day",
    date: "February 11",
    message: "I promise to listen, laugh, and love you endlessly.",
    wish: "You can always count on me.",
    image: "assets/promise-day.jpg",
    alt: "Mahalakshmi on Promise Day",
  },
  {
    title: "Hug Day",
    date: "February 12",
    message: "If you could feel my hug right now, you'd never let go.",
    wish: "Wrapped in my love.",
    image: "assets/hug-day.jpg",
    alt: "Mahalakshmi on Hug Day",
  },
  {
    title: "Kiss Day",
    date: "February 13",
    message: "A kiss that says thank you for being my everything.",
    wish: "Just you and me.",
    image: "assets/kiss-day.jpg",
    alt: "Mahalakshmi on Kiss Day",
  },
  {
    title: "Valentine's Day",
    date: "February 14",
    message: "Happy Valentine's Day, Mahalakshmi. You are my heart.",
    wish: "Forever starts now.",
    image: "assets/valentines-day.jpg",
    alt: "Mahalakshmi on Valentine's Day",
  },
];

const fortunes = [
  "Your smile is my favorite sunrise.",
  "Today is perfect for a long hug and a sweet promise.",
  "You make every ordinary moment feel magical.",
  "My heart does a happy dance every time I see you.",
  "A love like ours deserves a thousand celebrations.",
  "You are my calm, my joy, and my biggest adventure.",
];

const weekEl = document.querySelector("[data-week]");
const progressEl = document.querySelector("[data-progress]");
const nextBtn = document.querySelector("[data-next]");
const replayBtn = document.querySelector("[data-replay]");
const statusEl = document.querySelector("[data-status]");
const finalEl = document.querySelector("[data-final]");
const fortuneEl = document.querySelector("[data-fortune]");
const fortuneBtn = document.querySelector("[data-fortune-btn]");
const meterInput = document.querySelector("[data-meter]");
const meterLabel = document.querySelector("[data-meter-label]");
const giftBtn = document.querySelector("[data-gift]");
const giftReveal = document.querySelector("[data-gift-reveal]");

const cardEls = [];

const buildCard = (day) => {
  const card = document.createElement("article");
  card.className = "day-card";
  card.innerHTML = `
    <div class="day-image">
      <img src="${day.image}" alt="${day.alt}" loading="lazy" />
      <div class="day-chip">${day.title}</div>
    </div>
    <div class="day-content">
      <div class="day-date">${day.date}</div>
      <h3 class="day-title">${day.title}</h3>
      <p class="day-message">${day.message}</p>
      <div class="day-wish">${day.wish}</div>
    </div>
  `;
  return card;
};

const buildProgress = () => {
  progressEl.innerHTML = "";
  days.forEach(() => {
    const heart = document.createElement("span");
    heart.className = "heart";
    progressEl.appendChild(heart);
  });
};

const updateStatus = (currentIndex) => {
  if (!statusEl) return;
  if (currentIndex < 0) {
    statusEl.textContent = "Tap “Start the surprises” to begin.";
    return;
  }
  const day = days[currentIndex];
  statusEl.textContent = `Now revealing: ${day.title} — ${day.date}.`;
};

const setFortune = () => {
  if (!fortuneEl) return;
  const pick = fortunes[Math.floor(Math.random() * fortunes.length)];
  fortuneEl.textContent = pick;
};

const updateMeterLabel = (value) => {
  if (!meterLabel) return;
  let mood = "Warm and cozy";
  const level = Number(value);
  if (level >= 85) mood = "Maximum cuddles";
  else if (level >= 65) mood = "Extra snuggly";
  else if (level >= 40) mood = "Soft and sweet";
  else mood = "Gentle and calm";
  meterLabel.textContent = `Hug level: ${level}% — ${mood}.`;
};

const launchConfetti = () => {
  const count = 24;
  for (let i = 0; i < count; i += 1) {
    const heart = document.createElement("span");
    heart.className = "confetti-heart";
    heart.style.setProperty("--x", `${Math.random() * 100}vw`);
    heart.style.setProperty("--delay", `${Math.random() * 0.8}s`);
    heart.style.setProperty("--size", `${10 + Math.random() * 14}px`);
    document.body.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove());
  }
};

const setup = () => {
  if (!weekEl || !progressEl || !nextBtn || !replayBtn) return;

  weekEl.innerHTML = "";
  days.forEach((day) => {
    const card = buildCard(day);
    weekEl.appendChild(card);
    cardEls.push(card);
  });

  buildProgress();
  updateStatus(-1);
  setFortune();
  if (meterInput) {
    updateMeterLabel(meterInput.value);
  }
};

let currentIndex = -1;

const revealNext = () => {
  if (currentIndex >= days.length - 1) return;
  currentIndex += 1;

  const card = cardEls[currentIndex];
  if (card) {
    card.classList.add("is-revealed");
    card.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  const hearts = Array.from(progressEl.children);
  if (hearts[currentIndex]) {
    hearts[currentIndex].classList.add("is-on");
  }

  updateStatus(currentIndex);

  if (currentIndex === days.length - 1) {
    nextBtn.textContent = "All surprises revealed";
    nextBtn.disabled = true;
    replayBtn.disabled = false;
    if (finalEl) {
      finalEl.hidden = false;
      finalEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    launchConfetti();
  } else {
    nextBtn.textContent = "Next surprise";
  }
};

const replay = () => {
  currentIndex = -1;
  cardEls.forEach((card) => card.classList.remove("is-revealed"));
  Array.from(progressEl.children).forEach((heart) =>
    heart.classList.remove("is-on")
  );
  if (finalEl) {
    finalEl.hidden = true;
  }
  nextBtn.textContent = "Start the surprises";
  nextBtn.disabled = false;
  replayBtn.disabled = true;
  updateStatus(-1);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

setup();

if (nextBtn) {
  nextBtn.addEventListener("click", revealNext);
}

if (replayBtn) {
  replayBtn.addEventListener("click", replay);
}

if (fortuneBtn) {
  fortuneBtn.addEventListener("click", setFortune);
}

if (meterInput) {
  meterInput.addEventListener("input", (event) => {
    updateMeterLabel(event.target.value);
  });
}

if (giftBtn && giftReveal) {
  giftBtn.addEventListener("click", () => {
    const isHidden = giftReveal.hidden;
    giftReveal.hidden = !isHidden;
    giftBtn.textContent = isHidden ? "Hide the gift" : "Open the gift";
    if (isHidden) {
      launchConfetti();
    }
  });
}
