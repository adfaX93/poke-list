// Función para obtener la lista de Pokémon desde la API de Pokémon, utilizando paginación con offset y limit
export const getPokemonList = async (offset = 0, limit = 10) => {
    // Realiza una solicitud a la API para obtener la lista de Pokémon con el offset y limit proporcionados
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    
    // Convierte la respuesta en formato JSON
    const data = await response.json();
    
    // Retorna solo los resultados (lista de Pokémon)
    return data.results;
};