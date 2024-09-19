const costsNames = [];
const costsValues = [];
const totalCost = document.getElementById("totalGastos");
let totalCostSummatory = 0;
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
  if (Number(costValue.value > 150))
    alert(`El costo de ${costName.value} es mayor a $ 150}`);
}

function addCost(costName, costValue) {
  costsNames.push(costName);
  costsValues.push(Number(costValue));
}

function updateCostsListSpace() {
  let list = "";
  for (let i = 0; i < costsNames.length; i++) {
    list += `<li>${costsNames[i]} - USD ${costsValues[i]}<button onclick="deleteItem(${i})">Eliminar</button></li>`;
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
