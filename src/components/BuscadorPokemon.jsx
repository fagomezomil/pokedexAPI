import React, { useState } from 'react'

const BuscadorPokemon = ({pokemon , handleBuscar}) => {

  return (
    <div>
      <form>
        <label>Buscar Pokemon por Nombre</label>
        <input type="text" value={pokemon} onChange={handleBuscar} className='border-2'/>
      </form>
    </div>
  )
}

export default BuscadorPokemon
