import React from "react";
import { useSelector } from "react-redux";
import styled from 'styled-components';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Ícono de cerrar modal de Material UI

// Styled Components para estilizar el Modal
const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Contenido del Modal estilizado
const ModalContent = styled(Box)`
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
  max-width: 90%;
  margin: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  max-height: 80%;
`;

// Estilo para el título del Modal
const ModalTitle = styled(Typography)`
  margin: 0;
  padding-bottom: 10px;
  font-family: 'Arial', sans-serif;
  color: #333;
  font-size: 1.5em;
  text-align: center;
`;

// Estilo para los textos dentro del Modal
const ModalText = styled(Typography)`
  line-height: 1.5;
  color: #555;
  font-size: 1em;
  margin: 10px 0;
  text-align: justify;
`;

// Estilo para la imagen del Pokémon en el Modal
const PokemonImage = styled.img`
  display: block;
  margin: 0 auto;
  width: 40%;
  height: auto;
  border-radius: 8px;
`;

const PokemonModal = ({ onClose }) => {
    // Obtener el Pokémon seleccionado desde el estado global de Redux
    const pokemon = useSelector((state) => state.pokemon.selectedPokemon);
  
    // Si no hay Pokémon seleccionado, el modal no se muestra (retorna null)
    if (!pokemon) return null;
  
    return (
      <StyledModal open={!!pokemon} onClose={onClose}>
        {/* Contenido del Modal con detalles del Pokémon */}
        <ModalContent>
          {/* Botón para cerrar el modal */}
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          {/* Mostrar el nombre del Pokémon */}
          <ModalTitle variant="h4">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </ModalTitle>
          {/* Imagen del Pokémon */}
          <PokemonImage src={pokemon.imageUrl} alt={pokemon.name} />
          {/* Tipo y habilidades del Pokémon */}
          <ModalText>Type: {pokemon.type}</ModalText>
          <ModalText>Abilities: {pokemon.abilities.join(', ')}</ModalText>
          {/* Descripción flavor text del Pokémon */}
          <ModalText>{pokemon.flavorText}</ModalText>
        </ModalContent>
      </StyledModal>
    );
};

export default PokemonModal;
