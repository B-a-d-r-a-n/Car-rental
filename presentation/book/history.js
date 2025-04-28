const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');

    
if (bookings.length === 0) {
  document.getElementById('history-list').innerHTML = `
    <div class="alert alert-warning text-center">
      You have no bookings history yet.
    </div>
  `;
} else {
  
  const historyContainer = document.getElementById('history-list');
  
  bookings.forEach((booking) => {
    
    const selectedCar = JSON.parse(localStorage.getItem('cars')).find(car => car.id == booking.carId);

    if (selectedCar) {
      const bookingCard = `
        <div class="booking-card">
          <h5 class="mb-3">${selectedCar.brand} ${selectedCar.model}</h5>
          <p><strong>Customer Name:</strong> ${booking.customerName}</p>
          <p><strong>Email:</strong> ${booking.customerEmail}</p>
          <p><strong>Phone:</strong> ${booking.customerPhone}</p>
          <p><strong>Pickup Date:</strong> ${booking.pickupDate}</p>
          <p><strong>Return Date:</strong> ${booking.dropoffDate}</p>
          <p><strong>Total Amount:</strong> $${booking.totalAmount}</p>
        </div>
      `;
      historyContainer.innerHTML += bookingCard;
    }
  });
}