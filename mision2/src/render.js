export function mostrarCargando(contenedor) {
  contenedor.innerHTML = '<p class="estado-cargando">⏳ Cargando campeones...</p>';
}

export function mostrarError(contenedor, mensajeError, funcionReintento) {
  contenedor.innerHTML = ''; 
  const divError = document.createElement('div');
  divError.className = 'estado-error';
  
  const parrafo = document.createElement('p');
  parrafo.textContent = `❌ ${mensajeError}`;
  
  const btnReintento = document.createElement('button');
  btnReintento.textContent = '🔄 Reintentar';
  btnReintento.className = 'btn-reintentar';
  btnReintento.addEventListener('click', funcionReintento);
  
  divError.appendChild(parrafo);
  divError.appendChild(btnReintento);
  contenedor.appendChild(divError);
}

export function mostrarVacio(contenedor) {
  contenedor.innerHTML = '<p class="estado-vacio">⚠️ No se encontró ningún campeón.</p>';
}

export function renderizarCampeones(contenedor, campeones) {
  contenedor.innerHTML = ''; 
  
  const lista = document.createElement('ul');
  lista.className = 'lista-campeones';

  campeones.forEach(campeon => {
    const elemento = document.createElement('li');
    
    // Inyectamos la imagen
    let htmlContent = '';
    if (campeon.imagen) {
      htmlContent += `<img src="${campeon.imagen}" alt="${campeon.nombre}" class="img-campeon">`;
    }
    
    htmlContent += `
      <div class="info-campeon">
        <h3>${campeon.nombre}</h3>
        <p>${campeon.titulo} (Dif: ${campeon.dificultad})</p>
        <small>Roles: ${campeon.roles.join(', ')}</small>
      </div>
    `;
    
    elemento.innerHTML = htmlContent;
    lista.appendChild(elemento);
  });

  contenedor.appendChild(lista);
}

export function renderizarEstadisticas(contenedor, estadisticas) {
  if (estadisticas.total === 0) return;
  
  // Transformamos el objeto de roles en un texto legible
  const conteoRolesTxt = Object.entries(estadisticas.rolesTotales)
    .map(([rol, total]) => `${rol}: ${total}`)
    .join(' | ');

  contenedor.innerHTML = `
    <div>Total mostrados: ${estadisticas.total} | Dificultad media: ${estadisticas.dificultadMedia}</div>
    <div style="font-size: 0.8rem; margin-top: 5px; color: #a0a0a0;">${conteoRolesTxt}</div>
  `;
}