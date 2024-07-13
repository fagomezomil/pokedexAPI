import { useState } from 'react';
import { BuscadorPokemon } from './BuscadorPokemon';
import { CardPokemon } from './CardPokemon';
import { useFilter } from '../hooks/useFilter';
import { usePokemonsAction } from '../hooks/usePokemonsAction';
import { Load } from './Load';

export function ListaPokemones() {
  const [pokemonElegido, setpokemonElegido] = useState(null);
  const [lupa, setLupa] = useState(false);

  const { listaPokemones, estado } = usePokemonsAction();

  const { handleTipo, tipo, handleBuscar, pokemonBuscado, pokemonFiltrado } =
    useFilter({
      listaPokemones,
    });

  const handleLupa = (value) => {
    setLupa(value);
  };

  const handlePokemonElegido = (value) => {
    setpokemonElegido(value);
  };

  if (estado === 'Cargando') {
    return <Load />;
  }

  return (
    <main className='font-mali mt-[250px]'>
      <BuscadorPokemon
        tipo={tipo}
        handleTipo={handleTipo}
        handleBuscar={handleBuscar}
        pokemon={pokemonBuscado}
      />
      <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto mb-[130px] p-3'>
        {pokemonFiltrado.length > 0 ? (
          pokemonFiltrado.map((pokemon) => (
            <CardPokemon
              key={pokemon.id}
              pokemon={pokemon}
              pokemonElegido={pokemonElegido}
              handlePokemonElegido={handlePokemonElegido}
              lupa={lupa}
              handleLupa={handleLupa}
              handleTipo={handleTipo}
            />
          ))
        ) : (
          <div className='col-span-4 mx-auto my-auto'>
            <h1 className='text-4xl md:text-6xl italic text-red-500 text-center p-4 md:p-16 '>
              No hay pokemones que coincidan con su búsqueda
            </h1>
          </div>
        )}
      </section>
    </main>
  );
}
