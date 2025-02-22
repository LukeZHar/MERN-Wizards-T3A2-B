console.log("Pokemon Journey begins...");

const encounterButton = document.getElementById("pokemonEncounterButton");
const pokemonRenderArea = document.getElementById("encounteredPokemonArea");
const pokemonContainerDiv = document.getElementById("pokemonContainer");

function renderPokemonData(pokemonData){
    if (!pokemonData.name){
        return;
    }
    // This div has class now
    pokemonContainerDiv.classList += "pokemonCardEntry";

    let pokemonImage = document.createElement("img");
    pokemonImage.src = pokemonData.image;
    pokemonContainerDiv.appendChild(pokemonImage);

    let pokemonHeading = document.createElement("h1");
    pokemonHeading.innerText = pokemonData.name;
    pokemonContainerDiv.appendChild(pokemonHeading);

    let pokemonTypesHeading = document.createElement("h3");
    pokemonTypesHeading.innerText = "Types:";
    pokemonContainerDiv.appendChild(pokemonTypesHeading);

    let pokemonTypeList = document.createElement("ul");
    // Loop through the array of pokemonData
    pokemonData.types.forEach((typeObject) => {
        // Create li element for each type
        let pokemonTypeListItem = document.createElement("li");
        // Add name to li
        pokemonTypeListItem.innerText = typeObject.type.name;
        // Append it to the ul
        pokemonTypeList.appendChild(pokemonTypeListItem);
    });
    pokemonContainerDiv.appendChild(pokemonTypeList);

    let pokemonAudioButton = document.createElement("button");
    pokemonAudioButton.innerText = "Play Sound";
    pokemonAudioButton.addEventListener("click", ()=>{
        let pokemonAudioObject = new Audio(pokemonData.sound);
        pokemonAudioObject.play();
    });
    pokemonContainerDiv.appendChild(pokemonAudioButton);

    pokemonRenderArea.appendChild(pokemonContainerDiv);
}

function getRandomPokemonId(){
    // Random number between 1 and 1025 (max number of Pokemon)
    return Math.ceil(Math.random() * 1025);
}

async function getPokemon(){
    console.log("Looking for a wild Pokemon");
    
    let apiResponse = await fetch("https://pokeapi.co/api/v2/pokemon/" + getRandomPokemonId());
    let apiData = await apiResponse.json();

    // Fetch name, type, image, cry
    // let pokemonName = apiData.name;
    return {
        name: apiData.name,
        types: apiData.types,
        image: apiData.sprites.other.home.front_default,
        sound: apiData.cries.latest
    };
}

// encounterButton.addEventListener("click", (event) => getPokemon(event));

// encounterButton.addEventListener("click", getPokemon);

encounterButton.addEventListener("click",async (event) => {
    console.log("Doing something...");

    let pokemonResult = await getPokemon();
    
    console.log(pokemonResult);

    renderPokemonData(pokemonResult);
});