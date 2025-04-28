import { Car, Booking } from "../../infrastructure/domain/Entities.js";

// Read carId from URL
const params = new URLSearchParams(window.location.search);
const carId = params.get('carId');

// Load cars from localStorage
const cars = JSON.parse(localStorage.getItem('cars')).map(carData => Object.assign(new Car(), carData));

// Find selected car
const selectedCar = cars.find(car => car.id == carId);

// Display car details in a more stylish way
if (selectedCar) {
  document.getElementById('car-details').innerHTML = `
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

// Handle booking form submit
document.getElementById('booking-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const customerName = document.getElementById('fullName').value;
  const customerEmail = document.getElementById('email').value;
  const customerPhone = document.getElementById('phone').value;
  const pickupDate = document.getElementById('pickupDate').value;
  const dropoffDate = document.getElementById('returnDate').value;

  const rentalDays = (new Date(dropoffDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24);
  const totalAmount = selectedCar.rentPerDay * rentalDays;

  const newBooking = new Booking(
    Date.now(), // Generate unique ID
    selectedCar.id,
    customerName,
    customerEmail,
    customerPhone,
    pickupDate,
    dropoffDate,
    "confirmed",
    totalAmount
  );

  // Read existing bookings from localStorage and ensure it's an array
  let bookings = JSON.parse(localStorage.getItem('bookings')) || [];

  // Ensure bookings is an array before pushing
  if (!Array.isArray(bookings)) {
    bookings = [];
  }

  // Add new booking
  bookings.push(newBooking);

  // Save updated bookings to localStorage
  localStorage.setItem('bookings', JSON.stringify(bookings));

  // Redirect to the history page
  window.location.href = 'history.html';
});
