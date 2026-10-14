// Diccionario: cada letra con su código morse
export const morseMap = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.',
  H: '....', I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.',
  Ñ: '--.--', O: '---', P: '.--.', Q: '--.-', R: '.-.', S: '...', T: '-',
  U: '..-', V: '...-', W: '.--', X: '-..-', Y: '-.--', Z: '--..',
  0: '-----', 1: '.----', 2: '..---', 3: '...--', 4: '....-',
  5: '.....', 6: '-....', 7: '--...', 8: '---..', 9: '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', '!': '-.-.--'
};

// Diccionario al revés: cada código morse con su letra
const morseInverso = {};
for (const letra in morseMap) {
  morseInverso[morseMap[letra]] = letra;
}

// Cambia las vocales con tilde por vocales normales
const quitarTilde = (letra) => {
  const tildes = { Á: 'A', É: 'E', Í: 'I', Ó: 'O', Ú: 'U', Ü: 'U' };
  if (tildes[letra]) {
    return tildes[letra];
  }
  return letra;
};

// Convierte texto normal a morse
export const textoAMorse = (texto) => {
  const errores = [];
  const palabrasMorse = [];

  // Pasamos a mayúsculas y quitamos espacios repetidos
  const palabras = texto.trim().toUpperCase().replace(/\s+/g, ' ').split(' ');

  palabras.forEach((palabra) => {
    const letrasMorse = [];

    for (let i = 0; i < palabra.length; i++) {
      const letra = quitarTilde(palabra[i]);

      if (morseMap[letra]) {
        letrasMorse.push(morseMap[letra]);
      } else if (!errores.includes(palabra[i])) {
        errores.push(palabra[i]); // guardamos el carácter no válido
      }
    }

    if (letrasMorse.length > 0) {
      palabrasMorse.push(letrasMorse.join(' ')); // letras separadas por espacio
    }
  });

  return {
    resultado: palabrasMorse.join(' / '), // palabras separadas por /
    errores: errores.length > 0 ? [`Caracteres no válidos: ${errores.join(' ')}`] : []
  };
};

// Convierte morse a texto normal
export const morseATexto = (morse) => {
  const texto = morse.trim();

  // Validación: solo puntos, guiones, espacios y /
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (c !== '.' && c !== '-' && c !== '/' && c !== ' ' && c !== '\n') {
      return {
        resultado: '',
        errores: ['El morse solo puede tener puntos (.), guiones (-), espacios y /']
      };
    }
  }

  const errores = [];
  let resultado = '';
  const palabras = texto.split('/');

  palabras.forEach((palabra, indice) => {
    const codigos = palabra.trim().split(/\s+/);

    codigos.forEach((codigo) => {
      if (codigo === '') {
        return; // si está vacío, lo saltamos
      }
      if (morseInverso[codigo]) {
        resultado += morseInverso[codigo];
      } else {
        resultado += '?';
        if (!errores.includes(codigo)) {
          errores.push(codigo);
        }
      }
    });

    // Espacio entre palabras (menos después de la última)
    if (indice < palabras.length - 1) {
      resultado += ' ';
    }
  });

  return {
    resultado: resultado.trim(),
    errores: errores.length > 0 ? [`Códigos no reconocidos: ${errores.join(' ')}`] : []
  };
};