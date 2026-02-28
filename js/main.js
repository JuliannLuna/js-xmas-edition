const indexAlmacenamientoLocal = localStorage.length;
// window.localStorage.clear(); // Borra todos los datos almacenados localmente en el navegador

const listaDireccionImg = {
  1: "img/gifts/goldGift.jpg",
  2: "img/gifts/groupGift.jpeg",
  3: "img/gifts/redGift.jpg",
};

const tiposComportamientos = {
  1: "Muy bueno",
  2: "Bueno",
  3: "Mas o Menos",
};

/*============= NIVEL 1 =============*/
const $form = document.querySelector("#carta-a-santa");
$form.onsubmit = validarFormulario;

function validarNombre(nombre) {
  if (nombre.length === 0) {
    return "Este campo debe contener al menos 1 caracter";
  } else if (nombre.length >= 50) {
    return "Este campo debe tener menos de 50 caracteres";
  } else if (!/^[a-z]+$/i.test(nombre)) {
    return "El nombre debe solo contener letras";
  }
  return "";
}

// Se valida que se haya seleccionado una ciudad
function validarCiudad(ciudad) {
  if (ciudad === "") {
    return "Debe seleccionar una ciudad";
  }
  return "";
}

// Se valida que la descripcion ingresada sea del al menos 1 caracter y no supere, ni iguale los 100
function validarDescripcionRegalo(descripcion_regalo) {
  if (descripcion_regalo.length === 0) {
    return "Este campo debe contener al menos 1 caracter";
  } else if (descripcion_regalo.length >= 100) {
    return "Este campo debe contener menos de 100 caracteres";
  } else if (!/^[a-z0-9]+$/i.test(descripcion_regalo)) {
    return "Este campo debe contener solo letras y numeros";
  }
  return "";
}

// Validamos el formulario
function validarFormulario(event) {
  // Extraemos lo que el usuario ingreso en el formulario
  const nombreUsuario = document.querySelector("[name=nombre]").value;
  const comportamientoUsuario = $form.comportamiento.value;
  const ciudadUsuario = $form.ciudad.value;
  const descripcionRegalo = $form["descripcion-regalo"].value;

  // Errores
  const errorNombre = validarNombre(nombreUsuario);
  const errorCiudad = validarCiudad(ciudadUsuario);
  const errorDesRegalo = validarDescripcionRegalo(descripcionRegalo);

  const errores = {
    nombre: errorNombre,
    ciudad: errorCiudad,
    "descripcion-regalo": errorDesRegalo,
  };

  const esExito = manejarErrores(errores) === 0;
  if (esExito) {
    guardarDatosAlmacenamientoLocal();
    $form.classList.add("oculto");
    document.querySelector("#exito").classList.remove("oculto");
    setTimeout(() => (window.location.href = "wishlist.html"), 5000);
  }

  event.preventDefault();
}

function manejarErrores(errores) {
  const keys = Object.keys(errores);
  // console.log(keys);
  let cantidadErrores = 0;
  const $contenedorErrores = document.querySelector("#errores");

  // Primera opcion para NO ACUMULAR LOS ERRORES
  $contenedorErrores.textContent = "";

  keys.forEach(function (key) {
    //nombre, ciudad, descripcion-regalo estan en key y DEBEN SER IGUALES al atributo name dentro del html
    const error = errores[key]; //ejemplo errores["nombre"] puede almacenar "" o un mensaje de error
    // console.log(key);
    if (error) {
      cantidadErrores++;
      $form[key].className = "error"; //ejemplo $form["nombre"] donde nombre es el name en el html y el elemento que tendra la clase error

      const nodeList = document.createElement("li");
      nodeList.textContent = error;
      $contenedorErrores.appendChild(nodeList);
    } else {
      $form[key].className = "";
    }
  });
  return cantidadErrores;
}

/*============= NIVEL 2 =============*/

// Esta funcion se encargara de almacenar el nombre y la descripcion del regalo
// que el usuario haya ingresado para que pueda ser
// visualizado en el archivo wishlist.html
function guardarDatosAlmacenamientoLocal() {
  const nombreUsuario = document.querySelector("[name=nombre]").value;
  const descripcionRegalo = document.querySelector(
    "[name=descripcion-regalo]",
  ).value;

  // localStorage.setItem("nombre", nombreUsuario);
  // localStorage.setItem("descripcion", descripcionRegalo);

  const key = "usuario" + indexAlmacenamientoLocal;

  localStorage.setItem(
    key,
    JSON.stringify({
      nombre: nombreUsuario,
      "descripcion-regalo": descripcionRegalo,
    }),
  );
}

/* 
Extrae los nombres y regalos almacenados localmente
en el navegador y los añade a la lista mediante la
creacion de un elemento <li>
 */
function mostrarDeseos() {
  const elementoLista = document.querySelector(".wish-list");
  const cantidadDeseos = localStorage.length;

  for (let i = 0; i < localStorage.length; i++) {
    const usuario = JSON.parse(localStorage.getItem("usuario" + i));
    const elementoItemLista = document.createElement("li");
    elementoItemLista.textContent =
      "Nombre:" +
      usuario.nombre +
      " Descripción Regalo: " +
      usuario["descripcion-regalo"];
    elementoLista.appendChild(elementoItemLista);
  }
}

/*============= NIVEL 3 =============*/

/* 
Numero aleatorio entre 0 y el parametro `limite`
  - Math.floor redondea numero hacia abajo.
  - Math.random() genera numero entre 0 y 1 con decimales.
*/
function obtenerNumeroAleatorioHasta(limite) {
  const numeroAleatorio = Math.floor(Math.random() * limite) + 1;

  return numeroAleatorio;
}

/*
Se obtiene un numero aleatorio entre 0 y 2
la cual servira para obtener un comportamiento
aleatorio que se mostrara en la pagina
*/
function obtenerComportamientoAleatorio() {
  const numAleatorio = obtenerNumeroAleatorioHasta(3);
  const comportamiento = tiposComportamientos[numAleatorio];
  const regalo = obtenerRegaloAleatorio();
  document.querySelector(".attitude").textContent = comportamiento;
  document.querySelector(".santa-gift-text").textContent = regalo;
}

/*
Funcion que obtiene un numero aleatorio
entre 0 y la cantidad de regalos ingresados
para poder extraer un regalo aleatorio.
Por ejemplo, el regalo de usuario0, donde 0 se 
obtuvo aleatoriamente, sera el mostrado.
*/
function obtenerRegaloAleatorio() {
  const numAleatorio = obtenerNumeroAleatorioHasta(
    indexAlmacenamientoLocal - 1, // El numero aleatorio obtenido omite el numero 0, por eso resto 1 al resultado
  );
  const usuarioAleatorio = JSON.parse(
    localStorage.getItem("usuario" + numAleatorio),
  );
  const regaloAleatorio = usuarioAleatorio["descripcion-regalo"];
  return regaloAleatorio;
}

/*
Funcion que obtiene un numero aleatorio
entre 1 y 3 (o cantidad de imagenes) almacenadas
para poder mostrar aleatoriamente.
*/
function obtenerImgRegaloAleatorio() {
  const numAleatorio = obtenerNumeroAleatorioHasta(3);
  const direccionamiento = listaDireccionImg[numAleatorio];
  const imgRegalo = document.querySelector(".santa-gift");
  imgRegalo.src = direccionamiento;
}

/* 
Funcion que llama a las funciones obtenerImgRegaloAleatorio() y obtenerComportamientoAleatorio()
*/

function llenarContenido() {
  obtenerComportamientoAleatorio();
  obtenerImgRegaloAleatorio();
}
