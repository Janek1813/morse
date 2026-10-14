# Traductor Morse (Webpack + Babel)

Convierte texto a Morse y Morse a texto. Botón para elegir el tipo de conversión.

## Uso
```bash
npm install
npm start          # desarrollo en http://localhost:3000
npm run build      # genera /dist para producción
npm run deploy     # publica /dist en GitHub Pages (rama gh-pages)
```

## Formato del Morse
- Letras separadas por **un espacio**.
- Palabras separadas por **/**.
- Ejemplo: `.... --- .-.. .- / -- ..- -. -.. ---` = HOLA MUNDO

## Despliegue
**GitHub Pages:** sube el repo a GitHub, ejecuta `npm run deploy` y activa Pages en
Settings → Pages → rama `gh-pages`.
**Netlify / Vercel:** conecta el repo, build command `npm run build`, carpeta de salida `dist`.

## Estructura
- `src/morse.js` – lógica pura (diccionario, conversiones, validaciones)
- `src/index.js` – interacción con el DOM
- `src/styles.css`, `src/index.html` – interfaz
- `webpack.config.js`, `babel.config.json` – configuración de build
