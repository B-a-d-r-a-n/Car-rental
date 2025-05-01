// function getCarsFromLocalStorage() {
//   return JSON.parse(localStorage.getItem("cars")) || [];
// }

const cars = JSON.parse(localStorage.getItem("cars")) || [];

function renderCars(cars) {
  const container = document.getElementById("carList");
  container.innerHTML = "";
  if (cars.length === 0) {
    container.innerHTML =
      '<p class="text-center">No cars match your search.</p>';
    return;
  }
  cars.forEach((car) => {
    const card = document.createElement("div");
    card.className = " col-lg-6";
    card.innerHTML = `
            <div class="card h-100">
                <img src="${car.image}" class="card-img-top" alt="${car.brand} ${car.model}">
                <div class="card-body d-flex flex-column">
                <h5 class="card-title">${car.brand} ${car.model}</h5>
                  <p class="card-text">Type: ${car.type}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <p class="card-text mt-auto"><span>$${car.rentPerDay}</span>/day</p>
                    <a href="../carDetails/carDetails.html?id=${car.id}" class="btn btn-outline-primary">Details</a>
                  </div> 
                </div>
            </div>
        `;
    container.appendChild(card);
  });
}

function applyFilters() {
  const searchQuery = document.getElementById("searchInput").value.trim().toLowerCase();
  const type = document.getElementById("filterType").value;
  const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
  const maxPrice = parseFloat(document.getElementById("maxPrice").value) || Infinity;
  const availableOnly = document.getElementById("availableOnly").checked;

  // const cars = getCarsFromLocalStorage();

  const filtered = cars.filter((car) => {
    const matchesSearch =
      car.brand.toLowerCase().includes(searchQuery) ||
      car.model.toLowerCase().includes(searchQuery);

    return (
      (!searchQuery || matchesSearch) &&
      (!type || car.type === type) &&
      car.rentPerDay >= minPrice &&
      car.rentPerDay <= maxPrice &&
      (!availableOnly || car.isAvailable)
    );
  });

  renderCars(filtered);
}

document.getElementById("applyFilters").addEventListener("click", applyFilters);

// renderCars(getCarsFromLocalStorage());
renderCars(cars);





// dark mode
const toggleButton = document.getElementById("toggleDarkMode");
  const body = document.body;

  // Check if mode is saved in localStorage
  if (localStorage.getItem("dark-mode") === "enabled") {
    body.classList.add("dark-mode");
  }

  toggleButton.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("dark-mode", "enabled");
    } else {
      localStorage.setItem("dark-mode", "disabled");
    }
  });
