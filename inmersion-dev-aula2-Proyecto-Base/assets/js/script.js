const costsNames = [];
const costsValues = [];
const costsDescriptions = [];
const totalCost = document.getElementById("totalGastos");
const costsListSpace = document.getElementById("listaDeGastos");

// add items to costsList
function clickBoton() {
  let costValue = document.getElementById("valorGasto");
  let costName = document.getElementById("nombreGasto");
  let costDescription = document.getElementById("descripcionGasto");
  costValueOver150(costValue.value, costName.value);
  addCost(costName.value, costValue.value, costDescription.value);
  cleanForm();
  showCostsList();
  totalCost.innerText = calculateTotalCost().toFixed(2);
}

function addCost(costName, costValue, costDescription) {
  costsNames.push(costName);
  costsDescriptions.push(costDescription);
  costsValues.push(Number(costValue));
}
// helper
function costValueOver150(costValue, costName) {
  if (Number(costValue) > 150) {
    alert(`El costo de ${costName} es mayor a USD 150`);
  }
}
//helper
function calculateTotalCost() {
  return costsValues.reduce((acc, cost) => acc + cost, 0);
}
// showCostsList
function showCostsList() {
  let list = "";
  let item = "";
  for (let i = 0; i < costsNames.length; i++) {
    const buttons = `<section><button onclick="modifyItem(${i})">Modificar</button><button onclick="deleteItem(${i})">Eliminar</button></section>`;
    if (costsValues[i] > 150) {
      item = `<li class="highlight"><article><p>${costsNames[i]} - USD ${costsValues[i]}</p><p>${costsDescriptions[i]}</p></article>${buttons}</li>`;
    } else {
      item = `<li><article><p>${costsNames[i]} - USD ${costsValues[i]}</p><p>${costsDescriptions[i]}</p></article>${buttons}</li>`;
    }
    list += item;
  }
  costsListSpace.innerHTML = list;
}

function cleanForm() {
  document.getElementById("valorGasto").value = "";
  document.getElementById("descripcionGasto").value = "";
  document.getElementById("nombreGasto").value = "";
}

function deleteItem(index) {
  costsNames.splice(index, 1);
  costsDescriptions.splice(index, 1);
  costsValues.splice(index, 1);
  showCostsList();
  totalCost.innerText = calculateTotalCost().toFixed(2);
}

function modifyItem(index) {
  document.getElementById("nombreGasto").value = costsNames[index];
  document.getElementById("descripcionGasto").value = costsDescriptions[index];
  document.getElementById("valorGasto").value = costsValues[index];
  changeButton("modify", index);
}

function modifyCost(index) {
  costsNames[index] = document.getElementById("nombreGasto").value;
  costsDescriptions[index] = document.getElementById("descripcionGasto").value;
  costsValues[index] = Number(document.getElementById("valorGasto").value);
  costValueOver150(costsValues[index], costsNames[index]);
  cleanForm();
  showCostsList();
  totalCost.innerText = calculateTotalCost().toFixed(2);
  changeButton("add");
}

function changeButton(type, index = null) {
  const formButton = document.getElementById("botonFormulario");
  console.log("formButton", formButton);
  if (type === "modify") {
    console.log("type:", type);
    formButton.innerText = "Modificar Gasto";
    formButton.setAttribute("onclick", `modifyCost(${index})`);
  }

  if (type === "add") {
    console.log("type:", type);
    formButton.innerText = "Agregar Gasto";
    formButton.setAttribute("onclick", "clickBoton()");
  }
}
