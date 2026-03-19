const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const year = document.getElementById("year");
const profileImage = document.getElementById("profileImage");
const profileFallback = document.getElementById("profileFallback");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

year.textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem("asel-theme");
if (savedTheme === "light") {
  document.body.classList.add("light");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const currentTheme = document.body.classList.contains("light") ? "light" : "dark";
  localStorage.setItem("asel-theme", currentTheme);
});

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

navAnchors.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".fade-in").forEach((element) => {
  observer.observe(element);
});

function setActiveNav() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navAnchors.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveNav);
window.addEventListener("load", setActiveNav);

if (profileImage) {
  profileImage.addEventListener("error", () => {
    profileImage.style.display = "none";
    profileFallback.style.display = "grid";
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    const endpoint = contactForm.getAttribute("action");

    if (!endpoint || endpoint === "FORM_ENDPOINT") {
      event.preventDefault();
      formStatus.textContent =
        "Please replace FORM_ENDPOINT in index.html with your real form endpoint before using the contact form.";
      formStatus.style.color = "#f59e0b";
      return;
    }

    formStatus.textContent = "Sending message...";
    formStatus.style.color = "";
  });
}