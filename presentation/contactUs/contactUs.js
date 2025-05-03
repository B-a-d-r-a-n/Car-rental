const root = document.documentElement;
function toggleTheme() {
  if (root.getAttribute("data-bs-theme") === "dark") {
    document.querySelector(".fas").classList.remove("fa-sun");
    document.querySelector(".fas").classList.add("fa-moon");

    root.setAttribute("data-bs-theme", "light");
  } else {
    document.querySelector(".fas").classList.add("fa-sun");
    document.querySelector(".fas").classList.remove("fa-moon");
    root.setAttribute("data-bs-theme", "dark");
  }
}

document
  .getElementById("theme-toggle-button")
  .addEventListener("click", toggleTheme);
function handleactive(element) {
  let links = document.querySelectorAll(".nav-link");
  links.forEach(function (el) {
    el.classList.remove("active");
  });
  console.log(element);
  element.classList.add("active");
}

function dynamicNavbarFor_user() {
  const navLogin = document.querySelector("#loginBtn");
  const navLogout = document.querySelector("#Logout");

  const profileIcon = document.querySelector(".profIcon");
  const userData = localStorage.getItem("currUser");
  const user = JSON.parse(userData);

  if (user && (user.role === "user" || user.role === "admin")) {
    navLogin.setAttribute("hidden", "");
    profileIcon.removeAttribute("hidden");
    navLogout.removeAttribute("hidden");
  } else {
    navLogin.removeAttribute("hidden");
  }
  profileIcon.addEventListener("click", () => {
    window.location.href = "./presentation/userProfile/profile.html";
  });
}

dynamicNavbarFor_user();
