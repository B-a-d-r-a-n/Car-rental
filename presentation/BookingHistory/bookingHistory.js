// Get current user email
const currentEmail = localStorage.getItem("currentCustomerEmail");

// Load bookings and cars
const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];
const allCars = JSON.parse(localStorage.getItem("cars")) || [];

const userBookings = allBookings.filter(
  (booking) => booking.customerEmail === currentEmail
);

const historyList = document.getElementById("history-list");

if (userBookings.length === 0) {
  historyList.innerHTML = `<div class="alert alert-warning text-center">No bookings found for your email.</div>`;
} else {
  const table = document.createElement("table");
  table.className = "table table-striped table-bordered table-responsive fs-6";

  table.innerHTML = `
    <thead class="table-dark">
      <tr>
        <th>User Email</th>
        <th>Car</th>
        <th>Pickup Date</th>
        <th>Return Date</th>
        <th>Status</th>
        <th>Total Amount</th>
        
      </tr>
    </thead>
    <tbody>
      ${userBookings
        .map((b) => {
          const car = allCars.find((c) => c.id === b.carId);
          const carName = car ? `${car.brand} ${car.model}` : "Unknown Car";

          return `
            <tr>
             <td>${b.customerEmail}</td>
              <td>${carName}</td>
              <td>${new Date(b.pickupDate).toLocaleDateString()}</td>
              <td>${new Date(b.dropoffDate).toLocaleDateString()}</td>
              <td><span class="badge fs-6">${b.status}</span></td>
              <td>$${b.totalAmount.toFixed(2)}</td>
              
            </tr>
          `;
        })
        .join("")}
    </tbody>
  `;

  historyList.appendChild(table);
}



