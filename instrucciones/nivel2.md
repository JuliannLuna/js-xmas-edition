# Nivel 2 - Almacenamiento local

Hagamos una descripción general de nuestras acciones en el nivel 2.
Después de que el usuario complete el formulario y pase toda la validación:

1. Una vez que el usuario ingresa los valores, en caso de validación exitosa
   - Añade los valores (nombre y el regalo como un objeto junto con un id único)
     al almacenamiento local.
2. Cuando vayas a la página de Lista de deseos
   - Recupera los deseos del almacenamiento local
   - Escribe los deseos en el DOM como una lista de deseos

3. Cuando vayas a la página de regalo de Santa
   - Aquí también leeríamos del almacenamiento local
   - Generador de números aleatorios y mostrar la imagen

4. # Almacenamiento local

Estamos obteniendo información del usuario y validando esa
información, pero cuando actualizamos la página, esa información se
pierde y el usuario tiene que escribirlo todo de nuevo.

¿No sería bueno si pudiéramos guardar la información que escribe
el usuario en algún lugar y luego pudiéramos usar esa información, por ejemplo,
para mostrarla?

Aquí, el almacenamiento local viene al rescate (podemos reemplazar el
almacenamiento local con una base de datos real cuando trabajemos con datos más
avanzados. Lo que hace la base de datos es que proporciona una ubicación
para almacenar los datos y cuando sea necesario podamos acceder a estos datos. Piensa en
un frasco de galletas que es la base de datos y la galleta como los datos ;))

Entonces, ¿qué es el almacenamiento local?
Es una función que permite a las páginas web almacenar información
localmente en el navegador web del cliente usando un mecanismo de clave y valor.
Una vez que añadimos los datos al almacenamiento local, estarán disponibles para siempre
a menos que los eliminemos.

Es una gran opción si no tienes backend (para que puedas conectarte a
una base de datos) sino solo front-end.

Puedes ver la información almacenada en el almacenamiento local por:

TODO: 1. Abre la ventana de la consola web

TODO: 2. Selecciona la pestaña `Application`

TODO: 3. Dentro del menú `Storage`, haz clic en la flecha hacia abajo cerca
de la opción `LocalStorage`.

TODO: 4. Selecciona file:// para ver los detalles del almacenamiento local guardados.

Existe la posibilidad de que aún no tengas ningún dato.

Hay 2 opciones de almacenamiento disponibles:

1. window.localStorage - almacena datos sin fecha de vencimiento.
2. window.sessionStorage - almacena datos para una sesión (los datos se pierden cuando
   se cierra la pestaña del navegador)

Usaremos el objeto `.localStorage`.

Con un almacenamiento local, podemos añadir contenido, recuperar
información o limpiar completamente el contenido del almacenamiento local,
lo cual se explica en detalle a continuación.

Añadiendo contenido al almacenamiento local:
`localStorage.setItem('clave', valor);`

ejemplo: `const todos = $('#todos').html();`
`localStorage.setItem('todos', todos);`

Recuperar información del almacenamiento local a través de la clave:
`localStorage.getItem('clave')`

ejemplo:

```
  if(localStorage.getItem('todos')) {
    $('#todos').html(localStorage.getItem('todos'));
  }
```

Limpiar todo el contenido del almacenamiento local
`window.localStorage.clear();`

El almacenamiento local solo puede guardar cadenas, por lo que almacenar objetos requiere que
se conviertan en cadenas (también conocido como serializar objetos, es decir,
convertir un objeto a formato de cadena) usando JSON.stringify - no puedes
pedirle al almacenamiento local que guarde un objeto directamente porque guardará
"[object Object]", ¡que no es correcto en absoluto!

Eso también significa que el objeto debe pasar por JSON.parse (también conocido como
deserializar, es decir, convertir una cadena a un objeto) al salir del
almacenamiento local:

```
localStorage.setItem('user', JSON.stringify({
  username: 'htmldog',
  api_key: 'abc123xyz789'
}));

const user = JSON.parse(localStorage.getItem('user'));
```

2. # Guardar datos en el almacenamiento local

Ahora usemos esta información en la práctica...

Hemos validado mucha información sobre el usuario, así que ahora guardemos
eso en el almacenamiento local. Para hacerlo, sigue los siguientes pasos:

TODO: 1. Crea una función con el nombre `saveDataToLocalStorage`.

TODO: 2. Por ahora, solo queremos guardar el nombre y la descripción del regalo
en el almacenamiento local. Entonces creemos 2 variables (`name` y
`description`) que recopilen esta información del DOM.

TODO: 3. Queremos una clave única para denotar el almacenamiento de datos para cada
`name` y `description`. así que creemos nuestro propio índice de almacenamiento local:

TODO: 4. Declara una variable global (al principio de la página)
llamada `localStorageIndex` con valor `localStorage.length`

TODO: 5. Nota: el `localStorage.length` debe ser cero cuando comencemos este tutorial, para eso
necesitamos vaciar el contenido del almacenamiento local ya existente si lo hay.
Esto se puede hacer escribiendo `window.localStorage.clear();` en la consola web.

TODO: 6. Dentro de la función `saveDataToLocalStorage` crea otra
variable llamada `key` con el valor `'user'+ localStorageIndex`. Esto
establecerá una clave única para los datos.

TODO: 7. Guarda los datos como un objeto en el almacenamiento local usando
`setItem()`:

```
  localStorage.setItem(key, JSON.stringify(
    {
      username: name,
      giftDescription: description
    }
  ));
```

Donde key es la `key` y value es el objeto serializado con propiedades
`username` y `giftDescription`

TODO: 8. Incrementa el `localStorageIndex` (esto asegurará que tengamos
claves únicas para cada objeto) al final de nuestra función
`saveDataToLocalStorage`.

TODO: 9. Llama a la función `saveDataToLocalStorage` dentro de la
función `handleErrors` cuando no haya errores.

TODO: 9. Pruébalo - actualiza tu `index.html` y luego añade la
información - ve si las entidades se han añadido al almacenamiento local.

¡Hurra! ¡Hemos añadido nuestros primeros datos al almacenamiento local!

3. # Obtener datos del almacenamiento local

Ahora querríamos mostrar la lista de deseos almacenados en el
almacenamiento local en nuestra página de lista de deseos.

TODO: 1. Creemos otra función llamada `displayWishes()`.

TODO: 2. Mostraremos nuestros deseos como un elemento de lista, así que obtén ese elemento
del DOM en la variable `ul`.

TODO: 3. Necesitamos crear un bucle que recupere todos los elementos del
almacenamiento local, así que el índice del bucle debe ser hasta el
`localstorage.length`.
El bucle debe hacer algunas cosas:

- crea un elemento `li`.
- obtén los datos del almacenamiento local para esa `userKey` y añádelos a `li`.
  ejemplo: `li.appendChild(document.createTextNode(data.giftDescription));`
- este elemento `li` debe añadirse al elemento `ul`
  ejemplo: `ul.appendChild(li);`
  El `appendChild()` añade el elemento `li` a `ul`. Aquí `ul` es el padre
  y `li` es el hijo.

Tenemos una función que mostraría la lista de deseos, pero ¿cuándo llamamos a esta función?

Tan pronto como se cargue `wish-list.html`, necesitamos que todos los elementos se
muestren. Así que llamamos a la función `displayWishes()` cuando el DOM se está cargando
es decir, en el evento `onload`.

TODO: 4. Añade el `onload="displayWishes()"` en la etiqueta body de la
página `wish-list.html`.

Para verificar si todo funciona bien, actualiza la página `wish-list.html` y ve si
muestra los elementos.

//////////////////////////////////////////////////////////////////////////////////

¡Felicidades! ¡Has terminado la Parte 2!

Levántate, estira las piernas, celebra tu logro.

El siguiente paso será seguir las instrucciones en el archivo level3.md.

//////////////////////////////////////////////////////////////////////////////////

# NOTAS

**Ventajas de usar almacenamiento local**

- más seguro
- se puede almacenar una gran cantidad de datos localmente y no afectaría el rendimiento
  del sitio web y tiene un límite de almacenamiento de al menos 5MB
- la información nunca se transfiere al servidor
- los datos se pueden almacenar para siempre, no tienen fecha de vencimiento
- los datos no se pierden cuando se cierra el navegador y están disponibles en cualquier momento
  a menos que los eliminemos manualmente

El almacenamiento local es por origen (por dominio y protocolo). Todas las páginas, de un
origen, pueden almacenar y acceder a los mismos datos.
