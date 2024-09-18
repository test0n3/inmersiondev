const buttonGenerate = document.getElementById("generar");
const buttonClean = document.getElementById("limpiar");
const numCharSpace = document.getElementById("cantidad");
const passwordSpace = document.getElementById("contrasena");
const notification = document.getElementById("notificacion");

buttonClean.addEventListener("click", function () {
  numCharSpace.value = "";
  passwordSpace.value = "";
  hideNotification();
});

buttonGenerate.addEventListener("click", function () {
  hideNotification();
  let numChar = Number(numCharSpace.value);
  let newPassword = "";
  if (!checkNumChar(numChar)) {
    alert("La contraseña debe tener entre 6 y 22 caracteres");
    return;
  }

  for (let i = 0; i < numChar; i++) {
    newPassword += genChar();
  }
  passwordSpace.value = newPassword;
  if (!isPasswordNotWeak(newPassword)) {
    notification.classList.remove("hidden");
  }
});

function checkNumChar(num) {
  return num >= 6 && num <= 22;
}

function genChar() {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()";
  const options = letters + numbers + symbols;
  let pos = Math.floor(Math.random() * options.length);
  let isUpperCase = Math.floor(Math.random() * 2);
  return isUpperCase ? options[pos].toUpperCase() : options[pos];
}

function isPasswordNotWeak(password) {
  return (
    password.match(/[a-z]/g) &&
    password.match(/[A-Z]/g) &&
    password.match(/[0-9]/g) &&
    password.match(/[!@#\$%\^&\*()]/g)
  );
}

function hideNotification() {
  if (!notification.classList.contains("hidden")) {
    notification.classList.add("hidden");
  }
}
