import { Booking } from "../../infrastructure/domain/Entities.js";

const bookings = JSON.parse(localStorage.getItem("bookings"));

console.log(bookings);

const formdata = new FormData(document.getElementById("form"));
const data = Object.fromEntries(formdata.entries());

const user = JSON.parse(localStorage.getItem("currUser"));
