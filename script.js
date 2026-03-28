let allPokemon = [];
let currentDialogTab = "main";
let limit = 20;
let offset = 0;
let currentPokemonIndex = 0;
let isLoading = false
function init() {
    loadPokemon();
}

async function loadPokemon() {
    showLoadingSpinner();

    try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        let responseToJson = await response.json();
        let pokemonList = responseToJson.results;
        let newPokemon = [];

        for (let i = 0; i < pokemonList.length; i++) {
            const pokemon = pokemonList[i];
            let pokemonResponse = await fetch(pokemon.url);
            let pokemonResponseToJson = await pokemonResponse.json();
            newPokemon.push(pokemonResponseToJson);
        }

        allPokemon.push(...newPokemon);
        renderPokemon(newPokemon);

    } catch (error) {
        console.error("Fehler beim Laden der Pokemon:", error);
    } finally {
        hideLoadingSpinner();
    }
}

function renderPokemon(newPokemon) {
    let pokemonContainer = document.getElementById('pokemon-container');
    let html = "";
    for (let i = 0; i < newPokemon.length; i++) {
        const pokemon = newPokemon[i];
        html += getPokemonTemplate(pokemon, allPokemon.indexOf(pokemon));
    }
    pokemonContainer.innerHTML += html;
}

function openPokemonDialog(index) {
    if (index < 0 || index >= allPokemon.length || isLoading) {
        return;
    }
    let pokemon = allPokemon[index];
    currentPokemonIndex = index;
    const pokemonDialog = document.getElementById('pokemon-dialog');
    pokemonDialog.innerHTML = getPokemonDialogTemplate(pokemon, index);
    pokemonDialog.showModal();
    document.body.classList.add("noScroll");
    openDialogElements();
}

function openDialogElements() {
    if (currentDialogTab === "main") {
        openDialogMain();
    } else if (currentDialogTab === "stats") {
        openDialogStatus();
    } else {
        openDialogEvolution();
    }
}

function closePokemonDialog() {
    console.log("dialog closed");
    const pokemonDialog = document.getElementById('pokemon-dialog');
    pokemonDialog.close();
    document.body.classList.remove("noScroll");
}

function getDialogElements() {
    return {
        pokemonmain: document.getElementById('pokemon-main'),
        pokemonStatus: document.getElementById('pokemon-status'),
        pokemonEvolution: document.getElementById('pokemon-evolution'),
        navButtonMain: document.getElementById('nav-button-main'),
        navButtonStats: document.getElementById('nav-button-stats'),
        navButtonEvolution: document.getElementById('nav-button-evolution')
    }
}

function openDialogStatus() {
    let el = getDialogElements();
    switchClassActiveToStats(
        el.pokemonmain,
        el.pokemonStatus,
        el.navButtonMain,
        el.navButtonStats,
        el.pokemonEvolution,
        el.navButtonEvolution);
}

function openDialogMain() {
    let el = getDialogElements();
    switchClassActiveToMain(
        el.pokemonmain,
        el.pokemonStatus,
        el.navButtonMain,
        el.navButtonStats,
        el.pokemonEvolution,
        el.navButtonEvolution);
}

async function openDialogEvolution() {
    let el = getDialogElements();
    switchClassActiveToEvolution(el.pokemonmain, el.pokemonStatus, el.navButtonMain, el.navButtonStats, el.pokemonEvolution, el.navButtonEvolution);
    let evolution = await fetch(allPokemon[currentPokemonIndex].species.url);
    let evolutionToJson = await evolution.json();
    let evolutionChain = await fetch(evolutionToJson.evolution_chain.url);
    let evolutionChainToJson = await evolutionChain.json();
    let chain = evolutionChainToJson.chain;
    let chainPokemons = [];
    let current = chain;

    while (current) {
        chainPokemons.push(current.species.name)
        if (current.evolves_to.length > 0) {
            current = current.evolves_to[0];
        } else {
            current = null;
        }
    }

    document.getElementById('pokemon-evolution').innerHTML =
        chainPokemons.map(name => `<h2>${name}</h2>`).join("");
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

async function loadMorePokemon() {
    if (isLoading) return;
    isLoading = true;

    offset += 20;
   await loadPokemon();

   isLoading = false;
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

function showLoadingSpinner() {
    document.getElementById('loading-spinner').style.display = "flex";
}

function hideLoadingSpinner() {
    document.getElementById('loading-spinner').style.display = "none";
}



