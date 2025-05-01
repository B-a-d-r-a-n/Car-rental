import { Car, Booking } from "../../infrastructure/domain/Entities.js";

// Read carId from URL
const params = new URLSearchParams(window.location.search);
const carId = params.get("carId");

// Load cars from localStorage
const cars = JSON.parse(localStorage.getItem("cars"));
// Find selected car
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



// Handle form submission on booking-form.js
document
  .getElementById("booking-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const customerName = document.getElementById("fullName").value.trim();
    const customerEmail = document.getElementById("email").value.trim();
    const customerPhone = document.getElementById("phone").value.trim();
    const pickupLocation = document.getElementById("pickupLocation").value.trim();
    const pickupDate = document.getElementById("pickupDate").value;
    const dropoffLocation = document.getElementById("dropoffLocation").value.trim();
    const dropoffDate = document.getElementById("returnDate").value;

    // Validation for required fields
    if (!customerName || !customerEmail || !customerPhone || !pickupLocation || !pickupDate || !dropoffLocation || !dropoffDate) {
      alert("Please fill in all required fields.");
      return;
    }

    // Calculate rental days and total amount
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

    // Save the booking to localStorage
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    // Show success toast
    const successToast = new bootstrap.Toast(document.getElementById("successToast"));
    successToast.show();

    // Redirect after a delay
    setTimeout(() => {
      window.location.href = "../BookingHistory/bookingHistory.html";
    }, 1500);
  });
