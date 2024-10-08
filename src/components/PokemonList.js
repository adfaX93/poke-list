import { useDispatch } from 'react-redux';
import { setSelectedPokemon } from "../reducers/pokemonReducer";
import styled from 'styled-components';
import { Card, CardActionArea, CardMedia, CardContent, Typography } from '@mui/material';

// Styled Component para el contenedor de la lista de Pokémon
const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Centramos los elementos */
  margin-top: 20px;
`;

// Styled Component para cada item individual de la lista
const ListItem = styled.div`
  margin: 10px;
  width: 150px; /* Ancho del item de la lista */
`;


const PokemonList = ({ pokemons }) => {
    const dispatch = useDispatch(); // Hook de Redux para despachar acciones

    // Función para abrir el modal y obtener los detalles del Pokémon
    const openModal = async (pokemon) => {
        // Fetch para obtener los detalles del Pokémon seleccionado
        const response = await fetch(pokemon.url);
        const data = await response.json();
    
        // Fetch adicional para obtener detalles de la especie del Pokémon, incluyendo el flavor_text
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();
    
        // Filtrar el flavor_text en inglés para mostrar la última generación disponible
        const englishFlavorTexts = speciesData.flavor_text_entries.filter(
            entry => entry.language.name === "en"
        );
        const lastFlavorText = englishFlavorTexts[englishFlavorTexts.length - 1]?.flavor_text || "No description available";

        // Dispatch de la acción para establecer el Pokémon seleccionado en el estado de Redux
        dispatch(setSelectedPokemon({
            name: data.name,
            imageUrl: data.sprites.other.home.front_default,
            type: data.types.map(t => t.type.name).join(', '),
            abilities: data.abilities.map(a => a.ability.name),
            flavorText: lastFlavorText,
        }));
    };

    return(
        <>
            {/* Título para la lista de Pokémon */}
            <Typography variant="h2" align="center" style={{ margin: '80px 0 0 0' }}>
                Pokémon List
            </Typography>
            
            {/* Contenedor de la lista de Pokémon */}
            <ListContainer>
                {pokemons.map(pokemon => (
                    <ListItem key={pokemon.url.split("/")[6]} onClick={() => openModal(pokemon)}>
                        {/* Cada Pokémon está dentro de un Card de Material UI */}
                        <Card>
                            <CardActionArea>
                                {/* Imagen del Pokémon utilizando CardMedia de Material UI */}
                                <CardMedia
                                    component="img"
                                    alt={pokemon.name}
                                    height="140"
                                    image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/")[6]}.png`}
                                    title={pokemon.name}
                                />
                                <CardContent>
                                    {/* Mostrar el nombre del Pokémon */}
                                    <Typography variant="h6" component="div">
                                        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </ListItem>
                ))}
            </ListContainer>
        </>
    );
};

export default PokemonList;
