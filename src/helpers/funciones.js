export const formatearNombre = (nombre) => {
  return nombre
    .replace(/-/g, ' ')
    .split(' ')
    .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1))
    .join(' ');
};

export const obtenerColorDeTipo = (pokemonTipos, tipoNombre) => {
  const tipoEncontrado = pokemonTipos.find((tipo) => tipo.tipo === tipoNombre);
  return tipoEncontrado ? tipoEncontrado.color : '';
};

export const obtenerColorDeTexto = (pokemonTipos, tipoNombre) => {
  const tipoEncontrado = pokemonTipos.find((tipo) => tipo.tipo === tipoNombre);
  return tipoEncontrado ? tipoEncontrado.color2 : '';
};
