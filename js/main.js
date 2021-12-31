// ejemplo de boleteria de un zoologico
$(document).ready(function () {
  const tableBody = $("#tableBody");
  const tableHead = $("#tableHead");
  if (getUserFromStorage("users")) {
    drawTable();
  } else {
    tableHead.hide();
  }

  console.log($("#nombre").val());
  console.log($("#apellido").val());
  console.log($("#email").val());
  console.log($("#edad").val());
  console.log($("#id").val());
  console.log($("#dni").val());
  console.log($("#telefono").val());
  console.log($("#ingresantes").val());
  console.log($("#aplicantes").val());

  const form = $("#formulario");
  const inputName = $("#nombre");
  const inputSurname = $("#apellido");
  const inputEmail = $("#email");
  const inputAge = $("#edad");
  const inputId = $("#id");
  const inputDni = $("#dni");
  const inputPhone = $("#telefono");
  const allInputs = document.querySelectorAll("input");
  const btnDeleteStorage = $("#btnDeleteStorage"); //Capturo boton reset Storage
  //---------------------------------------------------------------
  function User(id, nombre, apellido, email, edad, dni, telefono) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.edad = edad;
    this.id = id;
    this.dni = dni;
    this.telefono = telefono;
  }

  let listUser = [];

  if (getUserFromStorage("users")) {
    listUser = getUserFromStorage("users");
  }

  function saveToStorage(key, user) {
    listUser.push(user);
    localStorage.setItem(key, JSON.stringify(listUser));
  }

  function getUserFromStorage(key) {
    if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key));
    }
  }

  function drawTable() {
    for (const user of getUserFromStorage("users")) {
      tableHead.show();
      tableBody.append(`<tr>
      <td>${user.id}</td>
      <td>${user.nombre}</td>
      <td>${user.apellido}</td>
      <td>${user.email}</td>
      <td>${user.edad}</td>
      <td>${user.dni}</td>
      <td>${user.telefono}</td>
      </tr>`);
    }
  }

  form.submit(function (event) {
    event.preventDefault();

    const id = inputId.val();
    const nombre = inputName.val();
    const apellido = inputSurname.val();
    const email = inputEmail.val();
    const edad = inputAge.val();
    const dni = inputDni.val();
    const telefono = inputPhone.val();

    const user = new User(id, nombre, apellido, email, edad, dni, telefono);

    saveToStorage("users", user); //Guardo user en storage
    tableBody.empty(); //Borro el tbody de la tabla
    drawTable(); //Dibujo tabla actualizada

    //Pongo todos los input en blanco tras agregar a la tabla y storage.
    for (const input of allInputs) {
      input.value = "";
    }
  });
  //Al presionar botón se borra Storage y se recarga la página para borrar tabla
  btnDeleteStorage.click(() => {
    localStorage.clear();
    location.reload();
  });
});
