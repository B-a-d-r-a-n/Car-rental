// Load bookings, users, and cars from localStorage
const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
const users = JSON.parse(localStorage.getItem("users")) || [];
const cars = JSON.parse(localStorage.getItem("cars")) || [];

// Assuming user is logged in and we have their userId stored in localStorage
const userId = localStorage.getItem("userId");  // Correct way to get userId

if (!userId) {
  alert("User is not logged in.");
  return;  // Stop execution if user is not logged in
}

// Filter bookings for the logged-in user
const userBookings = bookings.filter(booking => booking.userId === userId);

// Display user bookings
if (userBookings.length > 0) {
  const bookingsList = document.getElementById("bookings-list");

  userBookings.forEach(booking => {
    // Find the car details for this booking
    const car = cars.find(car => car.id === booking.carId);
    if (car) {
      // Create a div for each booking item
      const bookingItem = document.createElement("div");
      bookingItem.classList.add("booking-item");
      bookingItem.innerHTML = `
        <h3>Booking Reference: ${booking.bookingReference}</h3>
        <p><strong>Car:</strong> ${car.brand} ${car.model}</p>
        <p><strong>Status:</strong> ${booking.status}</p>
        <p><strong>Pickup Date:</strong> ${booking.pickupDate}</p>
        <p><strong>Dropoff Date:</strong> ${booking.dropoffDate}</p>
        <p><strong>Total Amount:</strong> $${booking.totalAmount}</p>
      `;
      bookingsList.appendChild(bookingItem);
    } else {
      console.log("Car not found for booking:", booking);
    }
  });
} else {
  document.getElementById("bookings-list").innerHTML = "<p>No bookings found.</p>";
}

// Decrease available stock for cars based on completed bookings
userBookings.forEach(booking => {
  const car = cars.find(car => car.id === booking.carId);
  if (car && car.availableStock > 0) {
    car.availableStock--;
    // If no cars left, mark as unavailable
    if (car.availableStock === 0) {
      car.isAvailable = false;
    }
  }
});

// Save updated cars array to localStorage
localStorage.setItem("cars", JSON.stringify(cars));
