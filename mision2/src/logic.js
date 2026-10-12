const traduccionRoles = {
  Fighter: 'Luchador', Tank: 'Tanque', Mage: 'Mago',
  Assassin: 'Asesino', Marksman: 'Tirador (ADC)', Support: 'Apoyo (Supp)'
};

export function transformarCampeones(campeonesBrutos, version) {
  if (!Array.isArray(campeonesBrutos)) return [];

  return campeonesBrutos
    .filter(campeon => campeon && typeof campeon === 'object' && campeon.id)
    .map(campeon => {
      
      const dificultad = campeon?.info?.difficulty ?? 0;
      const imagenName = campeon?.image?.full;
      
      const imagenUrl = imagenName 
        ? `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${imagenName}` 
        : '';

      const rolesTraducidos = (campeon?.tags || []).map(rol => traduccionRoles[rol] || rol);

      return {
        id: campeon.id,
        nombre: campeon.name || 'Desconocido',
        titulo: campeon.title || '',
        roles: rolesTraducidos,
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
    // Buscamos el rol traducido para que el filtro funcione con el desplegable
    const rolTraducido = traduccionRoles[rolSeleccionado] || rolSeleccionado;
    filtrados = filtrados.filter(campeon => campeon.roles.includes(rolTraducido));
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