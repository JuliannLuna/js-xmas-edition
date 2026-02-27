//Se prueba en caso de que se ingrese un nombre vacio o supere los 50 caracteres
function probarValidarNombre() {
  console.assert(
    validarNombre("") === "Este campo debe contener al menos 1 caracter",
    "Validar nombre no validó que el nombre no sea vacío",
  );

  console.assert(
    validarNombre(
      "111111111111111111111111111111111111111111111111111111111111111111111111111111111111111",
    ) === "Este campo debe tener menos de 50 caracteres",
    "Validar nombre no validó que el nombre sea menor a 50 caracteres",
  );

  console.assert(
    validarNombre("Julian") === "",
    "Validar Nombre fallo al ingresar nombre valido",
  );

  console.assert(
    validarNombre("123123") === "El nombre debe solo contener letras",
    "Validar nombre falló al ingresar solo numeros",
  );
}
probarValidarNombre();

//Se prueba en caso de que ninguna ciudad haya sido seleccionada
function probarValidarCiudad() {
  console.assert(
    validarCiudad("") === "Debe seleccionar una ciudad",
    "Validar ciudad no validó que una ciudad ha sido seleccionado",
  );

  console.assert(
    validarCiudad("Salta") === "",
    "Validar ciudad falló al ingresar nombre ciudad valido",
  );
}
probarValidarCiudad();

//Se prueba en caso de que la descripcion del regalo este vacio o supere los 100 caracteres
function probarValidarDescripcionRegalo() {
  console.assert(
    validarDescripcionRegalo("") ===
      "Este campo debe contener al menos 1 caracter",
    "Validar descripcion regalo no validó que este vacio",
  );

  console.assert(
    validarDescripcionRegalo(
      "1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    ) === "Este campo debe contener menos de 100 caracteres",
    "Validar descripcion regalo no validó que superé los 100 caracteres",
  );

  console.assert(
    validarDescripcionRegalo("Regalo") === "",
    "Validar descripcion falló al ingresar descripción valida",
  );

  console.assert(
    validarDescripcionRegalo("....,.,..,.,.,.,.") ===
      "Este campo debe contener solo letras y numeros",
    "Validar descripcion falló al ingresar una descripcion con solo letras y numeros",
  );
}
probarValidarDescripcionRegalo();
