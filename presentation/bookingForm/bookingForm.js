import { Car, Booking } from "../../infrastructure/domain/Entities.js";

// Read carId from URL
const params = new URLSearchParams(window.location.search);
const carId = params.get("carId");

// Load cars from localStorage
const cars = JSON.parse(localStorage.getItem("cars"));
const selectedCar = cars.find((car) => car.id == carId);
let pendingBooking = null;
// Display car details
if (selectedCar) {
  document.getElementById("car-details").innerHTML = `
    <div class="car-details-container">
      <h2 class="car-title text-center mb-2">${selectedCar.brand} ${selectedCar.model}</h2>
      <img src="${selectedCar.image}" alt="${selectedCar.model}" class="car-image " />
      <div class="car-info">
        <p><strong>Description:</strong> ${selectedCar.description}</p>
        <p><strong>Price per day:</strong> $${selectedCar.rentPerDay}</p>
      </div>
    </div>
  `;
}

// Handle form submission
function showError(id, message) {
  document.getElementById(id).textContent = message;
}

function clearError(id) {
  document.getElementById(id).textContent = "";
}

// Validation functions
const nameRegex = /^[A-Za-z\s]{3,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^01[0-2,5]{1}[0-9]{8}$/;
const locationRegex = /^[A-Za-z\s]{3,}$/;

function validateField(id, value, regex, errorId, errorMsg) {
  if (!regex.test(value.trim())) {
    showError(errorId, errorMsg);
    return false;
  } else {
    clearError(errorId);
    return true;
  }
}

document.getElementById("fullName").addEventListener("input", (e) =>
  validateField("fullName", e.target.value, nameRegex, "fullName-error", "Enter a valid name (letters only).")
);

document.getElementById("email").addEventListener("input", (e) =>
  validateField("email", e.target.value, emailRegex, "email-error", "Enter a valid email.")
);

document.getElementById("phone").addEventListener("input", (e) =>
  validateField("phone", e.target.value, phoneRegex, "phone-error", "Enter a valid Egyptian phone number.")
);

document.getElementById("pickupLocation").addEventListener("input", (e) =>
  validateField("pickupLocation", e.target.value, locationRegex, "pickupLocation-error", "Enter a valid pickup location.")
);

document.getElementById("dropoffLocation").addEventListener("input", (e) =>
  validateField("dropoffLocation", e.target.value, locationRegex, "dropoffLocation-error", "Enter a valid dropoff location.")
);


// Booking form submit
document.getElementById("booking-form").addEventListener("submit", function (e) {
  e.preventDefault();

  
  const customerName = document.getElementById("fullName").value.trim();
  const customerEmail = document.getElementById("email").value.trim();
  const customerPhone = document.getElementById("phone").value.trim();
  const pickupLocation = document.getElementById("pickupLocation").value.trim();
  const pickupDate = document.getElementById("pickupDate").value;
  const dropoffLocation = document.getElementById("dropoffLocation").value.trim();
  const dropoffDate = document.getElementById("returnDate").value;

  // validation 
  let isValid = true;
  if (!validateField("fullName", customerName, nameRegex, "fullName-error", "Enter a valid name.")) isValid = false;
  if (!validateField("email", customerEmail, emailRegex, "email-error", "Enter a valid email.")) isValid = false;
  if (!validateField("phone", customerPhone, phoneRegex, "phone-error", "Enter a valid Egyptian phone number.")) isValid = false;
  if (!validateField("pickupLocation", pickupLocation, locationRegex, "pickupLocation-error", "Enter a valid pickup location.")) isValid = false;
  if (!validateField("dropoffLocation", dropoffLocation, locationRegex, "dropoffLocation-error", "Enter a valid dropoff location.")) isValid = false;
  if (!pickupDate) { showError("pickupDate-error", "Please select a pickup date."); isValid = false; } else { clearError("pickupDate-error"); }
  if (!dropoffDate) { showError("returnDate-error", "Please select a return date."); isValid = false; }
  else if (new Date(dropoffDate) <= new Date(pickupDate)) {
    showError("returnDate-error", "Return date must be after pickup date."); isValid = false;
  } else {
    clearError("returnDate-error");
  }

  if (!isValid) return;

  // display price
  const rentalDays = (new Date(dropoffDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24);
  const totalAmount = selectedCar.rentPerDay * rentalDays;

  // save  new booking in class
  pendingBooking = new Booking(
    Date.now(),
    selectedCar.id,
    customerName,
    customerEmail,
    customerPhone,
    pickupDate,
    dropoffDate,
    "pending",
    totalAmount
  );

 
  document.getElementById("booking-summary").innerHTML = `
  <ul class="list-group list-group-flush">
    <li class="list-group-item"><strong>Car:</strong> ${selectedCar.brand} ${selectedCar.model}</li>
    <li class="list-group-item"><strong>Name:</strong> ${customerName}</li>
    <li class="list-group-item"><strong>Email:</strong> ${customerEmail}</li>
    <li class="list-group-item"><strong>Phone:</strong> ${customerPhone}</li>
    <li class="list-group-item"><strong>Pickup:</strong> ${pickupLocation} (${pickupDate})</li>
    <li class="list-group-item"><strong>Drop-off:</strong> ${dropoffLocation} (${dropoffDate})</li>
    <li class="list-group-item"><strong>Total:</strong> $${totalAmount}</li>
  </ul>
`;

 
  const confirmModal = new bootstrap.Modal(document.getElementById("confirmBookingModal"));
  confirmModal.show();
});
document.getElementById("confirmBookingBtn").addEventListener("click", function () {
  if (!pendingBooking) return;

  //save in local storage
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.push(pendingBooking);
  localStorage.setItem("bookings", JSON.stringify(bookings));

  // decrease available stock
  selectedCar.availableStock -= 1;
  localStorage.setItem("cars", JSON.stringify(cars));

  localStorage.setItem("currentCustomerEmail", pendingBooking.customerEmail);

  // Toast 
  const successToast = new bootstrap.Toast(document.getElementById("successToast"));
  successToast.show();

  setTimeout(() => {
    window.location.href = "../BookingHistory/bookingHistory.html";
  }, 1500);
});

