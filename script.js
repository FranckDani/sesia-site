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

window.addEventListener("load", () => {

  const track = document.querySelector(".carousel-track");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  if (!track || !nextBtn || !prevBtn) return;

  let slides = Array.from(track.children);

  // 🔥 largeur exacte (avec margin)
  const slideWidth = slides[0].getBoundingClientRect().width + 20;

  let index = 0;

  // 🔥 CLONAGE
  const clonesStart = slides.slice(0, 3).map(el => el.cloneNode(true));
  const clonesEnd = slides.slice(-3).map(el => el.cloneNode(true));

  clonesStart.forEach(clone => track.appendChild(clone));
  clonesEnd.reverse().forEach(clone => track.prepend(clone));

  slides = Array.from(track.children);

  // position initiale
  index = 3;
  track.style.transform = `translateX(-${index * slideWidth}px)`;

  // ===== NAVIGATION =====
  function moveNext() {
    index++;
    track.style.transition = "0.5s ease";
    track.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  function movePrev() {
    index--;
    track.style.transition = "0.5s ease";
    track.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  nextBtn.onclick = moveNext;
  prevBtn.onclick = movePrev;

  // ===== RESET INVISIBLE =====
  track.addEventListener("transitionend", () => {

    // aller à la fin → reset au début
    if (index >= slides.length - 3) {
      track.style.transition = "none";
      index = 3;
      track.style.transform = `translateX(-${index * slideWidth}px)`;
    }

    // aller au début → reset à la fin
    if (index <= 0) {
      track.style.transition = "none";
      index = slides.length - 6;
      track.style.transform = `translateX(-${index * slideWidth}px)`;
    }

  });

  // ===== AUTOPLAY =====
  let auto = setInterval(moveNext, 2500);

  track.addEventListener("mouseenter", () => clearInterval(auto));
  track.addEventListener("mouseleave", () => {
    auto = setInterval(moveNext, 2500);
  });

  // ===== SWIPE =====
  let startX = 0;

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;

    if (startX > endX) moveNext();
    else movePrev();
  });

});
