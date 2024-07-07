
import { pokemonTipos } from '../helpers/tipos'
const BuscadorPokemon = ({tipo, handleTipo, pokemon , handleBuscar}) => {

  return (

    <div>
      <form>
        <label>Buscar Pokemon por Nombre</label>
        <input type="text" value={pokemon} onChange={handleBuscar} className='border-2'/>
        <select value={tipo} onChange={handleTipo} name="" id="">
          <option value="">Todos</option>
          {pokemonTipos.map(tipo => <option key={tipo.tipo} value={tipo.tipo}>{tipo.tipo}</option>)}
        </select>
      </form>
    </div>
  )
}

export default BuscadorPokemon
