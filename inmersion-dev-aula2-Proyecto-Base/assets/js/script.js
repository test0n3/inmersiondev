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
  const monthCostsLast = genIndex();
  console.log(monthCostsLast);
  monthCosts[monthCostsLast] = {
    name: costName,
    description: costDescription,
    value: costValue,
  };
  console.log(monthCosts);
  cleanFields();
}

function genIndex() {
  if (Object.keys(monthCosts).length == 0) {
    return 1;
  }
  return Number(Object.keys(monthCosts).at(-1)) + 1;
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
    let { name, description, value } = monthCosts[cost];
    costSum += value;
    costsList += `<li ${
      value > warningValue ? 'class="warning"' : ""
    }><article class='cost-description'><p>${name}</p><p>${description}</p></article><article class='cost-value'>US$ ${value.toFixed(
      2
    )}</article><article><button onclick='borrarGasto(${cost})'>Borrar</button></article></li>`;
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

function borrarGasto(index) {
  delete monthCosts[index];
  printMonthCosts();
}
