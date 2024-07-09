import { pokemonTipos } from '../helpers/tipos';

export function BuscadorPokemon({ tipo, handleTipo, pokemon, handleBuscar }) {
  return (
    <div className='fixed bottom-0 z-10 w-full mx-auto h-20 bg-red-500 py-4 flex justify-center'>
      <form className='flex'>
        <label className='text-3xl text-white italic font-medium mr-4'>
          Buscar por nombre de Pokemon
        </label>
        <input
          type='text'
          value={pokemon}
          maxLength={20}
          onChange={(event) => handleBuscar(event.target.value)}
          className='bg-white text-3xl text-red-500 italic rounded-full mr-4 py-1 px-4'
        />

        <label className='text-3xl text-white italic font-medium mr-4'>
          Filtrar por tipo
        </label>
        <select
          value={tipo}
          onChange={(event) => handleTipo(event.target.value)}
          name=''
          id=''
          className='bg-neutral-400 font-bold text-white text-lg px-4 rounded-3xl'
        >
          <option value=''>Todos</option>
          {pokemonTipos.map((tipo) => (
            <option key={tipo.tipo} value={tipo.tipo}>
              {tipo.tipo}
            </option>
          ))}
        </select>

        {tipo !== '' && (
          <button onClick={() => handleTipo('')}>Mostrar Todos</button>
        )}
      </form>
    </div>
  );
}
