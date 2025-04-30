import { Car, Booking } from "../../infrastructure/domain/Entities.js";

// Read carId from URL
const params = new URLSearchParams(window.location.search);
const carId = params.get("carId");

// Load cars from localStorage
const cars = JSON.parse(localStorage.getItem("cars")).map((carData) =>
  Object.assign(new Car(), carData)
);

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

document
  .getElementById("booking-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // قراءة الداتا
    const customerName = document.getElementById("fullName").value.trim();
    const customerEmail = document.getElementById("email").value.trim();
    const customerPhone = document.getElementById("phone").value.trim();
    const pickupLocation = document
      .getElementById("pickupLocation")
      .value.trim();
    const pickupDate = document.getElementById("pickupDate").value;
    const dropoffLocation = document
      .getElementById("dropoffLocation")
      .value.trim();
    const dropoffDate = document.getElementById("returnDate").value;
    const note = document.getElementById("note").value.trim();

    // الفاليديشن
    if (
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !pickupLocation ||
      !pickupDate ||
      !dropoffLocation ||
      !dropoffDate
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(customerPhone)) {
      alert("Please enter a valid phone number.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (pickupDate < today) {
      alert("Pickup date must be today or later.");
      return;
    }
    if (dropoffDate <= pickupDate) {
      alert("Return date must be after pickup date.");
      return;
    }

    // حساب عدد الأيام والسعر
    const rentalDays =
      (new Date(dropoffDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24);
    const totalAmount = selectedCar.rentPerDay * rentalDays;

    // إنشاء البوكنج
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

    // حفظ الداتا
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    if (!Array.isArray(bookings)) {
      bookings = [];
    }
    bookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    // توست رسالة نجاح
    const successToast = new bootstrap.Toast(
      document.getElementById("successToast")
    );
    successToast.show();

    setTimeout(() => {
      window.location.href = "../BookingHistory/bookingHistory.html";
    }, 1500);
  });
console.log(key);