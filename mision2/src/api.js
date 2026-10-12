import { obtenerCache, guardarCache } from './cache.js';

// URL para consultar la versión más reciente de League of Legends
const VERSIONS_URL = 'https://ddragon.leagueoflegends.com/api/versions.json';

export async function fetchDatos() {
  const cache = obtenerCache();
  if (cache) return cache;

  // 1. Obtener la versión dinámica
  let versionActual = '14.3.1'; // Versión por defecto si falla
  try {
    const resVersiones = await fetch(VERSIONS_URL);
    if (resVersiones.ok) {
      const versiones = await resVersiones.json();
      versionActual = versiones[0]; // La primera es siempre la más nueva
    }
  } catch (error) {
    console.warn('Fallo al obtener la versión de Riot. Usando versión por defecto.');
  }

  const API_URL = `https://ddragon.leagueoflegends.com/cdn/${versionActual}/data/es_ES/champion.json`;

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

  // 2. Validación de forma ESTRICTA (Protege contra fallos silenciosos)
  if (!datos || typeof datos !== 'object' || !datos.data || typeof datos.data !== 'object') {
    throw new Error('Error de estructura: La API no devolvió el formato esperado.');
  }

  const arrayCampeones = Object.values(datos.data);
  
  // Guardamos y devolvemos la versión y los campeones
  const resultado = { version: versionActual, campeones: arrayCampeones };
  guardarCache(resultado); 
  return resultado;
}