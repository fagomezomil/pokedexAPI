import { FaMagnifyingGlass } from 'react-icons/fa6';
import { pokemonTipos } from '../helpers/tipos';
import { formatearNombre, obtenerColorDeTipo } from '../helpers/funciones';

export const CardPokemon = ({
  pokemon,
  pokemonElegido,
  handlePokemonElegido,
  lupa,
  handleLupa,
  handleTipo,
}) => {
  return (
    <div
      className={`relative w-[100%] self-center ${
        pokemonElegido === pokemon.id ? `md:col-span-3 row-span-1` : 'col-span-1'
      }`}
      onClick={() => {
        if (pokemonElegido === pokemon.id) {
          handlePokemonElegido(null);
        } else {
          handlePokemonElegido(pokemon.id);
        }
      }}
      onMouseEnter={() => handleLupa(pokemon.id)}
      onMouseLeave={() => handleLupa(null)}
    >
      {lupa === pokemon.id && (
        <FaMagnifyingGlass
          className='absolute top-2 right-2 text-gray-500'
          size={24}
        />
      )}
      <div className=''>
        <div
          className={`p-2 relative ${
            pokemonElegido === pokemon.id ? 'grid  md:grid-cols-5' : ''
          }`}
        >
          <span
            className={
              pokemonElegido === pokemon.id
                ? `bg-${obtenerColorDeTipo(
                    pokemonTipos,
                    pokemon.types[0].type.name
                  )} w-full h-[30%] absolute bottom-0 -z-10 rounded-t-3xl`
                : ''
            }
          ></span>
          <div className='col-span-1 md:col-span-2 content-end'>
            <img
              src={pokemon.sprites.other.dream_world.front_default}
              alt=''
              className={`w-[320px] h-[320px]`}
            />
          </div>
          <div className='md:col-span-3 content-end'>
            <h3
              className={`font-light text-gray-400 text-3xl ${
                pokemonElegido === pokemon.id ? 'md:text-7xl' : ''
              }`}
            >
              #{pokemon.id}
            </h3>
            <h2
              className={`font-bold text-neutral-700 text-4xl content-end ${
                pokemonElegido === pokemon.id ? `text-5xl  lg:text-[90px] md:mt-7 md:mb-5` : ''
              }`}
            >
              {formatearNombre(pokemon.name)}
            </h2>
            <div
              className={`bg-${obtenerColorDeTipo(
                pokemonTipos,
                pokemon.types[0].type.name
              )} mt-4 p-2 rounded-xl`}
            >
              <p className='text-white font-bold italic pl-3 text-lg'>
                Tipo de Pokemon
              </p>
              <div className='flex '>
                {pokemon.types.map((tipo) => (
                  <button
                    key={tipo.type.name}
                    onClick={() => handleTipo(tipo.type.name)}
                    className='relative w-fit bg-white text-gray-500 rounded-full px-5 py-2 text-lg font-semibold mt-4 mb-2 m-1 capitalize hover:bg-neutral-400 hover:text-white'
                  >
                    {tipo.type.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            pokemonElegido === pokemon.id ? 'bg-white drop-shadow-xl' : ''
          }
        >
          {pokemonElegido === pokemon.id && (
            <>
              <div className='p-6 grid md:grid-cols-9'>
                <p className='col-span-1 md:col-span-2 text-3xl uppercase text-neutral-400'>
                  Altura:{' '}
                  <span className='text-5xl text-neutral-500'>
                    {pokemon.height}pm
                  </span>
                </p>
                <p className='col-span-1 md:col-span-2 text-3xl uppercase text-neutral-400'>
                  Peso:{' '}
                  <span className='text-5xl text-neutral-500'>
                    {pokemon.weight}pk
                  </span>
                </p>
                <div className='col-span-5 w-max-[400px]'>
                  <p className='text-3xl uppercase text-neutral-400'>
                    Poke Habilidades:
                  </p>
                  <ul className='flex flex-wrap'>
                    {pokemon.abilities.map((ability) => (
                      <li
                        key={ability.ability.name}
                        className='text-left text-4xl text-neutral-500 mr-6'
                      >
                        {formatearNombre(ability.ability.name)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className='p-4'>
                {pokemon.stats.map((stat) => (
                  <div
                    key={stat.stat.name}
                    className='h-[25px] w-full flex mb-4 bg-neutral-400 rounded-lg relative'
                  >
                    <div
                      className={`h-[25px]  bg-${obtenerColorDeTipo(
                        pokemonTipos,
                        pokemon.types[0].type.name
                      )} rounded-lg ${stat.base_stat > 0 ? 'w-1' : 'w-0'}`}
                      style={{ width: `${(stat.base_stat / 160) * 100}%` }}
                    ></div>

                    <p className='drop-shadow-md text-lg font-bold text-white absolute left-3 top-0'>
                      {formatearNombre(stat.stat.name)}
                    </p>
                    <p className='text-white font-bold text-xl ml-2'>
                      {stat.base_stat}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
