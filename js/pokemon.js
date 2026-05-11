/**
 * Portal de Talentos Escolares
 * Página Talentos Pokémon - Integración con PokeAPI
 * Archivo: pokemon.js
 */

// Esperar a que el DOM esté listo
$(document).ready(function() {
    // Agregar event listeners a todos los botones de Pokémon
    $('.pokemon-btn').on('click', function() {
        const pokemonName = $(this).data('pokemon');
        obtenerPokemonInfo(pokemonName);
    });
});

// Función para obtener información del Pokémon desde la API
async function obtenerPokemonInfo(pokemonName) {
    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById('pokemonModal'));
    modal.show();
    
    // Mostrar loading en el modal
    const modalBody = document.getElementById('pokemonModalBody');
    modalBody.innerHTML = `
        <div class="text-center py-4">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
            <p class="mt-2">Cargando información de ${pokemonName.toUpperCase()}...</p>
        </div>
    `;
    
    try {
        // Llamar a la PokeAPI
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        
        if (!response.ok) {
            throw new Error('Pokémon no encontrado');
        }
        
        const pokemon = await response.json();
        
        // Obtener especie para descripción
        const speciesResponse = await fetch(pokemon.species.url);
        const species = await speciesResponse.json();
        
        // Buscar descripción en español
        let description = 'No hay descripción disponible en español';
        for (let entry of species.flavor_text_entries) {
            if (entry.language.name === 'es') {
                description = entry.flavor_text.replace(/\f/g, ' ');
                break;
            }
        }
        
        // Renderizar la información en el modal
        mostrarInfoPokemon(pokemon, species, description);
        
    } catch (error) {
        console.error('Error al obtener Pokémon:', error);
        modalBody.innerHTML = `
            <div class="text-center py-4">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #dc3545;"></i>
                <p class="mt-3">No se pudo cargar la información del Pokémon. Intenta nuevamente.</p>
            </div>
        `;
    }
}

// Función para mostrar la información del Pokémon en el modal
function mostrarInfoPokemon(pokemon, species, description) {
    const modalBody = document.getElementById('pokemonModalBody');
    
    // Construir HTML con la información
    const html = `
        <div class="pokemon-info-card">
            <div class="pokemon-info-header">
                <div class="pokemon-sprite">
                    <img src="${pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}" 
                         alt="${pokemon.name}">
                </div>
                <div class="pokemon-stats">
                    <h2 class="pokemon-name">${pokemon.name}</h2>
                    <div class="pokemon-types">
                        ${pokemon.types.map(type => `
                            <span class="type-badge type-${type.type.name}">${type.type.name}</span>
                        `).join('')}
                    </div>
                    <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
                    <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
                    <p><strong>Experiencia base:</strong> ${pokemon.base_experience}</p>
                </div>
            </div>
            
            <div class="pokemon-description">
                <h5><i class="fas fa-book-open"></i> Descripción</h5>
                <p>${description}</p>
            </div>
            
            <div class="stats-grid">
                <h5><i class="fas fa-chart-line"></i> Estadísticas base</h5>
                ${pokemon.stats.map(stat => `
                    <div class="stat-item">
                        <span class="stat-label">${stat.stat.name.replace('-', ' ')}</span>
                        <div class="stat-bar">
                            <div class="stat-fill" style="width: ${(stat.base_stat / 255) * 100}%"></div>
                        </div>
                        <span class="stat-value">${stat.base_stat}</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="pokemon-abilities">
                <h5><i class="fas fa-star"></i> Habilidades</h5>
                <div class="ability-list">
                    ${pokemon.abilities.map(ability => `
                        <span class="ability-badge">${ability.ability.name.replace('-', ' ')}</span>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    modalBody.innerHTML = html;
}

// Función adicional: Obtener lista de movimientos (opcional)
async function obtenerMovimientosPokemon(pokemonName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const pokemon = await response.json();
        
        // Tomar los primeros 4 movimientos
        const movimientos = pokemon.moves.slice(0, 4).map(move => move.move.name);
        return movimientos;
    } catch (error) {
        console.error('Error al obtener movimientos:', error);
        return [];
    }
}

// Función para buscar Pokémon por nombre (para futuras expansiones)
async function buscarPokemon() {
    const searchTerm = $('#searchPokemon').val().toLowerCase().trim();
    if (searchTerm) {
        await obtenerPokemonInfo(searchTerm);
    }
}