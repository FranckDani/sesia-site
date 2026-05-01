const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const form = document.querySelector(".contact-form");
const note = document.querySelector(".form-note");
const revealItems = document.querySelectorAll(".reveal");

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

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -45% 0px" }
);

document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const subject = `Demande de devis SESIA - ${data.get("service")}`;
  const body = [
    `Nom : ${data.get("name")}`,
    `Telephone : ${data.get("phone")}`,
    `Service souhaite : ${data.get("service")}`,
    "",
    "Message :",
    data.get("message") || "A preciser",
  ].join("\n");

  note.textContent = "Votre email est pret. Votre application mail va s'ouvrir.";
  window.location.href = `mailto:sesiaservice@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  form.reset();
});
