import { useDispatch, useSelector } from "react-redux"
import BuscadorPokemon from "./components/BuscadorPokemon"
import ListaPokemones from "./components/ListaPokemones"
import { useEffect, useState } from "react"
import { getPokemons } from "./slices/pokeSlice"

function App() {
  
  

  return (
    <>
      <ListaPokemones/>
    </>
  )
}

export default App
