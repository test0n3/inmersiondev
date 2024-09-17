const buttonGenerate = document.getElementById("generar");
const buttonClean = document.getElementById("limpiar");
const password = document.getElementById("contrasena");

buttonClean.addEventListener("click", function () {
  password.value = "";
});

buttonGenerate.addEventListener("click", function () {
  const numChar = Number(document.getElementById("cantidad").value);
  if (!checkNumChar(numChar)) {
    alert("La contraseña debe tener entre 6 y 22 caracteres");
    return;
  }
  console.log("numChar:", numChar);
  console.log("password:", password.value);
  let newPassword = "";
  for (let i = 0; i < numChar; i++) {
    newPassword += genChar();
  }
  password.value = newPassword;
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

function isPasswordWeak() {}
