function getPokemonTemplate(pokemonObject) {
    return `
    <div class="pokemonCard">
        <h2 class="pokemonName"><b>#${pokemonObject.id}</b> ${pokemonObject.name}</h2> 
        <img class="pokemonImage" src="${pokemonObject.sprites.front_default}">
        <div class="cardFooter">
            icon
        </div>
    </div>
    `;
}