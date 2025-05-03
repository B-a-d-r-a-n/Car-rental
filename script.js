window.onload = function () {
  initimg();
  displayOffers();
};
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
  console.log("fdefdfd");
}

function initimg() {
  let paresed = JSON.parse(localStorage.getItem("cars"));
  let featured = paresed.filter((c) => {
    return c.isFeatured == true;
  });
  featured.forEach(function (car) {
    let c = document.querySelector(".featuredCar");
    const newSlide = document.createElement("div");
    c.insertAdjacentHTML(
      "beforeend",
      `
      <div class="carousel-item ">
          <div class="car-slide">
            <div class="image-wrapper">
              <img src="${car.image}" class="car-img w-100 object-fit-cover" style="max-height:600px" alt="Car Image">
              <div class="car-info-float" style="height: auto;">
  <div class="car-box "  >
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

  if (user && user.role === "admin") {
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

            <div  class="position-absolute top-50 start-50 translate-middle text-white px-5 text-center"   >
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

document.querySelector("#logout").addEventListener("click", () => {
  localStorage.removeItem("currUser");
  window.location.href = "./presentation/signIn/signIn.html";
});
dynamicNavbarFor_user();
