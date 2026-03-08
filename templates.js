function getPokemonTemplate(responseToJson) {
    return `
    <div>
        <h2>${responseToJson.name}</h2>
    </div>
    `
}