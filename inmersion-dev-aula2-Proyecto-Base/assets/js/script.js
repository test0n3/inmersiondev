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

function limpiarLista() {
  localStorage.clear();
  printMonthCosts();
}

function saveCosts(costIndex, costName, costDescription, costValue) {
  if (costIndex == "") {
    costIndex = genIndex();
  }
  const data = {
    name: costName,
    description: costDescription,
    value: costValue,
  };
  localStorage.setItem(costIndex, JSON.stringify(data));
  cleanFields();
  document.getElementById("botonFormulario").innerText = "Agregar";
}

function genIndex() {
  if (localStorage.length == 0) {
    return 1;
  }
  return Number(Object.keys(localStorage).sort().at(-1)) + 1;
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

  let lastExpense = Number(Object.keys(localStorage).sort().at(-1));
  for (let i = 1; i <= lastExpense; i++) {
    let data = JSON.parse(localStorage.getItem(i));
    if (data == null) continue;
    let isWarningClass = data.value > warningValue ? 'class="warning"' : "";
    costSum += data.value;
    costsList += `<tr ${isWarningClass}><td><p>${data.name}</p><p>${
      data.description
    }</p></td><td>US$ ${data.value.toFixed(2)}</td><td>${genButtons(
      i
    )}</td></tr>`;
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
  localStorage.removeItem(index);
  printMonthCosts();
}

function modificarGasto(index) {
  const cost = JSON.parse(localStorage.getItem(index));
  document.getElementById("indiceGasto").value = index;
  document.getElementById("nombreGasto").value = cost.name;
  document.getElementById("descripcionGasto").value = cost.description;
  document.getElementById("valorGasto").value = cost.value;
  document.getElementById("botonFormulario").innerText = "Modificar";
}

function genButtons(index) {
  return `<nav><button onclick='modificarGasto(${index})'>Modificar</button><button onclick='borrarGasto(${index})'>Borrar</button></nav>`;
}

printMonthCosts();
