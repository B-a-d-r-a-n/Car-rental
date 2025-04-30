document.querySelectorAll(".rent-now-btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    const carId = this.getAttribute("data-id");
    window.location.href = `../bookingForm/bookingForm.html?carId=${carId}`;
  });
});
