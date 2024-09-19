const costsNames = [];
const costsValues = [];
let totalCostSummatory = 0;
const totalCost = document.getElementById("totalGastos");
const costsListSpace = document.getElementById("listaDeGastos");

function clickBoton() {
  let costValue = document.getElementById("valorGasto");
  let costName = document.getElementById("nombreGasto");
  costValueOver150(costValue.value, costName.value);
  addCost(costName.value, costValue.value);
  totalCostSummatory += Number(costValue.value);
  cleanInputs();
  updateCostsListSpace();
  totalCost.innerText = totalCostSummatory.toFixed(2);
}

function costValueOver150(costValue, costName) {
  if (Number(costValue) > 150) {
    alert(`El costo de ${costName} es mayor a USD 150`);
  }
}

function addCost(costName, costValue) {
  costsNames.push(costName);
  costsValues.push(Number(costValue));
}

function updateCostsListSpace() {
  let list = "";
  let item = "";
  for (let i = 0; i < costsNames.length; i++) {
    if (costsValues[i] > 150) {
      item = `<li style="color: red">${costsNames[i]} - USD ${costsValues[i]}</span><button onclick="deleteItem(${i})">Eliminar</button></li>`;
    } else {
      item = `<li>${costsNames[i]} - USD ${costsValues[i]}<button onclick="deleteItem(${i})">Eliminar</button></li>`;
    }
    list += item;
  }
  costsListSpace.innerHTML = list;
}

function cleanInputs() {
  document.getElementById("valorGasto").value = "";
  document.getElementById("nombreGasto").value = "";
}

function deleteItem(index) {
  totalCostSummatory -= costsValues[index];
  totalCost.innerText = totalCostSummatory.toFixed(2);
  costsNames.splice(index, 1);
  costsValues.splice(index, 1);
  updateCostsListSpace();
}
