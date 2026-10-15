export function mostrarCargando(contenedor) {
  contenedor.textContent = ''; // Limpiador seguro (Mejor que innerHTML = '')
  const p = document.createElement('p');
  p.className = 'estado-cargando';
  p.textContent = '⏳ Cargando campeones...';
  contenedor.appendChild(p);
}

export function mostrarError(contenedor, mensajeError, funcionReintento) {
  contenedor.textContent = ''; 
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
  contenedor.textContent = '';
  const p = document.createElement('p');
  p.className = 'estado-vacio';
  p.textContent = '⚠️ No se encontró ningún campeón.';
  contenedor.appendChild(p);
}

export function renderizarCampeones(contenedor, campeones) {
  contenedor.textContent = ''; 
  
  const lista = document.createElement('ul');
  lista.className = 'lista-campeones';

  // Usamos map para crear los nodos (programación funcional)
  const nodosLi = campeones.map(campeon => {
    const elemento = document.createElement('li');
    
    if (campeon.imagen) {
      const img = document.createElement('img');
      img.src = campeon.imagen; // src y alt son seguros asignándolos directamente
      img.alt = campeon.nombre;
      img.className = 'img-campeon';
      elemento.appendChild(img);
    }
    
    const divInfo = document.createElement('div');
    divInfo.className = 'info-campeon';
    
    const h3 = document.createElement('h3');
    h3.textContent = campeon.nombre; // textContent protege contra inyección XSS
    
    const pInfo = document.createElement('p');
    pInfo.textContent = `${campeon.titulo} (Dif: ${campeon.dificultad})`;
    
    const small = document.createElement('small');
    // map + join en lugar de un bucle extra
    small.textContent = `Roles: ${campeon.roles.join(', ')}`;
    
    divInfo.appendChild(h3);
    divInfo.appendChild(pInfo);
    divInfo.appendChild(small);
    
    elemento.appendChild(divInfo);
    return elemento;
  });

  // Agregamos todos los nodos a la lista
  nodosLi.forEach(nodo => lista.appendChild(nodo));
  contenedor.appendChild(lista);
}

export function renderizarEstadisticas(contenedor, estadisticas) {
  contenedor.textContent = ''; 
  if (estadisticas.total === 0) return;
  
  const conteoRolesTxt = Object.entries(estadisticas.rolesTotales)
    .map(([rol, total]) => `${rol}: ${total}`)
    .join(' | ');

  const divPrincipal = document.createElement('div');
  divPrincipal.textContent = `Total mostrados: ${estadisticas.total} | Dificultad media: ${estadisticas.dificultadMedia}`;
  
  const divRoles = document.createElement('div');
  divRoles.className = 'stats-roles'; // Usando la clase CSS en vez de estilos en línea
  divRoles.textContent = conteoRolesTxt;
  
  contenedor.appendChild(divPrincipal);
  contenedor.appendChild(divRoles);
}