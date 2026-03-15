function getPokemonTemplate(pokemon, index) {
    const type = pokemon.types[0].type.name;

    return `
    <div onclick="openPokemonDialog(${index})" class="pokemonCard">
        <h2 class="pokemonName"><b>#${pokemon.id}</b> ${pokemon.name}</h2> 
        <img class="pokemonImage" src="${pokemon.sprites.front_default}">
        
        <div class="cardFooter">
            <img class="typeIcon" src="./icons/${type}.svg">
        </div>
    </div>
    `;
}

function getPokemonDialogTemplate(pokemon, index) {
    return `
    <div class="pokemonDialogInner" onclick="event.stopPropagation()">
        <div class="dialogHeader">
            <h2 class="dialogPokemonName">${pokemon.name}</h2>
            <button onclick="closePokemonDialog()">
                <img class="esc-img" src="./icons/delete.svg" alt="">
            </button>
        </div>

        <img class="dialogImage" src="${pokemon.sprites.other["official-artwork"].front_default}" />

        <nav class="dialogNavBar">
            <a onclick="openDialogMain()">Main</a>
            <a onclick="openDialogStatus()">Status</a>
        </nav>

        <div id="pokemon-main" class="pokemonMain">
            <span><strong>Height:</strong> ${(pokemon.height * 0.1).toFixed(1)} m</span>
            <span><strong>Weight:</strong> ${(pokemon.weight * 0.1).toFixed(2)} kg</span>
            <span><strong>Base experience:</strong> ${pokemon.base_experience}</span>
        </div>

        <div id="pokemon-status" class="pokemonStatus none">
            <div class= "progressBar">
              <div class="progressBarInner" style="height:24px;width:${(allPokemon[index].stats[0].base_stat) / 2}%" >
                <strong>hp: </strong> ${allPokemon[index].stats[0].base_stat}
              </div>
            </div>
            <div class= "progressBar">
              <div class="progressBarInner" style="background-color: #af3b3bff; height:24px;width:${(allPokemon[index].stats[1].base_stat) / 2}%" >
                <strong>attack: </strong> ${allPokemon[index].stats[1].base_stat}
              </div>
            </div>
            <div class= "progressBar">
              <div class="progressBarInner" style=" background-color: #a49e25ff; height:24px;width:${(allPokemon[index].stats[2].base_stat) / 2}%" >
                <strong>defence: </strong> ${allPokemon[index].stats[2].base_stat}
              </div>
            </div>
            <div class= "progressBar">
              <div class="progressBarInner" style="background-color: #870909ff; height:24px;width:${(allPokemon[index].stats[3].base_stat) / 2}%" >
                <strong>special-attack: </strong> ${allPokemon[index].stats[3].base_stat}
              </div>
            </div>
            <div class= "progressBar">
              <div class="progressBarInner" style="background-color: #696e0aff; height:24px;width:${(allPokemon[index].stats[4].base_stat) / 2}%" >
                <strong>special-defence: </strong> ${allPokemon[index].stats[4].base_stat}
              </div>
            </div>
            <div class= "progressBar">
              <div class="progressBarInner" style="background-color: #008df1ff; height:24px;width:${(allPokemon[index].stats[5].base_stat) / 2}%" >
                <strong>speed: </strong> ${allPokemon[index].stats[5].base_stat}
              </div>
            </div>
        </div>
        <div class ="prevNextButtons">
                <button onclick="openPokemonDialog(${index -1})"><img src="./icons/arrow.png" alt="left arrow" /></button>
                <button onclick="openPokemonDialog(${index +1})"><img src="./icons/right-arrow.png" alt="right arrow" /></button>   
        </div>
    </div>
    `;
}


