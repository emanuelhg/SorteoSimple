# Sorteo Simple

Demo: [https://emanuelhg.github.io/SorteoSimple/](https://emanuelhg.github.io/SorteoSimple/)

Sorteo Simple es una aplicación web estática para elegir ganadores de forma aleatoria a partir de una lista de participantes. No necesita backend ni build: todo funciona con HTML, CSS y JavaScript vanilla.

## Funciones principales

- Define entre 1 y 100 premios.
- Carga participantes uno por línea.
- Detecta repetidos y permite limpiarlos en un clic.
- Puede quitar duplicados automáticamente al sortear.
- Permite volver a sortear manteniendo la misma base de participantes.
- Puede excluir ganadores previos para rondas sucesivas.
- Guarda el estado en `localStorage`.
- Guarda el idioma seleccionado en `localStorage`.
- Permite alternar la interfaz entre español, inglés y portugués.
- Copia el resultado al portapapeles.
- Exporta el resultado a un archivo `.txt`.
- Muestra una revelación animada de ganadores.
- Usa confirmaciones suaves para acciones sensibles.

## Estructura

- `index.html`: interfaz principal.
- `styles.css`: sistema visual responsive.
- `raffle-core.js`: lógica pura del sorteo y validaciones reutilizables.
- `scripts.js`: integración con DOM, persistencia, traducciones y acciones de la UI.
- `favicon.svg`: marca visual y favicon del sitio.
- `site.webmanifest`: metadatos básicos de identidad del sitio.
- `tests/raffle-core.test.js`: pruebas básicas del módulo puro.
- `media/`: iconos del footer.

## Cómo usarlo

1. Abre `index.html` en tu navegador.
2. Elige el idioma desde el selector `ES / EN / PT`.
3. Escribe participantes, uno por línea.
4. Ajusta la cantidad de premios y, si quieres, las opciones avanzadas.
5. Ejecuta el sorteo, vuelve a sortear, copia o exporta el resultado.

## Verificación rápida

- Sintaxis JS: `node --check scripts.js`
- Tests del módulo puro: `node tests/raffle-core.test.js`

## Mejoras aplicadas

- Rediseño integral de la interfaz.
- Validaciones inline y feedback con toast.
- Estado vacío para resultados.
- Métricas de participantes repetidos y disponibles.
- Historial acumulado de ganadores excluidos.
- Separación entre lógica pura y código de interfaz.
- Favicon y branding propio.
- Soporte de interfaz multilenguaje.
