let allPokemon = [];
let currentDialogTab = "main";
let limit = 20;
let offset = 0;
function init() {
    loadPokemon();
}

async function loadPokemon() {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
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
    if (currentDialogTab === "main") {
        openDialogMain();
    } else {
        openDialogStatus();
    }
}

function closePokemonDialog() {
    console.log("dialog closed");
    const pokemonDialog = document.getElementById('pokemon-dialog');
    pokemonDialog.close();
}

function openDialogStatus() {
    let pokemonmain = document.getElementById('pokemon-main');
    let pokemonStatus = document.getElementById('pokemon-status');
    let pokemonEvolution = document.getElementById('pokemon-evolution')
    let navButtonMain = document.getElementById('nav-button-main');
    let navButtonStats = document.getElementById('nav-button-stats');
    let navButtonEvolution = document.getElementById('nav-button-evolution');
    switchClassActiveToStats(pokemonmain, pokemonStatus, navButtonMain, navButtonStats, pokemonEvolution, navButtonEvolution);

}

function openDialogMain() {
    let pokemonmain = document.getElementById('pokemon-main');
    let pokemonStatus = document.getElementById('pokemon-status');
    let pokemonEvolution = document.getElementById('pokemon-evolution')
    let navButtonEvolution = document.getElementById('nav-button-evolution');
    let navButtonMain = document.getElementById('nav-button-main');
    let navButtonStats = document.getElementById('nav-button-stats');
    switchClassActiveToMain(pokemonmain, pokemonStatus, navButtonMain, navButtonStats, pokemonEvolution, navButtonEvolution);
}

function openDialogEvolution() {
    let pokemonmain = document.getElementById('pokemon-main');
    let pokemonStatus = document.getElementById('pokemon-status');
    let pokemonEvolution = document.getElementById('pokemon-evolution')
    let navButtonEvolution = document.getElementById('nav-button-evolution');
    let navButtonMain = document.getElementById('nav-button-main');
    let navButtonStats = document.getElementById('nav-button-stats');
    switchClassActiveToEvolution(pokemonmain, pokemonStatus, navButtonMain, navButtonStats, pokemonEvolution, navButtonEvolution);
}


function switchClassActiveToMain(pokemonmain, pokemonStatus, navButtonMain, navButtonStats, pokemonEvolution, navButtonEvolution) {
    pokemonmain.classList.remove("none");
    pokemonStatus.classList.add("none");
    pokemonEvolution.classList.add("none")
    navButtonMain.classList.add("active");
    navButtonStats.classList.remove("active");
    navButtonEvolution.classList.remove("active");
    currentDialogTab = "main"
}

function switchClassActiveToStats(pokemonmain, pokemonStatus, navButtonMain, navButtonStats, pokemonEvolution, navButtonEvolution) {
    pokemonmain.classList.add("none");
    pokemonStatus.classList.remove("none");
    pokemonEvolution.classList.add("none")
    navButtonMain.classList.remove("active");
    navButtonStats.classList.add("active");
    navButtonEvolution.classList.remove("active");
    currentDialogTab = "stats";
}

function switchClassActiveToEvolution(pokemonmain, pokemonStatus, navButtonMain, navButtonStats, pokemonEvolution, navButtonEvolution) {
    pokemonmain.classList.add("none");
    pokemonStatus.classList.add("none");
    pokemonEvolution.classList.remove("none")
    navButtonMain.classList.remove("active");
    navButtonStats.classList.remove("active");
    navButtonEvolution.classList.add("active");
    currentDialogTab = "evolution";
}

function loadMorePokemon() {
    if (offset >= 80) return;
    offset += 20;
    loadPokemon();
}

function findPokemonName() {
    let inputSubname = document.getElementById('search-field').value.toLowerCase();
    let pok = allPokemon.filter(pok => pok.name.includes(inputSubname))
    document.getElementById('pokemon-container').innerHTML = "";
    for (let index = 0; index < pok.length; index++) {
        const element = pok[index];
        document.getElementById('pokemon-container').innerHTML += getPokemonTemplate(element, allPokemon.indexOf(element));
    }

}



