import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from '../slices/pokeSlice';

export function usePokemonsAction() {
  const listaPokemones = useSelector((state) => state.pokemones.pokedex);
  const estado = useSelector((state) => state.pokemones.status);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons());
  }, []);

  return { listaPokemones, estado };
}
