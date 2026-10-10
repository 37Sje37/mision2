// src/api.js

const API_URL = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/data/es_ES/champion.json';

export async function fetchDatos() {
  const respuesta = await fetch(API_URL);

  // Es obligatorio comprobar respuesta.ok para manejar correctamente los errores HTTP
  if (!respuesta.ok) {
    throw new Error(`Error en la petición: ${respuesta.status} - ${respuesta.statusText}`);
  }

  const datos = await respuesta.json();
  
  // Data Dragon devuelve los campeones dentro de un objeto llamado 'data'.
  // Como la rúbrica exige usar métodos de array (map, filter, reduce), 
  // usamos Object.values() para convertir ese objeto en un array de campeones.
  return Object.values(datos.data); 
}