import { obtenerCache, guardarCache } from './cache.js';

const API_URL = 'https://ddragon.leagueoflegends.com/cdn/14.3.1/data/es_ES/champion.json';

export async function fetchDatos() {
  const cache = obtenerCache();
  if (cache) return cache;

  let respuesta;
  try {
    respuesta = await fetch(API_URL);
  } catch (error) {
    throw new Error('Error de red: Comprueba tu conexión a internet.');
  }

  if (!respuesta.ok) {
    throw new Error(`Error HTTP: El servidor respondió con estado ${respuesta.status}`);
  }

  let datos;
  try {
    datos = await respuesta.json();
  } catch (error) {
    throw new Error('Error de formato: JSON inválido devuelto por el servidor.');
  }

  if (!datos || !datos.data) {
    throw new Error('Error en los datos: No se encontró la lista de campeones en la respuesta.');
  }

  const arrayCampeones = Object.values(datos.data);
  guardarCache(arrayCampeones); 
  return arrayCampeones;
}