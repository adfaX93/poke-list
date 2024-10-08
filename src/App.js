import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonList } from './api';
import PokemonList from './components/PokemonList';
import SearchBar from './components/SearchBar';
import { setPokemonList, appendPokemonList, setSelectedPokemon } from './reducers/pokemonReducer';
import PokemonModal from './components/PokemonModal'; 
import { Container, Button } from '@mui/material';
import styled from 'styled-components';

// Styled Component que envuelve el contenedor principal con algunos estilos básicos
const AppContainer = styled(Container)`
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
`;

// Styled Component para el título principal
const Title = styled.h2`
  text-align: center;
  margin: 80px 0 0 0;
`;

// Styled Component para centrar el botón de "Load more Pokémon"
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const App = () => {
  const dispatch = useDispatch();

  // Extraer el estado desde Redux utilizando useSelector
  const pokemons = useSelector((state) => state.pokemon.pokemonList); // Lista de Pokémon
  const searchTerm = useSelector((state) => state.pokemon.searchTerm); // Término de búsqueda
  const selectedPokemon = useSelector((state) => state.pokemon.selectedPokemon); // Pokémon seleccionado

  // Estado local para manejar la paginación
  const [offset, setOffset] = useState(0);
  const limit = 10;  // Número de Pokémon por página

  // useEffect para cargar la primera página de Pokémon al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      const pokemonData = await getPokemonList(0, limit);  // Cargar la primera página de Pokémon
      dispatch(setPokemonList(pokemonData)); // Guardar los Pokémon obtenidos en el estado global
    };
    fetchData();
  }, [dispatch]);

  // Maneja el evento de cargar más Pokémon
  const handleLoadMore = async () => {
    const newOffset = offset + limit;  // Incrementar el offset para la próxima página
    setOffset(newOffset);

    const nextPokemonData = await getPokemonList(newOffset, limit);  // Cargar la siguiente página de Pokémon
    dispatch(appendPokemonList(nextPokemonData));  // Agregar los nuevos Pokémon a la lista existente
  };

  // Manejar el cierre del modal de detalles de Pokémon
  const handleCloseModal = () => {
    dispatch(setSelectedPokemon(null));  // Deseleccionar el Pokémon para cerrar el modal
  };

  // Filtrar la lista de Pokémon según el término de búsqueda ingresado
  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppContainer maxWidth="md"> 
      {/* Barra de búsqueda para filtrar Pokémon */}
      <SearchBar />
      
      {/* Lista de Pokémon filtrada */}
      <PokemonList pokemons={filteredPokemons} />
      
      {/* Modal para mostrar detalles del Pokémon seleccionado */}
      {selectedPokemon && <PokemonModal onClose={handleCloseModal} />}
      
      {/* Botón para cargar más Pokémon */}
      <ButtonContainer>
        <Button onClick={handleLoadMore} variant="contained" color="primary">
          Load more Pokémon
        </Button>
      </ButtonContainer>
    </AppContainer>
  );
}

export default App;
