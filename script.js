// ===== MENU =====
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

// ===== ANIMATIONS SCROLL =====
const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => revealObserver.observe(item));

// ===== NAV ACTIVE =====
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle(
          "is-active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    });
  },
  { rootMargin: "-45% 0px -45% 0px" }
);

document
  .querySelectorAll("main section[id]")
  .forEach((section) => sectionObserver.observe(section));

// ===== FORMULAIRE =====
const form = document.querySelector(".contact-form");
const note = document.querySelector(".form-note");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);

  const subject = `Demande de devis SESIA - ${data.get("service")}`;

  const body = `
Nom : ${data.get("name")}
Telephone : ${data.get("phone")}
Service : ${data.get("service")}

Message :
${data.get("message") || "A preciser"}
`;

  note.textContent = "Votre email est prêt...";

  window.location.href = `mailto:sesiaservice@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  form.reset();
});

// ===== 🔥 CARROUSEL PREMIUM =====
const track = document.querySelector(".carousel-track");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let position = 0;
const slideWidth = 320;

// autoplay
let autoSlide = setInterval(moveNext, 2500);

function moveNext() {
  position -= slideWidth;
  track.style.transform = `translateX(${position}px)`;
}

function movePrev() {
  position += slideWidth;
  track.style.transform = `translateX(${position}px)`;
}

// boutons
nextBtn.addEventListener("click", moveNext);
prevBtn.addEventListener("click", movePrev);

// pause au hover
track.addEventListener("mouseenter", () => clearInterval(autoSlide));
track.addEventListener("mouseleave", () => {
  autoSlide = setInterval(moveNext, 2500);
});

// swipe mobile
let startX = 0;

track.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

track.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;

  if (startX > endX) {
    moveNext();
  } else {
    movePrev();
  }
});
