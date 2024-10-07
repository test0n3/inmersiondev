const expenseWarning = 150;

function createCollectionDB() {
  const openOrCreateDB = window.indexedDB.open("expenses_db", 1);
  openOrCreateDB.onerror = function (event) {
    console.error("Error opening database:", event.target.error);
  };

  openOrCreateDB.onsuccess = function () {
    console.log("Database opened successfully");
  };

  openOrCreateDB.onupgradeneeded = function (event) {
    let db = event.target.result;

    db.onerror = function (event) {
      console.error("Error loading database:", event.target.error);
    };
    console.log("Database setup completed");
    const objectStore = db.createObjectStore("expenses", {
      keyPath: "id",
      autoIncrement: true,
    });
    objectStore.createIndex("name", "name", { unique: false });
  };

  return openOrCreateDB;
}

function saveExpense(expenseDetails) {
  return new Promise((resolve, reject) => {
    const request = createCollectionDB();
    request.onerror = function (event) {
      console.error("Error opening database:", event.target.error);
      reject(event.target.error);
    };

    request.onsuccess = function (event) {
      console.log(
        "save Expense(), Database opened successfully, using Promises"
      );
      const db = event.target.result;
      const transaction = db.transaction(["expenses"], "readwrite");
      const objectStore = transaction.objectStore("expenses");

      const addExpense = objectStore.add(expenseDetails);

      addExpense.onerror = function (event) {
        console.error("Error adding data: ", event.target.error);
        reject(event.target.error);
      };

      addExpense.onsuccess = function (event) {
        const expense = event.target.result;
        console.log("Data saved");
        resolve(expense);
        db.close();
      };
    };
  });
}

async function saveData(expenseDetail) {
  try {
    const expenseId = await saveExpense(expenseDetail);
    console.log("Data saved: ", expenseId);
  } catch (error) {
    console.error("Error saving data:", error);
  }
}

// saveExpense({ name: "azucar", description: "azucar para té", value: 21 }); // DELETE
// saveData({ name: "gato", description: "mascota", value: 151 }); // DELETE

function deleteExpense(expenseId) {
  return new Promise((resolve, reject) => {
    const request = createCollectionDB();

    request.onerror = function (event) {
      console.error("Error opening database:", event.target.error);
      reject(event.target.error);
    };

    request.onsuccess = function (event) {
      console.log(
        "deleteExpense(), Database opened successfully, using Promises"
      );
      const db = event.target.result;
      const transaction = db.transaction(["expenses"], "readwrite");
      const objectStore = transaction.objectStore("expenses");

      const deleteExpense = objectStore.delete(expenseId);

      deleteExpense.onerror = function (event) {
        console.error("Error deleting expense: ", event.target.error);
        reject(event.target.error);
      };

      deleteExpense.onsuccess = function (event) {
        const deletedExpense = event.target.result;
        console.log("Deleted expense:", deleteExpense);
        resolve(deletedExpense);
        db.close();
      };
    };
  });
}

async function deleteData(expenseId) {
  try {
    const deletedExpense = await deleteExpense(expenseId);
    console.log("Deleted expense:", deletedExpense);
    // getAllData();
  } catch (error) {
    console.error("Error deleting expense:", error);
  }
}

function borrarGasto(expenseId) {
  deleteData(expenseId);
  getAllData();
}

// deleteData(1); // DELETE

function updateExpense(expenseDetail, expenseId) {
  return new Promise((resolve, reject) => {
    const request = createCollectionDB();

    request.onerror = function (event) {
      console.error("Error opening database:", event.target.error);
      reject(event.target.error);
    };

    request.onsuccess = function (event) {
      console.log(
        "updateExpense(), Database opened succesfully, using Promises"
      );
      const db = event.target.result;
      const transaction = db.transaction(["expenses"], "readwrite");
      const objectStore = transaction.objectStore("expenses");
      const getRequest = objectStore.get(expenseId);

      getRequest.onerror = function (event) {
        console.error("Error updating expense: ", event.target.error);
        reject(event.target.error);
      };

      getRequest.onsuccess = function (event) {
        const expenseToUpdate = event.target.result;
        console.log("original Expense:", expenseToUpdate);
        if (expenseToUpdate) {
          expenseToUpdate.name = expenseDetail.name;
          expenseToUpdate.description = expenseDetail.description;
          expenseToUpdate.value = expenseDetail.value;

          const updateExpense = objectStore.put(expenseToUpdate);
          updateExpense.onerror = function (event) {
            console.error("Error updating expense: ", event.target.error);
            reject(event.target.error);
          };

          updateExpense.onsuccess = function (event) {
            const updatedExpense = event.target.result;
            console.log("Updated expense: ", updatedExpense);
            resolve(updatedExpense);
            db.close();
          };
        }
      };
    };
  });
}

async function updateData(expenseDetail, expenseId) {
  try {
    const expense = await updateExpense(expenseDetail, expenseId);
    console.log("Updated expense: ", expense);
  } catch (error) {
    console.error("Error updateing expense:", error);
  }
}

function getExpenses() {
  return new Promise((resolve, reject) => {
    const request = createCollectionDB();

    request.onerror = function (event) {
      console.error("Error opening database:", event.target.error);
      reject(event.target.error);
    };

    request.onsuccess = function (event) {
      console.log(
        "getExpenses(), Database opened successfully, using Promises"
      );
      const db = event.target.result;
      const transaction = db.transaction(["expenses"], "readonly");
      const objectStore = transaction.objectStore("expenses");

      const allExpenses = [];
      const getAllExpenses = objectStore.openCursor();

      getAllExpenses.onsuccess = function (event) {
        const cursor = event.target.result;
        if (cursor) {
          const register = cursor.value;
          allExpenses.push(register);
          cursor.continue();
        } else {
          resolve(allExpenses);
          db.close();
        }
      };

      getAllExpenses.onerror = function (event) {
        reject(event.target.error);
      };
    };
  });
}
// with callback
// getExpenses(function (allValues, error) {
//   if (error) {
//     console.error("Error getting expenses: ", error);
//   } else {
//     console.log("All expenses: ", allValues);
//   }
// });

// with promises
// getExpenses()
//   .then((allExpenses) => console.log("All expenses:", allExpenses))
//   .catch((error) => console.error("Error getting expenses:", error));

// with promises and async/await
async function getAllData() {
  try {
    const allExpenses = await getExpenses();
    console.log("All expenses with Async and await:", allExpenses);
    cleanExpenseTable();
    printExpenseList(allExpenses);
  } catch (error) {
    console.error("Error getting expenses:", error);
  }
}

getAllData(); // DELETE

function getExpense(expenseId) {
  return new Promise((resolve, reject) => {
    const request = createCollectionDB();
    request.onerror = function (event) {
      console.error("Error opening database:", event.target.error);
      reject(event.target.error);
    };
    request.onsuccess = function (event) {
      console.log("getExpense(), Database opened successfully, using Promises");
      const db = event.target.result;
      const transaction = db.transaction(["expenses"], "readonly");
      const objectStore = transaction.objectStore("expenses");

      const getExpense = objectStore.get(expenseId);

      getExpense.onerror = function (event) {
        console.error("Error getting expense:", event.target.error);
        reject(event.target.error);
      };

      getExpense.onsuccess = function (event) {
        const expense = event.target.result;
        // console.log("expense:", expense);
        if (expense === undefined) {
          console.log("Record not found");
          reject("register not found");
        } else {
          resolve(expense);
          db.close();
        }
      };
    };
  });
}

async function printExpense(expenseId) {
  try {
    const expense = await getExpense(expenseId);
    console.log("getExpense(), expense:", expense);
  } catch (error) {
    console.error("getExpense(), Error getting expense:", error);
  }
}

async function clickBoton() {
  const expenseDetails = buildExpenseDetail();

  if (expenseDetails == false) return;

  expenseValueGreaterThan(expenseDetails.value);
  console.log("clickBoton, expenseDetails:", expenseDetails);
  try {
    if (expenseDetails.id) {
      await updateData(expenseDetails, expenseDetails.id);
      updateButton();
    } else {
      await saveExpense(expenseDetails);
    }
    cleanInputFields();
  } catch (error) {
    console.error("Error:", error);
  }
  getAllData(); // TODO lugar apropiado?
}

function cleanExpenseTable() {
  const expensesTable = document.getElementById("listaDeGastos");
  while (expensesTable.firstChild) {
    expensesTable.removeChild(expensesTable.firstChild);
  }
}

function expenseValueGreaterThan(expenseValue) {
  if (expenseValue > expenseWarning) {
    alert(`Cuidado, el valor es superior a ${expenseWarning}`);
  }
}

function printExpenseList(expenses) {
  const costsDisplay = document.getElementById("listaDeGastos");
  const costTotal = document.getElementById("totalGastos");
  let costSum = 0;
  for (let expense of expenses) {
    costSum += expense.value;
    costsDisplay.appendChild(expenseRow(expense));
  }
  costTotal.innerText = costSum.toFixed(2);
}

function expenseRow(expense) {
  const tableRow = document.createElement("tr");
  const detailCell = document.createElement("td");
  const nameValue = document.createElement("p");
  const descriptionValue = document.createElement("p");
  const valueCell = document.createElement("td");
  const buttonsCell = document.createElement("td");
  detailCell.appendChild(nameValue);
  detailCell.appendChild(descriptionValue);
  tableRow.appendChild(detailCell);
  tableRow.appendChild(valueCell);
  tableRow.appendChild(buttonsCell);
  nameValue.innerText = expense.name;
  descriptionValue.innerText = expense.description;
  valueCell.innerText = `US$ ${expense.value.toFixed(2)}`;
  buttonsCell.innerHTML = genButtons(expense.id);
  if (expense.value > expenseWarning) {
    tableRow.setAttribute("class", "warning");
  }
  return tableRow;
}

function cleanInputFields() {
  document.getElementById("indiceGasto").value = "";
  document.getElementById("nombreGasto").value = "";
  document.getElementById("descripcionGasto").value = "";
  document.getElementById("valorGasto").value = "";
}

function modificarGasto(expenseId) {
  console.log("modificarGasto(), expenseId: ", expenseId);

  try {
    const expenseDetails = getExpense(expenseId);
    expenseDetails.then((expense) => {
      console.log("expenseDetails:", expense);
      expenseInInputFields(expense);
      updateButton();
    });
  } catch (error) {
    console.log("Couldn't get expense data:", error);
  }
}

function expenseInInputFields(expenseDetails) {
  document.getElementById("indiceGasto").value = expenseDetails.id;
  document.getElementById("nombreGasto").value = expenseDetails.name;
  document.getElementById("descripcionGasto").value =
    expenseDetails.description;
  document.getElementById("valorGasto").value = expenseDetails.value;
}

function updateButton() {
  const button = document.getElementById("botonFormulario");
  if (button.innerText == "Agregar Gasto") {
    button.innerText = "Cambiar Gasto";
  } else {
    button.innerText = "Agregar Gasto";
  }
  // button.setAttribute("onclick", "modificarGasto()");
}

function genButtons(expenseId) {
  return `<nav><button onclick='modificarGasto(${expenseId})'>Modificar</button><button onclick='borrarGasto(${expenseId})'>Borrar</button></nav>`;
}

function buildExpenseDetail() {
  const expenseName = document.getElementById("nombreGasto");
  const expenseDescription = document.getElementById("descripcionGasto");
  const expenseValue = document.getElementById("valorGasto");
  const expenseId = document.getElementById("indiceGasto");

  if (expenseName.value == "" || expenseValue.value == "") {
    alert("Por favor, complete los campos");
    return false;
  }
  const expenseDetail = {
    name: expenseName.value,
    description: expenseDescription.value,
    value: Number(expenseValue.value),
  };
  if (expenseId.value !== "") {
    expenseDetail.id = Number(expenseId.value);
  }
  return expenseDetail;
}

function writeExpenseDetail(expenseDetail) {
  const expenseName = document.getElementById("nombreGasto");
  const expenseDescription = document.getElementById("descripcionGasto");
  const expenseValue = document.getElementById("valorGasto");
  const expenseId = document.getElementById("indiceGasto");
  expenseName.value = expenseDetail.name;
  expenseDescription.value = expenseDetail.description;
  expenseValue.value = expenseDetail.value;
  expenseId.value = expenseDetail.id;
}

// console.log("buildExpenseDetail:", buildExpenseDetail());
