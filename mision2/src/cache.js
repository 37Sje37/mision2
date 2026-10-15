const CACHE_KEY = 'lol_champions_v3';
const TIEMPO_EXPIRACION = 1000 * 60 * 60 * 24; // 24 horas

export function obtenerCache() {
  try {
    const item = localStorage.getItem(CACHE_KEY);
    if (!item) return null;
    
    const datosGuardados = JSON.parse(item);
    
    if (Date.now() - datosGuardados.timestamp > TIEMPO_EXPIRACION) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    // NUEVO: Validación estricta de la estructura en caché
    const data = datosGuardados.data;
    if (!data || typeof data !== 'object' || !data.version || !Array.isArray(data.campeones)) {
      localStorage.removeItem(CACHE_KEY); // Si está corrupta, la borramos
      return null;
    }

    return data;
  } catch (error) {
    return null; 
  }
}

export function guardarCache(data) {
  try {
    const payload = { timestamp: Date.now(), data: data };
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch (error) {
    console.error('Error guardando en caché', error);
  }
}