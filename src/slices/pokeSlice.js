import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  pokedex: [],
  status: null,
  error: null,
};

export const getPokemons = createAsyncThunk(
  'pokemons/getPokemons',
  async () => {
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
    const respuesta2 = res.data.results;
    const resp = respuesta2.map((pokemon) =>
      axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
    );

    const data = await Promise.all(resp);
    const pokemons = data.map((pokemon) => pokemon.data);

    return pokemons;
  }
);

const pokeSlice = createSlice({
  name: 'pokedex',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPokemons.pending, (state, action) => {
        state.status = 'Cargando';
      })
      .addCase(getPokemons.fulfilled, (state, action) => {
        state.status = 'Exitoso';
        state.pokedex = action.payload;
      })
      .addCase(getPokemons.rejected, (state, action) => {
        state.status = 'Denegado';
        state.error = action.error.message;
      });
  },
});

export default pokeSlice.reducer;
