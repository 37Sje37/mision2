const CACHE_KEY = 'lol_champions_v2';
const TIEMPO_EXPIRACION = 1000 * 60 * 60 * 24; // 24 horas

export function obtenerCache() {
  try {
    const item = localStorage.getItem(CACHE_KEY);
    if (!item) return null;
    
    const datosGuardados = JSON.parse(item);
    const tiempoActual = Date.now();
    
    if (tiempoActual - datosGuardados.timestamp > TIEMPO_EXPIRACION) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return datosGuardados.data;
  } catch (error) {
    return null; 
  }
}

export function guardarCache(data) {
  try {
    const payload = {
      timestamp: Date.now(),
      data: data
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch (error) {
    console.error('Error guardando en caché', error);
  }
}