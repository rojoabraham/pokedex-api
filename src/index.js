let listContainer = document.querySelector('.list')
let pokemonName = document.getElementById("pokemon-name")
let pokemonImage = document.getElementById("pokemon-image")
let pokemonAbilities = document.getElementById("pokemon-abilities")
let pokemonMovesList = document.getElementById("pokemon-moves-list")
let pokemonWeight = document.getElementById("pokemon-weight")
let pokemonHeight = document.getElementById("pokemon-height")
let pokemonTypes = document.getElementById("pokemon-types")
let infoContainer = document.getElementById("info-container")
let activeData = ''
let selectedPokemon = ''
infoContainer.style.display = "none";



document.addEventListener('DOMContentLoaded', function() {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=1017')
        .then(response => response.json())
        .then(data => {
            activeData = data
            popularListaPokemon(data.results)
        })
})

function popularListaPokemon(pokemonObj) {
    pokemonObj.forEach(pokemon => {
        let li = document.createElement('li');
        let pokemonNum = pokemon.url.replace("https://pokeapi.co/api/v2/pokemon/", "")
        pokemonNum = pokemonNum.replace("/","")
        pokemonNameCap = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
        let pokemonName = document.createTextNode(`${pokemonNum.padStart(4,'0')} - ${pokemonNameCap}`);
        li.setAttribute("id",`${pokemonNum}`);
        li.addEventListener("click", function(){
            li.classList.add("selected")
            selectPokemon(pokemonNum)
        })
        li.appendChild(pokemonName);
        listContainer.appendChild(li)
    });
}

function selectPokemon(pokemonId){
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then(response => response.json())
    .then(data => {
        pokemonData(data)
    })
    if(selectedPokemon != ""){
        deselectPokemon(selectedPokemon)
    }
    selectedPokemon = pokemonId
}

function deselectPokemon(pokemonId) {
    let li = document.getElementById(pokemonId)
    li.removeAttribute("class")
}

function pokemonData(pokemon){
    console.log(pokemon)
    //Reset stats
    pokemonMovesList.innerHTML=""
    pokemonAbilities.textContent = ""
    pokemonWeight.textContent = ""
    pokemonHeight.textContent = ""
    pokemonTypes.textContent = ""
    infoContainer.style.display = "inherit"
    let pokemonId = pokemon.id.toString()

    //Name and Image
    pokemonImage.src = pokemon.sprites.front_default
    pokemonNameCap = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    pokemonName.textContent = pokemonId.padStart(4,'0') + " - " + pokemonNameCap

    //Abilities
    pokemon.abilities.forEach(ability =>{
        pokemonAbilities.textContent = pokemonAbilities.textContent + " / " + ability.ability.name
    })
    pokemonAbilities.textContent = pokemonAbilities.textContent.replace('/','',1)

    // Stats
    pokemonWeight.textContent = pokemonWeight.textContent + " " + pokemon.weight
    pokemonHeight.textContent = pokemonHeight.textContent + " " + pokemon.height

    //Types
    pokemon.types.forEach(type =>{
        pokemonTypes.textContent = pokemonTypes.textContent + " / " + type.type.name
    })
    pokemonTypes.textContent = pokemonTypes.textContent.replace('/','',1)


    // Moves
    pokemon.moves.forEach(move => {
        let li = document.createElement('li');
        let pokemonMove = document.createTextNode(`${move.move.name}`);
        li.appendChild(pokemonMove)
        pokemonMovesList.appendChild(li)

    })
}


