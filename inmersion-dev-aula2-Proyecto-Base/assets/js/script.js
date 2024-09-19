const buttonAddCost = document.getElementById("botonFormulario");
const costsNames = [];
const costsValues = [];

function clickBoton() {
  let costValue = document.getElementById("valorGasto");
  let costName = document.getElementById("nombreGasto");
  console.log("costValue:", costValue.value, " costName:", costName.value);
  costValueOver150(costValue.value, costName.value);
  addCost(costName.value, costValue.value);
  console.log("costsNames:", costsNames);
  console.log("costsValues:", costsValues);
}

function costValueOver150(costValue, costName) {
  if (Number(costValue.value > 150))
    alert(`El costo de ${costName.value} es mayor a $ 150}`);
}

function addCost(costName, costValue) {
  costsNames.push(costName);
  costsValues.push(Number(costValue));
}
