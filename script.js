window.onload = function () {
  initimg();
  displayOffers();
};
const root = document.documentElement;
function toggleTheme() {
  if (root.getAttribute("data-bs-theme") === "dark") {
    root.setAttribute("data-bs-theme", "light");
  } else {
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
  console.log("fdefdfd");
}

function initimg() {
  console.log(JSON.parse(localStorage.getItem("cars")));
  let paresed = JSON.parse(localStorage.getItem("cars"));

  paresed.forEach(function (car) {
    let c = document.querySelector(".featuredCar");
    const newSlide = document.createElement("div");
    c.insertAdjacentHTML(
      "beforeend",
      `
      <div class="carousel-item ">
          <div class="car-slide">
            <div class="image-wrapper">
              <img src="${car.image}" class="car-img" alt="Car Image">
              <div class="car-info-float" style="height: auto;>
  <div class="car-box row "  >
    <div class="car-details col-12 col-md-6 d-flex flex-column">
      <h3>${car.brand}</h3>
      <div class="icons">
        <span><i class="bi bi-person-fill"></i> 4 Seats</span>
        <span><i class="bi bi-gear"></i> Auto</span>
        <span><i class="bi bi-person-badge"></i> ${car.model}</span>
        <p><i class="bi bi-suitcase-fill"></i> ${car.description}</p>
      </div>
    </div>
    <div class="car-price col-12 col-md-6 d-flex flex-column justify-content-between">
      <button class="details-btn btn btn-primary">Details</button>
      <div class="price d-flex align-items-center">
        <span class="amount">$${car.rentPerDay}</span>
        <span class="per-day">/day</span>
      </div>
    </div>
  </div>
</div>

              
              
            </div>
          </div>
        </div>
      `
    );
  });
}

console.log(JSON.parse(localStorage.getItem("categories")));

//#Region badran - view admin dashboard if logged in

function dynamicNavbarInsertion() {
  const userData = localStorage.getItem("currUser");
  const user = JSON.parse(userData);
  const adminButton = document.querySelector("#navContainer .nav-item[hidden]");
  const loginButton = document.querySelector(
    '#navContainer .nav-item a[href="./presentation/signIn/signIn.html"]'
  ).parentElement;

  if (user.role === "admin") {
    adminButton.removeAttribute("hidden");
    adminButton.querySelector("a").textContent = "Dashboard";
    loginButton.setAttribute("hidden", "");
  } else {
    adminButton.setAttribute("hidden", "");
    loginButton.removeAttribute("hidden");
  }
}

document.addEventListener("DOMContentLoaded", dynamicNavbarInsertion);
//#EndRegion badran

//#regin Atallah available offers

function displayOffers() {
  let offers = JSON.parse(localStorage.getItem("promotions"));
  let offerslide = document.querySelector(".offerslider");
  offers.forEach(function (element) {
    let con = document.createElement("div");
    con.classList.add("carousel-item", "position-relative");
    con.innerHTML = `<img src="${element.imageUrl}" class="d-block w-100 rounded-4"
              style="height: 500px; object-fit: cover; filter: brightness(60%);" alt="Hero Offer">

            <div class="position-absolute top-50 sssss translate-middle-y text-white px-5" style="max-width: 600px;left:20%;"    >
              <h2 class="fw-bold display-5">${element.title}</h2>
              <p class="mt-3">
                <a href="#" class="btn btn-light btn-lg fw-bold rounded-pill">${element.description}</a>
              </p>
            </div>`;
    offerslide.appendChild(con);
  });
}

function dynamicNavbarFor_user() {
  const navLogin = document.querySelector("#loginBtn");
  const profileIcon = document.querySelector(".profIcon");
  const userData = localStorage.getItem("currUser");
  const user = JSON.parse(userData);
  console.log(profileIcon);
  console.log(user);
  if (user.role === "user") {
    navLogin.setAttribute("hidden", "");
    profileIcon.removeAttribute("hidden");

  } else {
    navLogin.removeAttribute("hidden");
  }
  profileIcon.addEventListener("click", () => {
    window.location.href = "./presentation/userProfile/profile.html";
  });
}
dynamicNavbarFor_user();


