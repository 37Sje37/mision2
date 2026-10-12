import { fetchDatos } from './api.js';
import { transformarCampeones, filtrarCampeones, calcularEstadisticas } from './logic.js';
import { mostrarCargando, mostrarError, mostrarVacio, renderizarCampeones, renderizarEstadisticas } from './render.js';

const appContenedor = document.querySelector('#app');
const statsContenedor = document.querySelector('#stats');
const inputBusqueda = document.querySelector('#buscador');
const selectRol = document.querySelector('#filtro-rol');

let campeonesTransformados = [];

export async function iniciarApp() {
  mostrarCargando(appContenedor);
  statsContenedor.textContent = ''; 

  try {
    const datosBrutos = await fetchDatos();
    campeonesTransformados = transformarCampeones(datosBrutos);
    actualizarInterfaz();
  } catch (error) {
    mostrarError(appContenedor, error.message, iniciarApp);
  }
}

function actualizarInterfaz() {
  const texto = inputBusqueda.value.trim();
  const rol = selectRol ? selectRol.value : 'Todos';

  const filtrados = filtrarCampeones(campeonesTransformados, texto, rol);

  if (filtrados.length === 0) {
    mostrarVacio(appContenedor);
  } else {
    renderizarCampeones(appContenedor, filtrados);
  }

  const estadisticas = calcularEstadisticas(filtrados);
  renderizarEstadisticas(statsContenedor, estadisticas);
}

inputBusqueda.addEventListener('input', actualizarInterfaz);
if (selectRol) {
  selectRol.addEventListener('change', actualizarInterfaz);
}

iniciarApp();