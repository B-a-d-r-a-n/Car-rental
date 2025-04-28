const bookings = JSON.parse(localStorage.getItem('bookings')) || [];

const historyContainer = document.getElementById('history-list');

if (bookings.length === 0) {
  historyContainer.innerHTML = `
    <div class="alert alert-warning text-center">
      You have no bookings history yet.
    </div>
  `;
} else {
  const cars = JSON.parse(localStorage.getItem('cars')) || [];

  let tableHTML = `
    <div class="table-responsive">
      <table class="table table-striped align-middle text-center">
        <thead class="table-dark">
          <tr>
            <th>Car</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Pickup Date</th>
            <th>Return Date</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
  `;

  bookings.forEach((booking) => {
    const selectedCar = cars.find(car => car.id == booking.carId);

    if (selectedCar) {
      tableHTML += `
        <tr>
          <td>${selectedCar.brand} ${selectedCar.model}</td>
          <td>${booking.customerName}</td>
          <td>${booking.customerEmail}</td>
          <td>${booking.customerPhone}</td>
          <td>${booking.pickupDate}</td>
          <td>${booking.dropoffDate}</td>
          <td>$${booking.totalAmount}</td>
        </tr>
      `;
    }
  });

  tableHTML += `
        </tbody>
      </table>
    </div>
  `;

  historyContainer.innerHTML = tableHTML;
}
