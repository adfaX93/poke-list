import { createSlice } from '@reduxjs/toolkit';

// Estado inicial que contiene:
// - La lista de Pokémon (`pokemonList`)
// - El Pokémon seleccionado (`selectedPokemon`)
// - El término de búsqueda (`searchTerm`)
const initialState = {
  pokemonList: [],
  selectedPokemon: null,
  searchTerm: '',
};

// Crear un slice para manejar el estado y las acciones relacionadas con los Pokémon
const pokemonSlice = createSlice({
  name: 'pokemon', // Nombre del slice
  initialState,    // Estado inicial definido arriba
  reducers: {
    // Acción para establecer la lista completa de Pokémon
    setPokemonList(state, action) {
      state.pokemonList = action.payload;
    },
    // Acción para agregar más Pokémon a la lista existente (usada para cargar más Pokémon de forma incremental)
    appendPokemonList(state, action) {
      state.pokemonList = [...state.pokemonList, ...action.payload];
    },
    // Acción para establecer el Pokémon seleccionado (cuando se selecciona un Pokémon específico para ver sus detalles)
    setSelectedPokemon(state, action) {
      state.selectedPokemon = action.payload;
    },
    // Acción para establecer el término de búsqueda para filtrar los Pokémon por nombre
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
});

// Exportar las acciones generadas automáticamente por createSlice
// Estas acciones son utilizadas por los componentes para actualizar el estado de la aplicación
export const { setPokemonList, appendPokemonList, setSelectedPokemon, setSearchTerm } = pokemonSlice.actions;

// Exportar el reducer generado por createSlice
// El reducer será usado en el store para manejar los cambios en el estado
export default pokemonSlice.reducer;