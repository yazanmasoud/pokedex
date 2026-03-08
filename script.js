async function loadPokemon() {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
    let responseToJson = await response.json();
    console.log(responseToJson);
    
}
loadPokemon();