import { useEffect, useState } from 'react';

export function useFilter({ listaPokemones }) {
  const [tipo, setTipo] = useState('');
  const [pokemonBuscado, setPokemonBuscado] = useState('');
  const [pokemonFiltrado, setPokemonFiltrado] = useState([]);

  const handleTipo = (value) => {
    setTipo(value);
  };

  const handleBuscar = (value) => {
    setPokemonBuscado(value);
  };

  const listaFiltrada = () => {
    const lista = listaPokemones;
    let filtro = lista;
    if (pokemonBuscado.trim() === '') {
      filtro = lista;
    } else {
      filtro = lista.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(pokemonBuscado.toLowerCase())
      );
    }

    if (tipo !== '') {
      filtro = filtro.filter((pokemon) =>
        pokemon.types.map((type) => type.type.name).includes(tipo)
      );
    }
    setPokemonFiltrado(filtro);
  };

  useEffect(() => {
    listaFiltrada();
  }, [pokemonBuscado, tipo, listaPokemones]);

  return { handleTipo, tipo, handleBuscar, pokemonBuscado, pokemonFiltrado };
}
