const stat_nombre_de_coups = document.querySelector('#stat_nombre_de_coups');
const stat_nombre_de_victoires = document.querySelector('#stat_nombre_de_victoires');
const rejouer = document.querySelector('#rejouer');
const boxes = document.querySelectorAll('.box');
const pokemons_captures = document.querySelector('.liste_pokemons_captures');

const listePokemonsTrouves = [false, false, false, false, false, false, false, false, false, false, false, false];

function buissonClique(indiceBox, listePokemonsTrouves) {
    if (!listePokemonsTrouves[indiceBuisson]) {
        retournerBuisson(indiceBox);
    }
}

function retournerBuisson(indiceBox) {
    boxes[indiceBox].querySelector('.bush').style.display = 'none';
}

function ajouterPokeball(indiceBox) {
    boxes[indiceBox].querySelector('.pokeball').style.display = 'block';
}