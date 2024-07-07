import { useEffect, useState } from 'react'
import BuscadorPokemon from './BuscadorPokemon'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemons } from '../slices/pokeSlice'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Card } from './Card';


const ListaPokemones = () => {
  const [pokemonElegido, setpokemonElegido] = useState(null);
  const [lupa, setLupa] = useState(false);

  const [pokemonBuscado, setPokemonBuscado] = useState('')
  const [pokemonFiltrado, setPokemonFiltrado] = useState([])
  const listaPokemones = useSelector((state) => state.pokemones.pokedex)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPokemons())
  }, [])

  const listaFiltrada = () => {
    const lista = listaPokemones
    let filtro = lista
    if (pokemonBuscado.trim() === "") {
      filtro = lista
    } else {
      filtro = lista.filter((pokemon) => pokemon.data.name.toLowerCase().includes(pokemonBuscado.toLowerCase()))
    }
    setPokemonFiltrado(filtro)
  }

  const pokemonTipos = [
    { tipo: 'grass', color: 'emerald-200', color2: 'emerald-600' },
    { tipo: 'poison', color: 'purple-200', color2: 'purple-600' },
    { tipo: 'fire', color: 'red-200', color2: 'red-600' },
    { tipo: 'flying', color: 'blue-200', color2: 'blue-600' },
    { tipo: 'water', color: 'cyan-200', color2: 'cyan-600' },
    { tipo: 'bug', color: 'green-200', color2: 'green-600' },
    { tipo: 'normal', color: 'gray-200', color2: 'gray-600' },
    { tipo: 'ground', color: 'yellow-200', color2: 'yellow-600' },
    { tipo: 'fairy', color: 'pink-200', color2: 'pink-600' },
    { tipo: 'electric', color: 'amber-200', color2: 'amber-600' },
    { tipo: 'fighting', color: 'orange-200', color2: 'orange-600' },
    { tipo: 'psychic', color: 'violet-200', color2: 'violet-600' },
    { tipo: 'rock', color: 'stone-200', color2: 'stone-600' },
    { tipo: 'ice', color: 'sky-200', color2: 'sky-600' },
    { tipo: 'ghost', color: 'slate-200', color2: 'slate-600' },
    { tipo: 'steel', color: 'neutral-200', color2: 'neutral-600' },
    { tipo: 'dragon', color: 'indigo-200', color2: 'indigo-600' },
    { tipo: 'dark', color: 'black-200', color2: 'black-600' },
  ];
  const handleBuscar = (e) => {
    setPokemonBuscado(e.target.value)
  }

  useEffect(() => {
    listaFiltrada()
  }, [pokemonBuscado])

  const formatearNombre = (nombre) => {
    return nombre.replace(/-/g, ' ')
      .split(' ')
      .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
      .join(' ');
  }


  return (
    <main className='font-mali'>
      <BuscadorPokemon handleBuscar={handleBuscar} pokemon={pokemonBuscado} />
      <section className='grid grid-cols-4 gap-10 max-w-7xl mx-auto'>



        {pokemonFiltrado.length > 0 && pokemonFiltrado.map((pokemon) => (
          <>

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
          </>

        ))}

          <>
          </>
      </section>
    </main>
  )
}

export default ListaPokemones
