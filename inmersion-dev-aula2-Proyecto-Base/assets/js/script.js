// const addCost = document.getElementById("botonFormulario");
const monthCosts = {};
const warningValue = 150;

function clickBoton() {
  const costIndex = document.getElementById("indiceGasto");
  const costName = document.getElementById("nombreGasto");
  const costDescription = document.getElementById("descripcionGasto");
  const costValue = document.getElementById("valorGasto");
  if (costName.value == "" || costValue.value == "") {
    alert("Por favor, complete los campos");
    return;
  }
  costValueGreaterThan(costValue.value);
  costControl(
    costIndex.value,
    costName.value,
    costDescription.value,
    costValue.value
  );
  printMonthCosts();
}

function costControl(costIndex, costName, costDescription, costValue) {
  if (costIndex == "") {
    addCost(costName, costDescription, Number(costValue));
  }
  // else {
  //   editCost(costIndex, costName, costValue);
  // }
}

function addCost(costName, costDescription, costValue) {
  const monthCostsSize = Object.keys(monthCosts).length;
  monthCosts[monthCostsSize + 1] = {
    name: costName,
    description: costDescription,
    value: costValue,
  };
  console.log(monthCosts);
  cleanFields();
}

function costValueGreaterThan(costValue) {
  if (Number(costValue) > warningValue) {
    alert(`Cuidado, el valor es superior a ${warningValue}`);
  }
}

function printMonthCosts() {
  const costList = document.getElementById("listaDeGastos");
  const costTotal = document.getElementById("totalGastos");
  let costSum = 0;
  let costsList = "";
  for (let cost in monthCosts) {
    let costName = monthCosts[cost].name;
    let costDescription = monthCosts[cost].description;
    let costValue = monthCosts[cost].value;
    costSum += monthCosts[cost].value;
    costsList += `<li ${
      costValue > warningValue ? 'class="warning"' : ""
    }><article class='cost-description'><p>${costName}</p><p>${costDescription}</p></article><article class='cost-value'>US$ ${costValue.toFixed(
      2
    )}</article></li>`;
  }
  costList.innerHTML = costsList;
  costTotal.innerText = costSum.toFixed(2);
}

function cleanFields() {
  document.getElementById("indiceGasto").value = "";
  document.getElementById("nombreGasto").value = "";
  document.getElementById("descripcionGasto").value = "";
  document.getElementById("valorGasto").value = "";
}
