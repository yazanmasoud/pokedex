function getPokemonTemplate(pokemonObject, index) {
    let type = pokemonObject.types[0].type.name;
    return `
    <div onclick ="togglePokemonDialog(${index})" class="pokemonCard">
        <h2 class="pokemonName"><b>#${pokemonObject.id}</b> ${pokemonObject.name}</h2> 
        <img class="pokemonImage" src="${pokemonObject.sprites.front_default}">
        <div class="cardFooter">
        <img id= "type-icon" class="typeIcon" src="./icons/${type}.svg">
        </div>
    </div>
    `;
}

function getPokemonDialogTemplate(pokemon , index) {
    return `
    <div class="dialogHeader">
        <button onclick ="togglePokemonDialog(${index})"><img class="esc-img" src="./icons/delete.svg" alt=""></button>
    </div>
    <h2>${pokemon.name}</h2>
    <img src="${pokemon.sprites.front_default}" alt="" />
    `;
}