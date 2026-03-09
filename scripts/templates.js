function getPokemonTemplate(pokemonObject) {
    let type = pokemonObject.types[0].type.name;
    return `
    <div class="pokemonCard">
        <h2 class="pokemonName"><b>#${pokemonObject.id}</b> ${pokemonObject.name}</h2> 
        <img class="pokemonImage" src="${pokemonObject.sprites.front_default}">
        <div class="cardFooter">
        <img class="typeIcon" src="./icons/${type}.svg">
        </div>
    </div>
    `;
}