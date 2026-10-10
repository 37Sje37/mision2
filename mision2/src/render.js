// src/render.js

// Estado 1: Cargando
export function mostrarCargando(contenedor) {
  contenedor.innerHTML = '<p class="estado-cargando">⏳ Cargando campeones desde la Grieta del Invocador...</p>';
}

// Estado 2: Error
export function mostrarError(contenedor, mensajeError) {
  contenedor.innerHTML = ''; // Limpiamos
  const parrafo = document.createElement('p');
  parrafo.className = 'estado-error';
  // Usamos textContent por seguridad frente a XSS
  parrafo.textContent = `❌ Oh no, ha ocurrido un error de conexión: ${mensajeError}`;
  contenedor.appendChild(parrafo);
}

// Estado 3: Vacío
export function mostrarVacio(contenedor) {
  contenedor.innerHTML = '<p class="estado-vacio">⚠️ No se ha encontrado ningún campeón con ese nombre.</p>';
}

// Estado 4: Datos
export function renderizarCampeones(contenedor, campeones) {
  contenedor.innerHTML = ''; 
  
  const lista = document.createElement('ul');
  lista.className = 'lista-campeones';

  campeones.forEach(campeon => {
    const elemento = document.createElement('li');
    elemento.textContent = `${campeon.nombre}, ${campeon.titulo} (Dificultad: ${campeon.dificultad}) - Roles: ${campeon.roles.join(', ')}`;
    lista.appendChild(elemento);
  });

  contenedor.appendChild(lista);
}

// Extra: Pintar las estadísticas que calculamos con reduce()
export function renderizarEstadisticas(contenedor, estadisticas) {
  contenedor.textContent = `Total mostrados: ${estadisticas.total} | Dificultad media: ${estadisticas.dificultadMedia}`;
}