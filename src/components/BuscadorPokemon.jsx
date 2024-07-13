import { FaMagnifyingGlass } from 'react-icons/fa6';
import { pokemonTipos } from '../helpers/tipos';
import { useState } from 'react';
import { IoClose } from "react-icons/io5";

export function BuscadorPokemon({ tipo, handleTipo, pokemon, handleBuscar }) {
  const [buscador, setBuscador] = useState(false);
  console.log(buscador)
  return (
    <div className='fixed bottom-0 z-10 w-full mx-auto bg-red-500 py-4 p-3 '>
      {
        buscador ?
          <div className='max-w-7xl mx-auto grid justify-items-end'>
            <button onClick={() => setBuscador(false)} className='text-3xl text-red-600 bg-white p-2 rounded-full w-fit'>
              <IoClose />
            </button>
            <form className='lg:justify-center lg:flex'>
              <div>
                <label className='text-xl md:text-3xl text-white w-full italic font-medium mr-4 '>
                  Buscar por nombre de Pokemon
                </label>
                <input
                  type='text'
                  value={pokemon}
                  maxLength={20}
                  onChange={(event) => handleBuscar(event.target.value)}
                  className='bg-white w-full text-3xl  h-[60px] mt-3  text-neutral-600 italic font-semibold rounded-full mr-4 py-1 px-4 focus:outline-none focus:border-2 focus:border-red-700 '
                />
              </div>
              <div className='flex flex-col lg:ml-3 md:w-[40%]'>
                <label className='mt-4 lg:mt-0 text-xl md:text-3xl text-white italic font-medium mr-4'>
                  Filtrar por tipo
                </label>
                <div className='flex'>
                  <select
                    value={tipo}
                    onChange={(event) => handleTipo(event.target.value)}
                    name=''
                    id=''
                    className='bg-neutral-400 font-bold h-[60px] w-full text-white text-lg px-4 rounded-3xl mt-3'
                  >
                    <option value=''>Todos</option>
                    {pokemonTipos.map((tipo) => (
                      <option key={tipo.tipo} value={tipo.tipo}>
                        {tipo.tipo}
                      </option>
                    ))}
                  </select>

                  {tipo !== '' && (
                    <button onClick={() => handleTipo('')} className='bg-red-700 h-[60px] w-full  text-white font-bold text-[14px] uppercase rounded-full mt-3 mr-4 py-1 mx-4 px-4'>Mostrar Todos</button>
                  )}
                </div>
              </div>
            </form>
          </div>
          :
          <div className='max-w-7xl mx-auto flex justify-center'>
            <p onClick={() => setBuscador(!buscador)} className='flex justify-center text-xl md:text-3xl text-white  italic font-medium mr-4 items-center'>Buscar por nombre de Pokemon
              <FaMagnifyingGlass className=' text-red-500 bg-white rounded-full p-2 ml-4' size={50} />
            </p>
            {tipo !== '' && (
              <button onClick={() => handleTipo('')} className='bg-red-700 h-[60px]  text-white font-bold text-[14px] uppercase rounded-full mt-3 md:mr-4 py-1 md:mx-4 px-4'>Mostrar Todos</button>
            )}
          </div>
      }





    </div>
  );
}
