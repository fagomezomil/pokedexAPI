import { useState } from 'react'
import { FaMagnifyingGlass } from "react-icons/fa6";



export const Card = ({ pokemon }) => {
    const [pokemonElegido, setpokemonElegido] = useState(null);
    const [lupa, setLupa] = useState(false);
    const formatearNombre = (nombre) => {
        return nombre.replace(/-/g, ' ')
            .split(' ')
            .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
            .join(' ');
    }

    return (
        <div>
            <div key={pokemon.data.id} className={`relative w-[100%] self-center ${pokemonElegido === pokemon.data.id ? `col-span-3 row-span-1` : 'col-span-1'
            }`} onClick={() => {
              if (pokemonElegido === pokemon.data.id) {
                setpokemonElegido(null);
              } else {
                setpokemonElegido(pokemon.data.id);
              }
            }} onMouseEnter={() => setLupa(pokemon.data.id)}
            onMouseLeave={() => setLupa(null)}>
            {lupa === pokemon.data.id && (
              <FaMagnifyingGlass
                className="absolute top-2 right-2 text-gray-500"
                size={24}
              />
            )}
            <div className=''>
              <div className={`p-2 relative ${pokemonElegido === pokemon.data.id && 'grid  grid-cols-4'}`}>
                <span className={pokemonElegido === pokemon.data.id && `bg-${pokemonTipos.find(tipo => tipo.tipo === pokemon.data.types[0].type.name)?.color} w-full h-[30%] absolute bottom-0 -z-10 rounded-t-3xl`}></span>
                <div className='col-span-1 content-end'>
                  <img src={pokemon.data.sprites.other.dream_world.front_default} alt="" className={`p-6 ${pokemonElegido === pokemon.data.id && 'w-[800px]'}`} />
                </div>
                <div className='col-span-3 content-end'>
                  <h3 className={`font-light text-gray-400 text-4xl ${pokemonElegido === pokemon.data.id && 'text-7xl'}`}>#{pokemon.data.id}</h3>
                  <h2 className={`font-bold text-neutral-700 text-4xl content-end ${pokemonElegido === pokemon.data.id && 'text-8xl'}`}>{formatearNombre(pokemon.data.name)}</h2>
                  {pokemon.data.types.map((tipo) => (
                    <button key={tipo.type.name} className=' bg-white text-gray-600 rounded-full px-4 py-2 text-lg font-medium mt-4 mb-2 m-1' >{tipo.type.name}</button>
                  ))}
                </div>
              </div>
              <div className={pokemonElegido === pokemon.data.id && 'bg-white drop-shadow-xl'}>
                {pokemonElegido === pokemon.data.id && (
                  <div>
                    <p>Height: {pokemon.data.height}</p>
                    <p>Weight: {pokemon.data.weight}</p>
                    <p>Abilities:</p>
                    <ul>
                      {pokemon.data.abilities.map((ability) => (
                        <li key={ability.ability.name}>{ability.ability.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
            
        </div>
    )
}
