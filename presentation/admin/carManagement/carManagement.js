










let brand = document.querySelector('input[name="brand"]');
let model = document.querySelector('input[name="model"]');
let type = document.querySelector('input[name="type"]');
let description = document.querySelector("textarea");
let Img = document.querySelector('input[name="image"]');
let carid = document.querySelector('input[name="id"]');
let tableBody = document.querySelector("#carsTableBody");
let formbtn = document.querySelector("#formbutton");
function displayCars() {
  let carList = JSON.parse(localStorage.getItem("cars"));
  tableBody.innerHTML = "";

  carList.forEach((element, index) => {
    let tableRow = document.createElement("tr");
    tableRow.setAttribute("data-bs-toggle", "collapse");
    tableRow.setAttribute("data-bs-target", `#collapseRow${index}`);
    tableRow.style.cursor = "pointer";

    let tabledata1 = document.createElement("td");
    let tabledata2 = document.createElement("td");
    let tabledata3 = document.createElement("td");
    let tabledata4 = document.createElement("td");
    let tabledata5 = document.createElement("td");
    let tabledata6 = document.createElement("td");

    tabledata2.innerText = element.brand;
    tabledata3.innerText = element.model;
    tabledata4.innerText = element.type;
    tabledata5.innerText = element.description;
    tabledata6.innerText = element.id;

    let icon = document.createElement("i");
    icon.classList.add(
      "fa-solid",
      element.isAvailable ? "fa-check" : "fa-xmark"
    );
    icon.style.cursor = "pointer";
    tabledata6.appendChild(icon);

    let img = document.createElement("img");
    img.src = element.image;
    img.style.width = "150px";
    img.style.height = "70px";
    tabledata1.appendChild(img);

    tableRow.appendChild(tabledata1);
    tableRow.appendChild(tabledata2);
    tableRow.appendChild(tabledata3);
    tableRow.appendChild(tabledata4);
    tableRow.appendChild(tabledata5);
    tableRow.appendChild(tabledata6);

    tableBody.appendChild(tableRow);

    let collapseRow = document.createElement("tr");
    collapseRow.innerHTML = `
      <td colspan="6" class="p-0">
        <div id="collapseRow${index}" class="collapse">
          <div class="card card-body text-center">
            <button data-bs-toggle="modal" data-bs-target="#deleteCarModal" type="submit" class="btn btn-outline-warning m-2" onclick="updatecar(${index}, event)">
              <i class="fa-solid fa-pen-to-square"></i> Edit
            </button>
            <button  type="submit" class="btn btn-outline-danger m-2" onclick="deleteCar(${index}, event)">
              <i class="fa-solid fa-trash"></i> Delete
            </button>
            
          </div>
        </div>

        
      </td>
      
    `;
    tableBody.appendChild(collapseRow);
  });
}

function addNewCar(ev) {
  let newCar = {
    id: carid.value,
    brand: brand.value,
    model: model.value,
    type: type.value,
    description: description.value,
    image: Img.value,
    isAvailable: true,
  };
  let carList = JSON.parse(localStorage.getItem("cars"));
  carList.push(newCar);
  localStorage.setItem("cars", JSON.stringify(carList));
}

function deleteCar(index) {
  if (confirm("Are you sure you Want to delete")) {
    let parsedcarList = JSON.parse(localStorage.getItem("cars"));
    parsedcarList.splice(index, 1);
    localStorage.setItem("cars", JSON.stringify(parsedcarList));
    location.reload();
  }
}
function updatecar(index) {
  let brand = document.querySelector('input[name="upbrand"]');
  let model = document.querySelector('input[name="upmodel"]');
  let type = document.querySelector('input[name="uptype"]');
  let description = document.querySelector(".textarea2");
  let Img = document.querySelector('input[name="upimage"]');
  let carid = document.querySelector('input[name="upid"]');
  let parsedcarList = JSON.parse(localStorage.getItem("cars"));
  let updatebtn = document.querySelector(".formbutton2");

  brand.value = parsedcarList[index].brand;
  carid.value = parsedcarList[index].id;
  Img.value = parsedcarList[index].image;
  model.value = parsedcarList[index].model;
  type.value = parsedcarList[index].type;
  description.value = parsedcarList[index].description;

  updatebtn.addEventListener("click", function (e) {
    // e.preventDefault();
    let newCar = {
      id: carid.value,
      brand: brand.value,
      model: model.value,
      type: type.value,
      description: description.value,
      image: Img.value,
    };
    parsedcarList[index].brand = brand.value;
    parsedcarList[index].model = model.value;
    parsedcarList[index].type = type.value;
    parsedcarList[index].description = description.value;
    parsedcarList[index].image = Img.value;
    localStorage.setItem("cars", JSON.stringify(parsedcarList));
  });
}
const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute('data-bs-theme');
  
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-bs-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
  }
};

displayCars();
