import { User } from "../../infrastructure/domain/Entities.js";
const user = localStorage.getItem("currUser");
user ? (window.location.href = "../../index.html") : null;
const loadingScreen = document.getElementById("loadingScreen");
loadingScreen.classList.add("hidden");
setTimeout(() => {
  loadingScreen.remove();
}, 1000);
const toast = document.getElementById("liveToast");
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);

const users = JSON.parse(localStorage.getItem("users")) || [];

const form = document.getElementById("signUp");

function generateUniqueNumberId() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return Number(`${timestamp}${random}`);
}

const regex = {
  username: /^[a-zA-Z0-9_-]{3,20}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

function validateInput(input, value) {
  if (!value) {
    return `${input} is required`;
  }
  if (!regex[input].test(value)) {
    switch (input) {
      case "username":
        return "username must be 3-20 characters long and can only contain letters, numbers, underscores, or hyphens";
      case "email":
        return "Please enter a valid email address (e.g., user@domain.com)";
      case "password":
        return "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)";
    }
  }
  return null;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const errors = {};
  const formdata = new FormData(form);
  const data = Object.fromEntries(formdata.entries());

  document.querySelectorAll(".err").forEach((err) => (err.textContent = ""));

  for (const input in regex) {
    const err = validateInput(input, data[input]);
    if (err) {
      errors[input] = err;
      document.getElementById(`${input}-err`).textContent = err;
    }
  }

  const existingUser = users.find((user) => user.email === data.email);
  if (existingUser) {
    errors.email = "This email is already registered";
    document.getElementById("email-err").textContent = errors.email;
  }

  if (Object.keys(errors).length > 0) {
    toast.innerHTML = `
    <div class="toast-header bg-danger text-white">
   <strong class="me-auto">Failed!</strong>
   <button
     type="button"
     class="btn-close"
     data-bs-dismiss="toast"
     aria-label="Close"
   ></button>
 </div>
 <div class="toast-body bg-danger text-white">
   Sign up failed !
 </div>`;
    toastBootstrap.show();

    return;
  }

  const user = new User(
    generateUniqueNumberId(),
    data.username,
    data.email,
    data.password
  );

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  toast.innerHTML = `
  <div class="toast-header bg-success text-white">
 <strong class="me-auto">Successful!</strong>
 <button
   type="button"
   class="btn-close"
   data-bs-dismiss="toast"
   aria-label="Close"
 ></button>
</div>
<div class="toast-body bg-success text-white">
 Sign up successful! Welcome ${data.username}.
</div>`;
  toastBootstrap.show();
  form.reset();
  setTimeout(() => {
    window.location.href = "../signIn/signIn.html";
  }, 1500);
});

////////////////////

const root = document.documentElement;
let savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.querySelector(".fas").classList.add("fa-sun");
  document.querySelector(".fas").classList.remove("fa-moon");
  localStorage.setItem("theme", "dark");
  root.setAttribute("data-bs-theme", "dark");
} else {
  document.querySelector(".fas").classList.remove("fa-sun");
  document.querySelector(".fas").classList.add("fa-moon");

  localStorage.setItem("theme", "light");
  root.setAttribute("data-bs-theme", "light");
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
