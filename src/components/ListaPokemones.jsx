import { useEffect, useState } from 'react'
import BuscadorPokemon from './BuscadorPokemon'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemons } from '../slices/pokeSlice'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { pokemonTipos } from '../helpers/tipos';


const ListaPokemones = () => {
  const [pokemonElegido, setpokemonElegido] = useState(null);
  const [lupa, setLupa] = useState(false);

  const [tipo, setTipo] = useState("");

  const [pokemonBuscado, setPokemonBuscado] = useState('')
  const [pokemonFiltrado, setPokemonFiltrado] = useState([])
  const listaPokemones = useSelector((state) => state.pokemones.pokedex)
  const estado = useSelector((state) => state.pokemones.status)
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

    if (tipo !== "") {
      filtro = filtro.filter((pokemon) =>
        pokemon.data.types.map(type => type.type.name).includes(tipo))

    }
    setPokemonFiltrado(filtro)
  }

  const handleTipo = (e) => {
    setTipo(e.target.value)
  }

  const handleBuscar = (e) => {
    setPokemonBuscado(e.target.value)

  }

  const obtenerColorDeTipo = (pokemonTipos, tipoNombre) => {
    const tipoEncontrado = pokemonTipos.find(tipo => tipo.tipo === tipoNombre);
    return tipoEncontrado ? tipoEncontrado.color : '';
  }

  const obtenerColorDeTexto = (pokemonTipos, tipoNombre) => {
    const tipoEncontrado = pokemonTipos.find(tipo => tipo.tipo === tipoNombre);
    console.log(tipoEncontrado)
    return tipoEncontrado ? tipoEncontrado.color2 : '';


  }

  useEffect(() => {
    listaFiltrada()
  }, [pokemonBuscado, tipo, listaPokemones])

  const formatearNombre = (nombre) => {
    return nombre.replace(/-/g, ' ')
      .split(' ')
      .map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1))
      .join(' ');
  }

  if (estado === 'Cargando') {
    return <div>Cargando...</div>
  }

  return (
    <main className='font-mali mt-[250px]'>
      <BuscadorPokemon tipo={tipo} handleTipo={handleTipo} handleBuscar={handleBuscar} setTipo={setTipo} pokemon={pokemonBuscado} />
      <section className='grid grid-cols-4 gap-10 max-w-7xl mx-auto'>



        {pokemonFiltrado.length > 0 ? pokemonFiltrado.map((pokemon) => (
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
                <div className={`p-2 relative ${pokemonElegido === pokemon.data.id && 'grid  grid-cols-5'}`}>
                  <span className={pokemonElegido === pokemon.data.id && `bg-${obtenerColorDeTipo(pokemonTipos, pokemon.data.types[0].type.name)} w-full h-[30%] absolute bottom-0 -z-10 rounded-t-3xl`}></span>
                  <div className='col-span-2 content-end'>
                    <img src={pokemon.data.sprites.other.dream_world.front_default} alt="" className={`w-[320px] h-[320px]`} />
                  </div>
                  <div className='col-span-3 content-end'>
                    <h3 className={`font-light text-gray-400 text-4xl ${pokemonElegido === pokemon.data.id && 'text-7xl'}`}>#{pokemon.data.id}</h3>
                    <h2 className={`font-bold text-neutral-700 text-4xl content-end ${pokemonElegido === pokemon.data.id && `text-[90px] mt-7 mb-5`}`}>{formatearNombre(pokemon.data.name)}</h2>
                    <div className={`bg-${obtenerColorDeTipo(pokemonTipos, pokemon.data.types[0].type.name)} mt-4 p-2 rounded-xl`}>
                      <p className='text-white font-bold italic pl-3 text-lg'>Tipo de Pokemon</p>
                      <div className='flex '>
                        {pokemon.data.types.map((tipo) => (
                          <button key={tipo.type.name} onClick={() => setTipo(tipo.type.name)} className='relative w-fit bg-white text-gray-500 rounded-full px-8 py-2 text-lg font-semibold mt-4 mb-2 m-1 capitalize hover:bg-neutral-400 hover:text-white' >{tipo.type.name}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={pokemonElegido === pokemon.data.id && 'bg-white drop-shadow-xl'}>
                  {pokemonElegido === pokemon.data.id && (
                    <>
                      <div className='p-6 grid grid-cols-9'>
                        <p className='col-span-2 text-3xl uppercase text-neutral-400'>Altura: <span className='text-5xl text-neutral-500'>{pokemon.data.height}pm</span></p>
                        <p className='col-span-2 text-3xl uppercase text-neutral-400'>Peso: <span className='text-5xl text-neutral-500'>{pokemon.data.weight}pk</span></p>
                        <div className='col-span-5 w-max-[400px]'>
                          <p className='text-3xl uppercase text-neutral-400'>Poke Habilidades:</p>
                          <ul className='flex flex-wrap'>
                            {pokemon.data.abilities.map((ability) => (
                              <li key={ability.ability.name} className='text-left text-4xl text-neutral-500 mr-6'>{formatearNombre(ability.ability.name)}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="p-4">
                        {pokemon.data.stats.map((stat) => (
                          <div key={stat.stat.name} className="h-[25px] w-full flex mb-4 bg-neutral-400 rounded-lg relative">
                            <div
                              className={`h-[25px]  bg-${obtenerColorDeTipo(pokemonTipos, pokemon.data.types[0].type.name)} rounded-lg ${stat.base_stat > 0 ? 'w-1' : 'w-0'}`}
                              style={{ width: `${stat.base_stat / 160 * 100}%` }}
                            ></div>

                            <p className="drop-shadow-md text-lg font-bold text-white absolute left-3 top-0">
                              {formatearNombre(stat.stat.name)}
                            </p>
                            <p className='text-white font-bold text-xl ml-2'>{stat.base_stat}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                </div>



              </div>
            </div>
          </>
        ))
          :
          <div className='col-span-4 mx-auto my-auto'>
            <h1 className='text-6xl italic text-red-500 text-center'>No hay pokemones que coincidan con su búsqueda</h1>
          </div>
        }


      </section >
    </main>
  )
}

export default ListaPokemones
