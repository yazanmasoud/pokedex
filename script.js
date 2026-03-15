let allPokemon = [];

function init() {
    loadPokemon();
}


async function loadPokemon() {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0");
    let responseToJson = await response.json();

    let pokemonList = responseToJson.results;

    for (let i = 0; i < pokemonList.length; i++) {
        const pokemon = pokemonList[i];
        let pokemonResponse = await fetch(pokemon.url);
        let pokemonResponseToJson = await pokemonResponse.json();
        
        allPokemon.push(pokemonResponseToJson);
        
        document.getElementById('pokemon-container').innerHTML += getPokemonTemplate(pokemonResponseToJson, i);
    }
}


function openPokemonDialog(index) {
    let pokemon = allPokemon[index];
    console.log(pokemon);
    
    const pokemonDialog = document.getElementById('pokemon-dialog');
    pokemonDialog.innerHTML = getPokemonDialogTemplate(pokemon, index);
    pokemonDialog.showModal();
}

function closePokemonDialog() {
    console.log("dialog closed");
    const pokemonDialog = document.getElementById('pokemon-dialog');
    pokemonDialog.close();
}

function openDialogStatus() {
    let pokemonmain = document.getElementById('pokemon-main');
    let pokemonStatus = document.getElementById('pokemon-status');
    pokemonmain.classList.add("none");
    pokemonStatus.classList.remove("none");
}

function openDialogMain() {
    let pokemonmain = document.getElementById('pokemon-main');
    let pokemonStatus = document.getElementById('pokemon-status');
    pokemonmain.classList.remove("none");
    pokemonStatus.classList.add("none");

}
