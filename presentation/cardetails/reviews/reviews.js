import { Review } from "../../../infrastructure/domain/Entities.js";
const carId = 6;

function loadReviewsForCar(carId) {
  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  const carReviews = reviews.filter((review) => review.carId === carId);
  const reviewsList = document.getElementById("reviews-list");

  reviewsList.innerHTML = "";

  if (carReviews.length === 0) {
    reviewsList.innerHTML = `<div class="alert alert-info">No reviews yet. Be the first to review this car!</div>`;
    return;
  }

  carReviews.forEach((review) => {
    const reviewCard = document.createElement("div");
    reviewCard.classList.add("col-md-6");

    reviewCard.innerHTML = `
            <div class="card mb-3">
            <div class="card-body d-flex flex-column">
                <div class="mb-2">
                <h5 class="card-title mb-0">${review.customerName}</h5>
                </div>
                <div class="mb-3">
                ${renderStars(review.rating)}
                </div>
                <p class="card-text">${review.comment}</p>
                <p class="card-text text-end mt-auto">
                <small class="text-muted">${new Date(
                  review.date
                ).toLocaleDateString()}</small>
                </p>
            </div>
            </div>
        `;

    reviewsList.appendChild(reviewCard);
  });
}

// stars
function renderStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += `⭐ `;
    } else {
      stars += `<i class="far fa-star text-warning"></i> `;
    }
  }
  return stars;
}

// save new reivew to localStorage
document.getElementById("review-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const customerName = document.getElementById("customerName").value.trim();
  const rating = parseInt(document.getElementById("rating").value);
  const comment = document.getElementById("comment").value.trim();

  if (!customerName || !rating || !comment) {
    alert("Please fill all fields.");
    return;
  }

  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

  const newReview = new Review(
    reviews.length > 0 ? reviews[reviews.length - 1].id + 1 : 1,
    carId,
    customerName,
    rating,
    comment
  );

  reviews.push(newReview);
  localStorage.setItem("reviews", JSON.stringify(reviews));

  // تحديث العرض
  loadReviewsForCar(carId);

  // تفريغ الفورم
  document.getElementById("review-form").reset();

  // ملاحظة نجاح
  // alert("Review submitted successfully!");
});

// تحميل الريفيوز عند فتح الصفحة
loadReviewsForCar(carId);
