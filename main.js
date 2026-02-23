const stat_nombre_de_coups = document.querySelector('#stat_nombre_de_coups');
const stat_nombre_de_victoires = document.querySelector('#stat_nombre_de_victoires');
const rejouer = document.querySelector('#rejouer');
const boxes = document.querySelectorAll('.box');
const pokemons_captures = document.querySelector('.liste_pokemons_captures');

const listePokemon = ['pikachu','tiplouf','singicram','roselia','tiplouf','boustiflor','pikachu','roselia','tournevol','boustiflor','singicram','tournevol']
const listePokemonsTrouves = [false, false, false, false, false, false, false, false, false, false, false, false];

function buissonClique(indiceBox, listePokemonsTrouves) {
    if (!listePokemonsTrouves[indiceBox]) {
        retournerBuisson(indiceBox);
        afficherPokemon(indiceBox);
    }
}

function retournerBuisson(indiceBox) {
    boxes[indiceBox].querySelector('.bush').style.display = 'none';
}

function ajouterPokeball(indiceBox) {
    boxes[indiceBox].querySelector('.pokeball').style.display = 'block';
}

function afficherPokemon(indiceBox) {
    const pokemon = document.createElement("div");
    pokemon.textContent = listePokemon[indiceBox];
    boxes[indiceBox].appendChild(pokemon);
}

boxes.forEach((box,i) => {
    box.addEventListener("click", function() {buissonClique(i,listePokemonsTrouves)});
})