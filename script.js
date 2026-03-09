async function loadPokemon() {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=0");
    let responseToJson = await response.json();
    let pokemonList = responseToJson.results;

    for (let i = 0; i < pokemonList.length; i++) {
        const pokemon = pokemonList[i];
        let pokemonResponse = await fetch(pokemon.url);
        let pokemonResponseToJson = await pokemonResponse.json();
        console.log(pokemonResponseToJson);
        document.getElementById('pokemon-container').innerHTML += getPokemonTemplate(pokemonResponseToJson);
        
        
    }
}
