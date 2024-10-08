import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './reducers/pokemonReducer'; // Importa el reducer del slice de Pokémon

// Configura el store de Redux usando configureStore de Redux Toolkit
// Incluye el reducer de Pokémon para manejar el estado relacionado con la lista y selección de Pokémon
const store = configureStore({
  reducer: {
    pokemon: pokemonReducer, // Asocia el estado de Pokémon con su reducer
  },
});

export default store; // Exporta el store para usarlo en la aplicación