# Buscador de Campeones de LoL (Misión M2)

## Cómo probarlo
Abre la terminal en la carpeta del proyecto y sigue estos pasos:
1. Escribe `npm install` y dale a Enter (prepara el proyecto).
2. Escribe `npm run dev` y dale a Enter (arranca la web).
3. Haz clic en el enlace que aparece para abrirlo en el navegador.

## Uso de IA
Usé Gemini como ayudante para programar paso a paso. 
Ejemplo de lo que le pedí: *"como tiene que estar ordenada los ficheros y con que codigos"* y *"como implemento la api tanto al js principal como al html"*.
Verifiqué el código probando la web a cada paso y mirando que no salieran fallos rojos en la consola del navegador.
Escribí y arreglé a mano la estructura de las carpetas: borré el código de ejemplo que no servía y moví el archivo `index.html` a la carpeta principal, porque si no la pantalla se quedaba en blanco.

## Autopsia
1. **Comprobar si hay error de red (`respuesta.ok`):** Cuando pido los datos a internet, reviso manualmente si la página respondió bien. Descarté dejarlo automático porque la herramienta `fetch` a veces se traga errores y hace que la aplicación se rompa sin avisar.
2. **Dividir el código en varios archivos:** Puse la lógica y los filtros en un archivo (`logic.js`) y la parte visual en otro (`render.js`). Descarté meter todo el código junto en un solo archivo gigante porque sería un caos de leer y muy difícil de arreglar si algo falla.