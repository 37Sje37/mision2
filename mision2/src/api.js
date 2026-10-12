import { obtenerCache, guardarCache } from './cache.js';

const API_URL = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/data/es_ES/champion.json';

export async function fetchDatos() {
  // 1. Intentamos leer la caché válida primero
  const cache = obtenerCache();
  if (cache) return cache;

  let respuesta;
  try {
    // 2a. Error de RED (Sin internet, DNS, etc.)
    respuesta = await fetch(API_URL);
  } catch (error) {
    throw new Error('Error de red: Comprueba tu conexión a internet.');
  }

  // 2b. Error HTTP (404, 500, etc.)
  if (!respuesta.ok) {
    throw new Error(`Error HTTP: El servidor respondió con estado ${respuesta.status}`);
  }

  let datos;
  try {
    // 2c. Error de parseo JSON
    datos = await respuesta.json();
  } catch (error) {
    throw new Error('Error de formato: JSON inválido devuelto por el servidor.');
  }

  // 3. Validación de seguridad de la estructura (que datos.data exista)
  if (!datos || !datos.data) {
    throw new Error('Error en los datos: No se encontró la lista de campeones en la respuesta.');
  }

  const arrayCampeones = Object.values(datos.data);
  guardarCache(arrayCampeones); // Guardamos para la próxima vez
  return arrayCampeones;
}