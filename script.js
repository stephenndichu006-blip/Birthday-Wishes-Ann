// ===============================
// BIRTHDAY DATA (DEFAULT)
// ===============================
let birthdayData = {
  name: "Ann Wanjiku",
  day: "Saturday",
  date: "11 April 2026",
  updated_at: new Date().toISOString(),
  save_count: 0,
  history: [],
  settings: {
    welcome_title: "Welcome",
    welcome_subtitle: "Birthday Celebration",
    finale_message: "Happy Birthday!",
    autoplay_enabled: true,
    slide_duration_seconds: 14,
    music_mode: "local"
  },
  guest_wishes: [
    "Happy birthday Ann ❤️",
    "May your day be amazing 🎉"
  ],
  reasons_wall: [
    "Kind heart 💖",
    "Beautiful smile 😊",
    "Inspiring person ✨"
  ],
  favorite_things: [],
  milestones: [],
  memory_slides: []
};

// ===============================
// LOAD DATA (GitHub SAFE)
// ===============================
function loadData() {
  const saved = localStorage.getItem("birthdayData");
  if (saved) {
    try {
      birthdayData = JSON.parse(saved);
    } catch (e) {
      console.log("Resetting invalid data");
    }
  }
}

// ===============================
// SAVE DATA
// ===============================
function saveData() {
  localStorage.setItem("birthdayData", JSON.stringify(birthdayData));
}

// ===============================
// APPLY DATA TO ALL PAGES
// ===============================
function applyData() {

  // GLOBAL NAME (ALL PAGES)
  document.querySelectorAll("h1 span").forEach(el => {
    el.textContent = birthdayData.name;
  });

  // HOME PAGE
  const dayEl = document.getElementById("birthday-day");
  if (dayEl) dayEl.textContent = birthdayData.day;

  const dateEl = document.getElementById("birthday-date");
  if (dateEl) dateEl.textContent = birthdayData.date;

  // GALLERY PAGE
  const dayInline = document.getElementById("birthday-day-inline");
  if (dayInline) dayInline.textContent = birthdayData.day;

  const dateInline = document.getElementById("birthday-date-inline");
  if (dateInline) dateInline.textContent = birthdayData.date;

  // WISHES PAGE
  const wishesBox = document.getElementById("guest-wishes-list");
  if (wishesBox) {
    wishesBox.innerHTML = birthdayData.guest_wishes
      .map(w => `<div class="card">${w}</div>`)
      .join("");
  }

  // REASONS WALL PAGE
  const reasonsBox = document.getElementById("reasons-wall-list");
  if (reasonsBox) {
    reasonsBox.innerHTML = birthdayData.reasons_wall
      .map(r => `<div class="card">${r}</div>`)
      .join("");
  }

  // OPTIONAL: FAVORITES PAGE
  const favBox = document.getElementById("favorite-things-list");
  if (favBox) {
    favBox.innerHTML = birthdayData.favorite_things
      .map(f => `<div class="card">${f}</div>`)
      .join("");
  }

  // OPTIONAL: MEMORY SLIDES
  const memoryBox = document.getElementById("memory-slides-list");
  if (memoryBox) {
    memoryBox.innerHTML = birthdayData.memory_slides
      .map(m => `<div class="card">${m}</div>`)
      .join("");
  }
}

// ===============================
// ADMIN FORM (ONLY IF EXISTS)
// ===============================
function setupAdminForm() {
  const form = document.getElementById("birthday-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    birthdayData.name = form.elements.name?.value || birthdayData.name;
    birthdayData.day = form.elements.day?.value || birthdayData.day;
    birthdayData.date = form.elements.date?.value || birthdayData.date;

    birthdayData.guest_wishes = (form.elements.guestWishes?.value || "")
      .split("\n")
      .filter(Boolean);

    birthdayData.reasons_wall = (form.elements.reasonsWall?.value || "")
      .split("\n")
      .filter(Boolean);

    birthdayData.updated_at = new Date().toISOString();

    saveData();
    applyData();

    alert("Saved successfully 🎉");
  });
}

// ===============================
// RESET (OPTIONAL BUTTON)
// ===============================
function resetData() {
  localStorage.removeItem("birthdayData");
  location.reload();
}

// ===============================
// INIT (RUN ON ALL PAGES)
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  loadData();
  applyData();
  setupAdminForm();
});