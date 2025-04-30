const loadingScreen = document.getElementById("loadingScreen");
loadingScreen.classList.add("hidden");
setTimeout(() => {
  loadingScreen.remove();
}, 1000);
const toast = document.getElementById("liveToast");
const form = document.getElementById("signIn");
const users = JSON.parse(localStorage.getItem("users")) || [];
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
const regex = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

function validateInput(input, value) {
  if (!value) {
    return `${input} is required`;
  }
  if (!regex[input].test(value)) {
    switch (input) {
      case "email":
        return "Please enter a valid email address (e.g., user@domain.com)";
      case "password":
        return "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)";
    }
  }
  return null;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const errors = {};
  const formdata = new FormData(form);
  const data = Object.fromEntries(formdata.entries());

  document.querySelectorAll(".err").forEach((err) => {
    err.textContent = "";
  });
  for (const input in regex) {
    const err = validateInput(input, data[input]);

    if (err) {
      errors[input] = err;
      document.getElementById(`${input}-err`).textContent = err;
    }
  }
  if (Object.keys(errors).length > 0) {
    toast.innerHTML = `
    <div class="toast-header bg-danger text-white">
   <strong class="me-auto">Failed!</strong>
   <button
     type="button"
     class="btn-close"
     data-bs-dismiss="toast"
     aria-label="Close"
   ></button>
 </div>
 <div class="toast-body bg-danger text-white">
   Sign in failed !
 </div>`;
    toastBootstrap.show();
    return;
  }

  const currUser = users.find((user) => {
    return (
      user.email.toLowerCase() === data.email.toLowerCase() &&
      user.password === data.password
    );
  });
  localStorage.setItem("currUser", JSON.stringify(currUser));

  toast.innerHTML = `
           <div class="toast-header bg-success text-white">
          <strong class="me-auto">Successful!</strong>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div class="toast-body bg-success text-white">
          Login successful! Welcome ${currUser.username}.
        </div>`;
  toastBootstrap.show();
  setTimeout(() => {
    window.location.href = "./../../index.html";
  }, 1500);
});
