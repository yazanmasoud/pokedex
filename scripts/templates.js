function getPokemonTemplate(pokemonObject, index) {
    let type = pokemonObject.types[0].type.name;
    return `
    <div onclick ="openPokemonDialog(${index})" class="pokemonCard">
        <h2 class="pokemonName"><b>#${pokemonObject.id}</b> ${pokemonObject.name}</h2> 
        <img class="pokemonImage" src="${pokemonObject.sprites.front_default}">
        <div class="cardFooter">
        <img id= "type-icon" class="typeIcon" src="./icons/${type}.svg">
        </div>
    </div>
    `;
}