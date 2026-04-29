const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");
const form = document.querySelector(".contact-form");
const note = document.querySelector(".form-note");

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  note.textContent = "Merci. Votre demande est prete a etre envoyee a SESIA.";
  form.reset();
});
