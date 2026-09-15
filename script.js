// ==========================================
// XNZ PAID PROMOTE
// WEBSITE FUNCTIONS
// ==========================================


// MOBILE MENU
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });

}


// CLOSE MOBILE MENU
const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {
        navMenu.classList.remove("active");
    });

});


// CONTACT FORM
const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !phone || !message) {

            alert("Sila lengkapkan semua maklumat.");

            return;

        }


        const whatsappNumber = "60143783301";


        const whatsappMessage =
            "HI XNZ, SAYA MAHU BUAT PERTANYAAN.%0A%0A" +
            "NAMA PENUH: " +
            encodeURIComponent(name) +
            "%0A" +
            "NO. WHATSAPP: " +
            encodeURIComponent(phone) +
            "%0A" +
            "BUTIRAN PERTANYAAN:%0A" +
            encodeURIComponent(message);


        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            whatsappMessage;


        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );


        contactForm.reset();

    });

}


// UPDATE YEAR
const footerYear = document.querySelector(".footer-bottom");

if (footerYear) {

    footerYear.innerHTML =
        "© " +
        new Date().getFullYear() +
        " XNZ PAID PROMOTE. ALL RIGHTS RESERVED.";

}


// PREVENT EMPTY LINKS
document.querySelectorAll('a[href="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        event.preventDefault();

    });

});
