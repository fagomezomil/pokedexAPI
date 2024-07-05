import React, { useEffect, useState } from 'react'
import BuscadorPokemon from './BuscadorPokemon'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemons } from '../slices/pokeSlice'


const ListaPokemones = () => {

    const [pokemonBuscado,setPokemonBuscado] = useState('')
  const [pokemonFiltrado, setPokemonFiltrado] = useState([])
  const listaPokemones = useSelector((state) => state.pokemones.pokedex)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPokemons())
    }, [])

    const listaFiltrada = () => {
      const lista = listaPokemones
      let filtro = lista
      if(pokemonBuscado.trim() === ""){
         filtro = lista
      }else{
        filtro = lista.filter((pokemon) => pokemon.data.name.toLowerCase().includes(pokemonBuscado.toLowerCase()))
      }
      setPokemonFiltrado(filtro)
    }

    const handleBuscar = (e) => {
      setPokemonBuscado(e.target.value)
    }

    useEffect(() => {
        listaFiltrada()
    },[pokemonBuscado])
    
    

  return (
    <>
    <BuscadorPokemon handleBuscar={handleBuscar} pokemon={pokemonBuscado}/>
    <section className='grid grid-cols-4'>
        {pokemonFiltrado.map((pokemon) => (
            <div className='col-span-1'>
            <img src={pokemon.data.sprites.other.dream_world.front_default} alt="" className=''/>
            <div>
                <h2 className='text-xl font-bold text-center'>{pokemon.data.name}</h2>
                {pokemon.data.types.map((tipo) => (
                    <h3 className='text-center'>{tipo.type.name}</h3>
                ))}
            <button className='bg-neutral-400 text-white'>Ver Detalle</button>
            </div>
        </div>
        ))}
    </section>
        </>
  )
}

export default ListaPokemones
