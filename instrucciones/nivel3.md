## Nivel 3. Función de aleatorización

===========================

Para obtener un número aleatorio en un rango específico:

1. Función aleatoria para usar en bueno/malo/travieso.
2. Función aleatoria para usar en la clave de usuario (regalo).
3. Mostrar la imagen (cuando tengamos tiempo).

### Tareas Adicionales

---

1. **Trabajando con imágenes:**

- Subida de imagen
- Validación de imagen (tamaño/tipo/alto/ancho)
- Guardar en el almacenamiento local (_local storage_)
- Recuperar del almacenamiento local

2. **Llamadas Ajax** (recuperación de Flickr)

El Nivel 1 obtiene la información del usuario.
El Nivel 2 muestra parte de esa información al usuario como una lista.
Ahora vayamos a la parte divertida del nivel 3.

## Math.random

============

El objetivo aquí se basa en las entradas del usuario:

- Determinar si el usuario fue Muy Bueno, Bueno o Travieso.
- Identificar el regalo que pidió la persona.
- Enviar el regalo al usuario (¡como una imagen, no uno de verdad!).

Ah, y ahora no estamos actuando como Papá Noel sino como pequeños duendes traviesos... Así que nos pondremos un poco malos y mezclaremos los regalos que reparte Papá Noel. ¿Cómo mezclamos las cosas? Alterando las entradas que mostramos en `result.html`.

Primero, creemos una función generadora de números aleatorios, que tome el límite como entrada y luego devuelva cualquier número aleatorio desde 0 hasta ese límite.

Para hacer eso, usaremos el objeto incorporado de JavaScript llamado `Math` que, como su nombre indica, tiene propiedades y métodos para funciones y constantes matemáticas (ej.: `Math.PI`, `Math.SQRT`, etc.). Hay muchos objetos incorporados de este tipo disponibles en JavaScript, como `Date`, `String`, `Array`, etc.

Para obtener más funciones/constantes de Math disponibles, consulta:
[https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Math)

**TODO:** Para la función generadora de números aleatorios, usemos la siguiente fórmula:
`Math.floor(Math.random() * limit) + 1;`

Ahora obtengamos un comportamiento aleatorio para el usuario; los tres tipos de comportamiento son Muy Bueno (_Very Good_), Bueno (_Good_) y Travieso (_Naughty_).

**TODO:** Crea un objeto con estos 3 tipos de comportamiento. (¡Recuerda los Objetos de los Niveles 1 y 2!). Para facilitar el acceso, dejaremos que las claves de los objetos sean números:

```javascript
const BehaviourList = {
  1: "Very Good",
  2: "Good",
  3: "Naughty",
};
```

**TODO:** El siguiente paso es crear una función llamada `getRandomBehaviour()`. La función debería hacer lo siguiente:

1. Obtener el número aleatorio del 0 al 3 (como tenemos 3 tipos de comportamiento, establecemos el límite en 3) llamando a la función `randomNumberGenerator()`.
2. Usando este número aleatorio como clave, obtener el comportamiento de la lista de Comportamientos, ej.: `randomBehaviour = BehaviourList[randomNumber]`.
3. Mostrar el Comportamiento en el DOM, usando el `querySelector` para la clase `.attitude`.

Después de crear la función, comprobemos si esto funciona correctamente llamando a la función en la sección `<body>` de la página `result.html` usando el evento `onLoad`.

¡Yupi, la implementación es capaz de modificar el comportamiento del usuario cada vez que se actualiza la página `result.html`!

Ahora que hemos hecho la parte del comportamiento y es bastante divertida, vamos a jugar con los regalos...

Usaremos la lista de descripciones de regalos en el almacenamiento local (¡Espero que no hayas olvidado el _local storage_ en el nivel 2!) y usaremos pasos similares a los anteriores para obtener un regalo aleatorio.

**TODO:** Nombremos la función como `getRandomGift()` y esta haría lo siguiente:

1. Obtener el número aleatorio usando la función `getRandomNumber()`. Ten en cuenta que aquí el límite debe ser el número de regalos en el almacenamiento local, por lo que podemos usar la cuenta de `localStorageIndex`.
   _P.D: Dado que incrementamos el `localStorageIndex` después de agregar un nuevo regalo, el valor del índice tendrá 1 cuenta extra, por lo que debemos usar el límite como `localStorageIndex - 1`._
2. Este número aleatorio se puede usar para obtener la descripción del regalo en esa ubicación (usa la clave como `user + 'randomNo'`) en el almacenamiento local.
3. Mostrar el nombre de `gift.description` en el DOM usando el `querySelector` para `.santa-gift-text`.

**TODO:** Comprobemos si esto funciona correctamente llamando a la función en la sección `<body>` de la página `result.html` usando el evento `onLoad`.

Mostrar solo el comportamiento y la descripción del regalo es aburrido, así que vamos a jugar con algunas imágenes.

Tenemos algunas imágenes de regalos en la carpeta `img/gifts`. Mostraremos aleatoriamente una de esas imágenes y las visualizaremos en la página `result.html`.

**TODO:** Creemos un objeto llamado `ImageUrlList` que contenga números como claves y la URL de la imagen como valores con los nombres:

```javascript
const imageUrlList = {
  1: "img/gifts/goldGift.jpg",
  2: "img/gifts/groupGift.jpeg",
  3: "img/gifts/redGift.jpg",
};
```

Aquí nuevamente estamos usando números como clave para que sea fácil usar el generador `randomNumber` para obtener las imágenes.

**TODO:** Después de eso, creemos una función llamada `getGiftImage()`. Esta debería:

1. Obtener el número aleatorio (dependiendo de la cantidad de imágenes en la carpeta, por ahora son 3); si agregas más imágenes, puedes incrementar el límite en consecuencia.
2. Obtener la url de la imagen usando el número aleatorio de `imageUrlList`, es decir, `imageUrlList[randomNumber]`.
3. Establecer la url como la fuente (_source_) del elemento del DOM `.santa-gift` en `result.html`.

```javascript
function getGiftImage() {
  const element = document.querySelector(".santa-gift");
  const randomNo = getRandomNumber(3);
  const giftImageUrl = imageUrlList[randomNo];
  element.src = giftImageUrl;
}
```

Puedes comprobar la función, llamándola en el evento `onLoad` en la sección `<body>`.

Ahora la parte final. Tenemos 3 funciones, pero llamamos a cada una individualmente en el DOM usando el evento `onLoad()`.

Sería genial si pudiéramos llamar a las tres funciones cuando se cargue la página. ¿Cómo podemos lograrlo?

Una forma es llamar a las tres funciones dentro de otra función, digamos `fillContent()`, y luego simplemente llamar al método `fillContent()` en el evento `onLoad()`.

Adelante... inténtalo...
Si todos los elementos del DOM se cargan simultáneamente... Entonces todo funciona bien...

---

/////////////////////////////////////////////////////////////////////////////////

¡Felicidades! ¡Has terminado el Nivel Intermedio!

¡Celebra tu logro!

Puedes intentar los pasos extra si quieres probar más cosas.

/////////////////////////////////////////////////////////////////////////////////
