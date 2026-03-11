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

function getPokemonDialogTemplate(pokemon, index) {
    return `
    <div class="pokemonDialogInner">
    <div class="dialogHeader">
        <h2>${pokemon.name}</h2>
        <button onclick ="closePokemonDialog(${index})"><img class="esc-img" src="./icons/delete.svg" alt="Pokemon Dialog photo"></button>
    </div>
    
    <img class ="dialogImage" src="${pokemon.sprites.other["official-artwork"].front_default}" alt="" />
    <div class="pokemonInDialog">
        <span><strong>height: </strong>${pokemon.height}</span>
        <span><strong>weight: </strong>${pokemon.weight}</span>
        <span><strong>id: </strong>${pokemon.id}</span>
    </div>
    </div>
    `;
}