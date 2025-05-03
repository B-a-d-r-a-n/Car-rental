const urlParams = new URLSearchParams(window.location.search);
const carId = urlParams.get('id');
document.querySelector(".rent-now-btn").setAttribute("data-id", carId);

// Get cars data from localStorage
const cars = JSON.parse(localStorage.getItem('cars'));
const car = cars.find(c => c.id == carId); // Find the car by id

if (car) {
  // Update page content with car data
  document.getElementById('rentalByDay').innerText = car.rentPerDay + "$";
  document.getElementById('car-brands').innerText = car.brand;
  document.getElementById('car-model').innerText = car.model;
  document.getElementById('car-type').innerText = car.type;
  document.getElementById('car-deposit').innerText = car.rentalTerms.deposit + "$";

 //update rental condition
 document.querySelector('.age').innerText=car.rentalTerms.minAge;
 document.querySelector('.mile').innerText=car.rentalTerms.mileage;
 document.querySelector('.policy').innerText=car.rentalTerms.fuelPolicy;
 document.querySelector('.insurance').innerText=car.rentalTerms.insurance;

  const gallery = document.getElementById('car-gallery');
  const image = document.createElement("img");
  image.setAttribute("src", car.image);
  gallery.append(image);
} else {
 
  alert('Car not found!');
}

document.querySelectorAll(".rent-now-btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    const carId = this.getAttribute("data-id");
    const car = cars.find(c => c.id == carId); 

    if (car && car.isAvailable) {
      // If car is available, redirect to booking form
      window.location.href = `../bookingForm/bookingForm.html?carId=${carId}`;
    } else {
      // Show SweetAlert if the car is not available
      Swal.fire({
        icon: "error",
        title: "Sorry!",
        text: "This car is no longer available. Please choose another one.",
      });
    }
  });
});
