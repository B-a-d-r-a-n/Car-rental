import { Car, Booking } from "../../infrastructure/domain/Entities.js";

// Read carId from URL
const params = new URLSearchParams(window.location.search);
const carId = params.get("carId");

// Load cars from localStorage
const cars = JSON.parse(localStorage.getItem("cars"));
const selectedCar = cars.find((car) => car.id == carId);

// Display car details
if (selectedCar) {
  document.getElementById("car-details").innerHTML = `
    <div class="car-details-container">
      <h2 class="car-title">${selectedCar.brand} ${selectedCar.model}</h2>
      <img src="${selectedCar.image}" alt="${selectedCar.model}" class="car-image" />
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

  let isValid = true;

  if (!validateField("fullName", customerName, nameRegex, "fullName-error", "Enter a valid name.")) isValid = false;
  if (!validateField("email", customerEmail, emailRegex, "email-error", "Enter a valid email.")) isValid = false;
  if (!validateField("phone", customerPhone, phoneRegex, "phone-error", "Enter a valid Egyptian phone number.")) isValid = false;
  if (!validateField("pickupLocation", pickupLocation, locationRegex, "pickupLocation-error", "Enter a valid pickup location.")) isValid = false;
  if (!validateField("dropoffLocation", dropoffLocation, locationRegex, "dropoffLocation-error", "Enter a valid dropoff location.")) isValid = false;

  if (!pickupDate) {
    showError("pickupDate-error", "Please select a pickup date.");
    isValid = false;
  } else {
    clearError("pickupDate-error");
  }

  if (!dropoffDate) {
    showError("returnDate-error", "Please select a return date.");
    isValid = false;
  } else if (new Date(dropoffDate) <= new Date(pickupDate)) {
    showError("returnDate-error", "Return date must be after pickup date.");
    isValid = false;
  } else {
    clearError("returnDate-error");
  }

  if (!isValid) return;

  const rentalDays = (new Date(dropoffDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24);
  const totalAmount = selectedCar.rentPerDay * rentalDays;

  const newBooking = new Booking(
    Date.now(),
    selectedCar.id,
    customerName,
    customerEmail,
    customerPhone,
    pickupDate,
    dropoffDate,
    "confirmed",
    totalAmount
  );

  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.push(newBooking);
  localStorage.setItem("bookings", JSON.stringify(bookings));

  const successToast = new bootstrap.Toast(document.getElementById("successToast"));
  successToast.show();
  
  localStorage.setItem("currentCustomerEmail", newBooking.customerEmail);

  setTimeout(() => {
    window.location.href = "../BookingHistory/bookingHistory.html";
  }, 1500);
});
