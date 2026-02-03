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

const dateIdeas = [
  "Movie night with her favorite snacks and soft blankets.",
  "A sunset walk with hand-holding and sweet photos.",
  "Bake something together and taste-test the batter.",
  "Coffee date followed by a slow, romantic playlist.",
  "Write tiny love notes and hide them around the room.",
  "Stargazing with warm tea and whispered wishes.",
];

const compliments = [
  "You light up every room you enter.",
  "Your smile is my favorite view.",
  "You make love feel effortless and safe.",
  "You are beautiful, inside and out, always.",
  "Every day with you feels like a blessing.",
  "You are my calm, my spark, and my forever.",
];

const weekEl = document.querySelector("[data-week]");
const progressEl = document.querySelector("[data-progress]");
let nextBtns = [];
let replayBtns = [];
const statusEl = document.querySelector("[data-status]");
const finalEl = document.querySelector("[data-final]");
const fortuneEl = document.querySelector("[data-fortune]");
const fortuneBtn = document.querySelector("[data-fortune-btn]");
const meterInput = document.querySelector("[data-meter]");
const meterLabel = document.querySelector("[data-meter-label]");
const giftBtn = document.querySelector("[data-gift]");
const giftReveal = document.querySelector("[data-gift-reveal]");
const dateIdeaEl = document.querySelector("[data-date-idea]");
const dateBtn = document.querySelector("[data-date-btn]");
const complimentEl = document.querySelector("[data-compliment]");
const complimentBtn = document.querySelector("[data-compliment-btn]");
const audioEl = document.querySelector("[data-audio]");
const audioToggle = document.querySelector("[data-audio-toggle]");
const audioStatus = document.querySelector("[data-audio-status]");

const cardEls = [];

const safeScrollTo = (element, block = "center") => {
  if (!element) return;
  try {
    element.scrollIntoView({ behavior: "smooth", block });
  } catch (error) {
    element.scrollIntoView(true);
  }
};

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
      <div class="card-actions">
        <button class="btn ghost small card-next" type="button" data-next>
          Next surprise
        </button>
      </div>
    </div>
  `;
  return card;
};

const refreshActionButtons = () => {
  nextBtns = Array.from(document.querySelectorAll("[data-next]"));
  replayBtns = Array.from(document.querySelectorAll("[data-replay]"));
};

const updateNextButtons = (label, disabled) => {
  nextBtns.forEach((btn) => {
    btn.textContent = label;
    btn.disabled = disabled;
  });
};

const updateReplayButtons = (disabled) => {
  replayBtns.forEach((btn) => {
    btn.disabled = disabled;
  });
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

const setDateIdea = () => {
  if (!dateIdeaEl) return;
  const pick = dateIdeas[Math.floor(Math.random() * dateIdeas.length)];
  dateIdeaEl.textContent = pick;
};

const setCompliment = () => {
  if (!complimentEl) return;
  const pick = compliments[Math.floor(Math.random() * compliments.length)];
  complimentEl.textContent = pick;
  launchConfetti();
};

const updateAudioUI = (isPlaying) => {
  if (audioToggle) {
    audioToggle.textContent = isPlaying ? "Pause our song" : "Play our song";
  }
  if (audioStatus) {
    audioStatus.textContent = isPlaying
      ? "Playing softly in the background."
      : "Tap to play.";
  }
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
  if (!weekEl || !progressEl) return;

  weekEl.innerHTML = "";
  days.forEach((day) => {
    const card = buildCard(day);
    weekEl.appendChild(card);
    cardEls.push(card);
  });

  refreshActionButtons();

  buildProgress();
  updateStatus(-1);
  setFortune();
  setDateIdea();
  setCompliment();
  if (meterInput) {
    updateMeterLabel(meterInput.value);
  }
  updateAudioUI(false);
  updateNextButtons("Start the surprises", false);
  updateReplayButtons(true);
};

let currentIndex = -1;

const revealNext = () => {
  if (currentIndex >= days.length - 1) return;
  currentIndex += 1;

  const card = cardEls[currentIndex];
  if (card) {
    card.classList.add("is-revealed");
    safeScrollTo(card, "center");
  }

  const hearts = Array.from(progressEl.children);
  if (hearts[currentIndex]) {
    hearts[currentIndex].classList.add("is-on");
  }

  updateStatus(currentIndex);

  if (currentIndex === days.length - 1) {
    updateNextButtons("All surprises revealed", true);
    updateReplayButtons(false);
    if (finalEl) {
      finalEl.hidden = false;
      safeScrollTo(finalEl, "start");
    }
    launchConfetti();
  } else {
    updateNextButtons("Next surprise", false);
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
  updateNextButtons("Start the surprises", false);
  updateReplayButtons(true);
  updateStatus(-1);
  try {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    window.scrollTo(0, 0);
  }
};

setup();

refreshActionButtons();
nextBtns.forEach((btn) => btn.addEventListener("click", revealNext));
replayBtns.forEach((btn) => btn.addEventListener("click", replay));

if (fortuneBtn) {
  fortuneBtn.addEventListener("click", setFortune);
}

if (dateBtn) {
  dateBtn.addEventListener("click", setDateIdea);
}

if (complimentBtn) {
  complimentBtn.addEventListener("click", setCompliment);
}

if (audioToggle && audioEl) {
  audioToggle.addEventListener("click", () => {
    if (audioEl.paused) {
      audioEl
        .play()
        .then(() => updateAudioUI(true))
        .catch(() => {
          if (audioStatus) {
            audioStatus.textContent = "Tap again to play.";
          }
        });
    } else {
      audioEl.pause();
      updateAudioUI(false);
    }
  });
  audioEl.addEventListener("play", () => updateAudioUI(true));
  audioEl.addEventListener("pause", () => updateAudioUI(false));
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
