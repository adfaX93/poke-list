import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../reducers/pokemonReducer';
import styled from 'styled-components';
import { TextField } from '@mui/material'; // Usar TextField de Material UI para el input de búsqueda

// Styled Component para el contenedor de la barra de búsqueda
const SearchBarContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: white; /* Fondo blanco */
    z-index: 1000; /* Asegurarse de que esté por encima de otros elementos */
    padding: 10px; /* Espaciado interno */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Sombra suave para efecto de elevación */
    display: flex; /* Usar flexbox para centrar los elementos */
    justify-content: center; /* Centrar horizontalmente */
    align-items: center; /* Centrar verticalmente */
    transition: background-color 0.3s; /* Transición suave al cambiar el fondo */
`;

// Styled Component para el input de Material UI (TextField)
const StyledTextField = styled(TextField)`
    width: 100%;
    max-width: 400px; /* Limitar el ancho máximo del input */
    padding: 10px; /* Espaciado interno */
    border-radius: 5px; /* Bordes redondeados */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Sombra suave */

    /* Estilos personalizados para el borde y las transiciones del input */
    & .MuiOutlinedInput-root {
        border-color: #ccc; /* Borde gris claro */
        transition: border-color 0.3s, box-shadow 0.3s; /* Transiciones suaves al enfocar o pasar el cursor */

        &:hover .MuiOutlinedInput-notchedOutline {
            border-color: #4a90e2; /* Borde azul cuando se pasa el cursor */
        }

        &.Mui-focused .MuiOutlinedInput-notchedOutline {
            border-color: #4a90e2; /* Borde azul al enfocar */
            box-shadow: 0 0 5px rgba(74, 144, 226, 0.5); /* Sombra azul al enfocar */
        }
    }
`;

const SearchBar = () => {
    const dispatch = useDispatch(); // Hook de Redux para despachar acciones
    const searchTerm = useSelector((state) => state.pokemon.searchTerm); // Obtiene el término de búsqueda del estado global de Redux

    // Función que maneja el cambio en el input de búsqueda
    const handleInputChange = (e) => {
        const term = e.target.value; // Obtener el valor del input
        dispatch(setSearchTerm(term)); // Despacha la acción para actualizar el término de búsqueda en el estado global de Redux
    };

    return (
        // Contenedor de la barra de búsqueda
        <SearchBarContainer>
            {/* Input de búsqueda estilizado con Material UI */}
            <StyledTextField
                variant="outlined"
                placeholder="Search Pokémon..." // Placeholder para el input
                value={searchTerm} // Valor del input basado en el estado global
                onChange={handleInputChange}  // Llama a la función para actualizar el estado cuando cambia el input
                aria-label="Search Pokémon" // Atributo de accesibilidad
            />
        </SearchBarContainer>
    );
};

export default SearchBar;
