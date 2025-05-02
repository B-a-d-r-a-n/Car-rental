function displayuserData() {
  let headername = document.querySelector(".headerName");
  let profileimg = document.querySelector(".profile-img");
  let personMail = document.querySelector(".personMail");
  let name = document.querySelector(".fullname");
  let password = document.querySelector(".pass");
  let headername2 = document.querySelector(".headername");
  let headermail = document.querySelector(".headermail");
  let reg = document.querySelector(".dateofregister");
  let editbtn = document.querySelector(".editbtn");

  const userData = localStorage.getItem("currUser");
  const user = JSON.parse(userData);
  headername2.innerText = user.username;

  headername.innerText = "welcome," + user.username;
  profileimg.setAttribute("src", user.userImg);
  personMail.setAttribute("value", user.email);
  name.setAttribute("value", user.username);
  password.setAttribute("value", user.password);
  headermail.innerText = user.email;
  reg.innerText = user.registeredAt;

  editbtn.addEventListener("click", () => {
    let inputlist = document.querySelectorAll("input");
    inputlist.forEach((element) => {
      console.log(element);
    });
  });
  console.log(password);
}
displayuserData();

function saveChanges() {
  const fullName = document.getElementById("editFullName");
  const email = document.getElementById("editEmail");
  const password = document.getElementById("editPassword");
  const imglink = document.getElementById("imglink");
  const updateProfBtn = document.querySelector(".updateProfileBtn");
  const userData = localStorage.getItem("currUser");
  const user = JSON.parse(userData);

  document.querySelector(".editbtn").addEventListener("click", () => {
    fullName.value = document.querySelector(".fullname").value;
    email.value = document.querySelector(".personMail").value;
    password.value = document.querySelector(".pass").value;
  });

  updateProfBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const userlist = JSON.parse(localStorage.getItem("users"));

    user.username = fullName.value;
    user.password = password.value;
    user.email = email.value;
    user.userImg = imglink.value;

    userlist.forEach((element, index) => {
      if (element.id === user.id) {
        userlist[index] = user;
        localStorage.setItem("users", JSON.stringify(userlist));
        localStorage.setItem("currUser", JSON.stringify(user));
      }
    });
  });
}

document.querySelector("#logout").addEventListener("click", () => {
  localStorage.removeItem("currUser");
  window.location.href = "../signIn/signIn.html";
});

document.querySelector("#home").addEventListener("click", () => {
  window.location.href = "../../index.html";
});


const root = document.documentElement;
function toggleTheme() {
  if (root.getAttribute('data-bs-theme') === 'dark') {
    root.setAttribute('data-bs-theme', 'light');
  } else {
    root.setAttribute('data-bs-theme', 'dark');
  }
}

document.getElementById('theme-toggle-button').addEventListener('click', toggleTheme);



saveChanges();
