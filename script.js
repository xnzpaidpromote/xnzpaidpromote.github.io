const openPanel = document.getElementById("openPanel");
const closePanel = document.getElementById("closePanel");
const bottomPanel = document.getElementById("bottomPanel");
const panelOverlay = document.getElementById("panelOverlay");

function openMenu() {
  bottomPanel.classList.add("active");
  panelOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  bottomPanel.classList.remove("active");
  panelOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

openPanel.addEventListener("click", openMenu);
closePanel.addEventListener("click", closeMenu);
panelOverlay.addEventListener("click", closeMenu);


/* THEME */

const darkBtn = document.getElementById("darkBtn");
const lightBtn = document.getElementById("lightBtn");

function setTheme(theme) {

  if (theme === "light") {
    document.body.classList.add("light");
    lightBtn.classList.add("active");
    darkBtn.classList.remove("active");
    localStorage.setItem("xnzTheme", "light");
  } else {
    document.body.classList.remove("light");
    darkBtn.classList.add("active");
    lightBtn.classList.remove("active");
    localStorage.setItem("xnzTheme", "dark");
  }

}

darkBtn.addEventListener("click", () => setTheme("dark"));
lightBtn.addEventListener("click", () => setTheme("light"));

const savedTheme = localStorage.getItem("xnzTheme");

if (savedTheme) {
  setTheme(savedTheme);
}


/* LANGUAGE */

const langMY = document.getElementById("langMY");
const langEN = document.getElementById("langEN");

langMY.addEventListener("click", () => {

  langMY.classList.add("active");
  langEN.classList.remove("active");

  document.documentElement.lang = "ms";

  alert("Bahasa MY telah dipilih.");

});

langEN.addEventListener("click", () => {

  langEN.classList.add("active");
  langMY.classList.remove("active");

  document.documentElement.lang = "en";

  alert("English language selected.");

});


/* CONTACT FORM */

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(event) {

  event.preventDefault();

  const name =
    document.getElementById("name").value.trim();

  const phone =
    document.getElementById("phone").value.trim();

  const message =
    document.getElementById("message").value.trim();

  if (!name || !phone || !message) {
    alert("Sila lengkapkan semua maklumat.");
    return;
  }

  const text =
    `Hi XNZ, saya ingin membuat pertanyaan paid promote.%0A%0A` +
    `Nama: ${encodeURIComponent(name)}%0A` +
    `WhatsApp: ${encodeURIComponent(phone)}%0A` +
    `Pertanyaan: ${encodeURIComponent(message)}`;

  window.open(
    `https://wa.me/60143783301?text=${text}`,
    "_blank"
  );

});


/* CLOSE PANEL AFTER NAVIGATION */

document.querySelectorAll(".panel-nav a").forEach(link => {

  link.addEventListener("click", () => {
    closeMenu();
  });

});

document.querySelectorAll(".quick-link").forEach(link => {

  link.addEventListener("click", () => {
    closeMenu();
  });

});


/* ESC KEY */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {
    closeMenu();
  }

});
