import './styles.css';
import { textoAMorse, morseATexto } from './morse';

// Elementos del HTML
const entrada = document.getElementById('input');
const salida = document.getElementById('output');
const cajaErrores = document.getElementById('errors');
const etiquetaEntrada = document.getElementById('input-label');
const etiquetaSalida = document.getElementById('output-label');
const btnTexto = document.getElementById('btn-text');
const btnMorse = document.getElementById('btn-morse');
const btnIntercambiar = document.getElementById('swap');
const btnLimpiar = document.getElementById('clear');

// Modo actual: 'texto' o 'morse'
let modo = 'texto';

// Hace la conversión según el modo y muestra el resultado
const convertir = () => {
  // Validación: si no hay nada escrito, limpiamos todo
  if (entrada.value.trim() === '') {
    salida.value = '';
    cajaErrores.textContent = '';
    return;
  }

  let respuesta;
  if (modo === 'texto') {
    respuesta = textoAMorse(entrada.value);
  } else {
    respuesta = morseATexto(entrada.value);
  }

  salida.value = respuesta.resultado;
  cajaErrores.textContent = respuesta.errores.join(' ');
};

// Cambia el modo y actualiza los textos de la pantalla
const cambiarModo = (nuevoModo) => {
  modo = nuevoModo;

  if (modo === 'texto') {
    etiquetaEntrada.textContent = 'Texto';
    etiquetaSalida.textContent = 'Código Morse';
    entrada.placeholder = 'Escribe tu texto aquí...';
    btnTexto.classList.add('active');
    btnMorse.classList.remove('active');
  } else {
    etiquetaEntrada.textContent = 'Código Morse';
    etiquetaSalida.textContent = 'Texto';
    entrada.placeholder = 'Ejemplo: .... --- .-.. .-';
    btnMorse.classList.add('active');
    btnTexto.classList.remove('active');
  }

  convertir();
};

// Eventos de los botones
btnTexto.addEventListener('click', () => cambiarModo('texto'));
btnMorse.addEventListener('click', () => cambiarModo('morse'));

// Convierte cada vez que el usuario escribe
entrada.addEventListener('input', convertir);

// Intercambiar: el resultado pasa a ser la entrada
btnIntercambiar.addEventListener('click', () => {
  const resultadoAnterior = salida.value;
  const nuevoModo = modo === 'texto' ? 'morse' : 'texto';
  entrada.value = resultadoAnterior;
  cambiarModo(nuevoModo);
});

// Limpiar todo
btnLimpiar.addEventListener('click', () => {
  entrada.value = '';
  salida.value = '';
  cajaErrores.textContent = '';
});