window.onload = function () {
  initimg();
};
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
    let {
      brand: brand,
      description: description,
      model: model,
      type: type,
      image: image,
    } = car;
    let c = document.querySelector(".carousel-inner");
    const newSlide = document.createElement("div");
    newSlide.classList.add("carousel-item");
    const img = document.createElement("img");
    img.src = image;
    img.style.objectFit = "cover";
    img.style.height = "350px";
    img.classList.add("d-block", "w-100");
    img.alt = "local storage image";
    const slidetextdiv = document.createElement("div");
    const slideheader = document.createElement("h5");
    const slidedes = document.createElement("p");
    slidetextdiv.classList.add("carousel-caption", "d-none", "d-md-block");
    slideheader.innerText = brand;
    slidedes.innerText = description;
    slidetextdiv.appendChild(slideheader);
    slidetextdiv.appendChild(slidedes);

    newSlide.classList.add("carousel-item");
    newSlide.appendChild(img);
    newSlide.appendChild(slidetextdiv);
    c.appendChild(newSlide);
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
