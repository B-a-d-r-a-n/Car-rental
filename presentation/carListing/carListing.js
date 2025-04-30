function getCarsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("cars")) || [];
}

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
                <p class="card-text">Rent per day: <span>$${car.rentPerDay}</span></p>
                <a href="../carDetails/carDetails.html?id=${car.id}" class="btn btn-outline-primary mt-auto">View Details</a>
                </div>
            </div>
        `;
    container.appendChild(card);
  });
}

function applyFilters() {
  const searchQuery = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();
  const type = document.getElementById("filterType").value;
  const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
  const maxPrice =
    parseFloat(document.getElementById("maxPrice").value) || Infinity;
  const availableOnly = document.getElementById("availableOnly").checked;

  const cars = getCarsFromLocalStorage();

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

// Initial render: show all cars regardless of availability
renderCars(getCarsFromLocalStorage());
