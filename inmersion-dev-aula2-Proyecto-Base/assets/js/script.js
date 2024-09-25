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
  costValueGreaterThan(Number(costValue.value));
  saveCosts(
    costIndex.value,
    costName.value,
    costDescription.value,
    Number(costValue.value)
  );
  printMonthCosts();
}

function costControl(costIndex, costName, costDescription, costValue) {
  if (costIndex == "") {
    addCost(costName, costDescription, Number(costValue));
  } else {
    editCost(costIndex, costName, costDescription, Number(costValue));
  }
}

function saveCosts(costIndex, costName, costDescription, costValue) {
  if (costIndex == "") {
    costIndex = genIndex();
  }
  monthCosts[costIndex] = {
    name: costName,
    description: costDescription,
    value: costValue,
  };
  cleanFields();
  document.getElementById("botonFormulario").innerText = "Agregar";
}

function genIndex() {
  if (Object.keys(monthCosts).length == 0) {
    return 1;
  }
  return Number(Object.keys(monthCosts).at(-1)) + 1;
}

function costValueGreaterThan(costValue) {
  if (costValue > warningValue) {
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
    let isWarningClass = value > warningValue ? 'class="warning"' : "";
    costSum += value;
    costsList += `<tr ${isWarningClass}><td><p>${name}</p><p>${description}</p></td><td>US$ ${value.toFixed(
      2
    )}</td><td>${genButtons(cost)}</td></tr>`;
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

function modificarGasto(index) {
  const cost = monthCosts[index];
  document.getElementById("indiceGasto").value = index;
  document.getElementById("nombreGasto").value = cost.name;
  document.getElementById("descripcionGasto").value = cost.description;
  document.getElementById("valorGasto").value = cost.value;
  document.getElementById("botonFormulario").innerText = "Modificar";
}

function genButtons(index) {
  return `<nav><button onclick='modificarGasto(${index})'>Modificar</button><button onclick='borrarGasto(${index})'>Borrar</button></nav>`;
}
