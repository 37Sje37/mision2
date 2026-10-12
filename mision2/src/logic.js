export function transformarCampeones(campeonesBrutos) {
  return campeonesBrutos.map(campeon => {
    const dificultad = (campeon.info && campeon.info.difficulty) ? campeon.info.difficulty : 0;
    const imagenUrl = (campeon.image && campeon.image.full) 
      ? `https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${campeon.image.full}` 
      : '';

    return {
      id: campeon.id,
      nombre: campeon.name,
      titulo: campeon.title,
      roles: campeon.tags || [],
      dificultad: dificultad,
      imagen: imagenUrl
    };
  });
}

export function filtrarCampeones(campeones, textoBusqueda, rolSeleccionado) {
  let filtrados = campeones;
  
  if (textoBusqueda) {
    const textoLimpio = textoBusqueda.toLowerCase();
    filtrados = filtrados.filter(campeon => 
      campeon.nombre.toLowerCase().includes(textoLimpio)
    );
  }
  
  if (rolSeleccionado && rolSeleccionado !== 'Todos') {
    filtrados = filtrados.filter(campeon => campeon.roles.includes(rolSeleccionado));
  }
  
  return filtrados;
}

export function calcularEstadisticas(campeones) {
  if (campeones.length === 0) return { total: 0, dificultadMedia: 0, rolesTotales: {} };

  const stats = campeones.reduce((acumulador, campeon) => {
    acumulador.sumaDificultad += campeon.dificultad;
    
    campeon.roles.forEach(rol => {
      if (!acumulador.conteoRoles[rol]) {
        acumulador.conteoRoles[rol] = 0;
      }
      acumulador.conteoRoles[rol]++;
    });
    
    return acumulador;
  }, { sumaDificultad: 0, conteoRoles: {} });

  const media = (stats.sumaDificultad / campeones.length).toFixed(1);

  return {
    total: campeones.length,
    dificultadMedia: media,
    rolesTotales: stats.conteoRoles
  };
}