const statNombreDeCoups = document.querySelector('#stat_nombre_de_coups');
const statNombreDeVictoires = document.querySelector('#stat_nombre_de_victoires');
const rejouer = document.querySelector('#rejouer');
const boxes = document.querySelectorAll('.box');
const pokemonsCaptures = document.querySelector('.liste_pokemons_captures');

const listePokemon = ['pikachu','tiplouf','singicram','roselia','tiplouf','boustiflor','pikachu','roselia','tournevol','boustiflor','singicram','tournevol']
const listePokemonsTrouves = [false, false, false, false, false, false, false, false, false, false, false, false];
const listePokemonsRetournes = [];

function buissonClique(indiceBox, listePokemonsTrouves) {
    if (!listePokemonsTrouves[indiceBox] && listePokemonsRetournes.length < 2) {
        retournerBuisson(indiceBox);
        afficherPokemon(indiceBox);
        listePokemonsTrouves[indiceBox] = true;
        listePokemonsRetournes.push([indiceBox,listePokemon[indiceBox]]);
        if (listePokemonsRetournes.length == 2) {
            if (listePokemonsRetournes[0][1] == listePokemonsRetournes[1][1]) {
                setTimeout(() => {
                    //cacherPokemon(listePokemonsRetournes[0][0]);
                    //cacherPokemon(listePokemonsRetournes[1][0]);
                    ajouterPokeball(listePokemonsRetournes[0][0]);
                    ajouterPokeball(listePokemonsRetournes[1][0]);
                    //capturerPokemon(listePokemonsRetournes[0][1]);
                    listePokemonsRetournes.pop();
                    listePokemonsRetournes.pop();
                }, 2000);
            } else {
                setTimeout(() => {
                    //cacherPokemon(listePokemonsRetournes[0][0]);
                    //cacherPokemon(listePokemonsRetournes[1][0]);
                    retournerBuisson(listePokemonsRetournes[0][0]);
                    retournerBuisson(listePokemonsRetournes[1][0]);
                    listePokemonsTrouves[listePokemonsRetournes[0][0]] = false;
                    listePokemonsTrouves[listePokemonsRetournes[1][0]] = false;
                    listePokemonsRetournes.pop();
                    listePokemonsRetournes.pop();
                }, 2000);
            }
        }
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
});