// src/logic.js

// 1. map(): Transforma la lista original para quedarnos solo con los datos que nos interesan
export function transformarCampeones(campeonesBrutos) {
  return campeonesBrutos.map(campeon => {
    return {
      id: campeon.id,
      nombre: campeon.name,
      titulo: campeon.title,
      roles: campeon.tags, // Es un array con los roles (Ej: ["Fighter", "Tank"])
      dificultad: campeon.info.difficulty
    };
  });
}

// 2. filter(): Filtra el array según lo que el usuario escriba en un buscador
export function filtrarCampeones(campeones, textoBusqueda) {
  if (!textoBusqueda) return campeones;
  
  const textoLimpio = textoBusqueda.toLowerCase();
  
  return campeones.filter(campeon => 
    campeon.nombre.toLowerCase().includes(textoLimpio)
  );
}

// 3. reduce(): Calcula un dato estadístico, por ejemplo, la suma total de las dificultades
export function calcularEstadisticas(campeones) {
  if (campeones.length === 0) return { total: 0, dificultadMedia: 0 };

  const sumaDificultad = campeones.reduce((acumulador, campeon) => {
    return acumulador + campeon.dificultad;
  }, 0);

  const media = (sumaDificultad / campeones.length).toFixed(1);

  return {
    total: campeones.length,
    dificultadMedia: media
  };
}