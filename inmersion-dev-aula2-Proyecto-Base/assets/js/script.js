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
  } else {
    editCost(costIndex, costName, costDescription, Number(costValue));
  }
}

function addCost(costName, costDescription, costValue) {
  const monthCostsLast = genIndex();
  console.log(monthCostsLast);
  monthCosts[monthCostsLast] = {
    name: costName,
    description: costDescription,
    value: costValue,
  };
  console.log(monthCosts); // TODO delete this line
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

function editCost(costIndex, costName, costDescription, costValue) {
  monthCosts[costIndex] = {
    name: costName,
    description: costDescription,
    value: costValue,
  };
  cleanFields();
  document.getElementById("botonFormulario").innerText = "Agregar";
}

function printMonthCosts() {
  const costList = document.getElementById("listaDeGastos");
  const costTotal = document.getElementById("totalGastos");
  let costSum = 0;
  let costsList = "";

  for (let cost in monthCosts) {
    let { name, description, value } = monthCosts[cost];
    costSum += value;
    costsList += `<tr ${
      value > warningValue ? 'class="warning"' : ""
    }><td>${name}</td><td>${description}</td><td>US$ ${value.toFixed(
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
  return `<button onclick='modificarGasto(${index})'>Modificar</button><button onclick='borrarGasto(${index})'>Borrar</button>`;
}
