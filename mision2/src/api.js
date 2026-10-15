import { obtenerCache, guardarCache } from './cache.js';

const VERSIONS_URL = 'https://ddragon.leagueoflegends.com/api/versions.json';
const TIMEOUT_MS = 5000; // 5 segundos de límite

// NUEVO: Helper para cancelar la petición si tarda demasiado
async function fetchConTimeout(url) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), TIMEOUT_MS);
  
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      throw new Error('Tiempo de espera agotado. La conexión es muy lenta.');
    }
    throw error;
  }
}

export async function fetchDatos() {
  const cache = obtenerCache();
  if (cache) return cache;

  let versionActual = '14.3.1';
  try {
    const resVersiones = await fetchConTimeout(VERSIONS_URL);
    if (resVersiones.ok) {
      const versiones = await resVersiones.json();
      versionActual = versiones[0];
    }
  } catch (error) {
    console.warn('Fallo al obtener la versión de Riot. Usando versión por defecto.');
  }

  const API_URL = `https://ddragon.leagueoflegends.com/cdn/${versionActual}/data/es_ES/champion.json`;

  let respuesta;
  try {
    respuesta = await fetchConTimeout(API_URL);
  } catch (error) {
    // Distinguimos si fue por timeout o caída de red total
    throw new Error(error.message.includes('espera') ? error.message : 'Error de red: Comprueba tu conexión a internet.');
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

  if (!datos || typeof datos !== 'object' || !datos.data || typeof datos.data !== 'object') {
    throw new Error('Error de estructura: La API no devolvió el formato esperado.');
  }

  const arrayCampeones = Object.values(datos.data);
  const resultado = { version: versionActual, campeones: arrayCampeones };
  guardarCache(resultado); 
  return resultado;
}