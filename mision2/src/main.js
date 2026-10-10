// src/main.js
import { fetchDatos } from './api.js';
import { transformarCampeones, filtrarCampeones, calcularEstadisticas } from './logic.js';
import { mostrarCargando, mostrarError, mostrarVacio, renderizarCampeones, renderizarEstadisticas } from './render.js';

// Referencias al DOM
const appContenedor = document.querySelector('#app');
const statsContenedor = document.querySelector('#stats');
const inputBusqueda = document.querySelector('#buscador');

// Estado global de la aplicación
let campeonesTransformados = [];

async function iniciarApp() {
  mostrarCargando(appContenedor);

  try {
    // 1. Pedimos los datos a la API
    const datosBrutos = await fetchDatos();
    
    // 2. Transformamos los datos con map()
    campeonesTransformados = transformarCampeones(datosBrutos);
    
    // 3. Pintamos la interfaz inicial
    actualizarInterfaz(campeonesTransformados);
    
  } catch (error) {
    // Aquí capturamos los errores lanzados desde api.js si respuesta.ok fue false o si falló la red
    mostrarError(appContenedor, error.message);
  }
}

function actualizarInterfaz(campeones) {
  // Manejamos el estado "Vacío"
  if (campeones.length === 0) {
    mostrarVacio(appContenedor);
  } else {
    // Manejamos el estado "Datos"
    renderizarCampeones(appContenedor, campeones);
  }

  // Actualizamos las estadísticas
  const estadisticas = calcularEstadisticas(campeones);
  renderizarEstadisticas(statsContenedor, estadisticas);
}

// Evento para el buscador en tiempo real
inputBusqueda.addEventListener('input', (evento) => {
  const texto = evento.target.value;
  const filtrados = filtrarCampeones(campeonesTransformados, texto);
  actualizarInterfaz(filtrados);
});

// Arrancamos la aplicación
iniciarApp();