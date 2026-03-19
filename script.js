const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const year = document.getElementById("year");
const profileImage = document.getElementById("profileImage");
const profileFallback = document.getElementById("profileFallback");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

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

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

if (profileImage) {
  profileImage.addEventListener("error", () => {
    profileImage.style.display = "none";
    if (profileFallback) {
      profileFallback.style.display = "flex";
    }
  });
}

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

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-link");

function updateActiveNav() {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (href === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    formStatus.textContent = "Sending message...";

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        formStatus.textContent = "Message sent successfully.";
        contactForm.reset();
      } else {
        formStatus.textContent = "Something went wrong. Please try again.";
      }
    } catch (error) {
      formStatus.textContent = "Network error. Please try again later.";
    }
  });
}