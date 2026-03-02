const statNombreDeCoups = document.querySelector('#stat_nombre_de_coups');
const statNombreDeVictoires = document.querySelector('#stat_nombre_de_victoires');
const rejouer = document.querySelector('#rejouer');
const boxes = document.querySelectorAll('.box');
const pokemonsCaptures = document.querySelector('.liste_pokemons_captures');
const boiteDeDialogue = document.createElement("dialog");
const partieGagnee = document.createElement("h2");
partieGagnee.textContent = "Partie gagnée!";
const score = document.createElement("p");
const boutonRejouer = document.createElement("button");
boutonRejouer.textContent = "Rejouer";
boiteDeDialogue.appendChild(partieGagnee);
boiteDeDialogue.appendChild(score);
boiteDeDialogue.appendChild(boutonRejouer);
document.querySelector("body").appendChild(boiteDeDialogue);

let listePokemon = [];
let listePokemonsChoisis = [];
let listePokemonsUtilises = [];
fetch("/data/pokemon.json")
.then((response) => response.json())
.then((data) => {
    listePokemon = data;
    listePokemonsChoisis = genererPokemonsAleatoires(nombrePairePokemon,listePokemon);
    listePokemonsUtilises = genererEmplacementsAleatoires(listePokemonsChoisis);
})
const listePokemonsTrouves = [false, false, false, false, false, false, false, false, false, false, false, false];
const listePokemonsRetournes = [];
const nombrePairePokemon = 6;

function genererPokemonsAleatoires(nombrePairePokemon,listePokemon) {
    const indicesChoisis = new Set;
    while (indicesChoisis.size < nombrePairePokemon) {
        indicesChoisis.add(Math.floor(Math.random()*(listePokemon.length-1)));
    }
    const result = [...indicesChoisis].map(ind => listePokemon[ind]);
    return result;
}

function genererEmplacementsAleatoires(listePokemonsChoisis) {
    const listePokemonsChoisisPaire = [];
    listePokemonsChoisis.forEach((pokemon) => {
        listePokemonsChoisisPaire.push(pokemon,pokemon);
    });
    const listePokemonsUtilises = [];
    while (listePokemonsChoisisPaire.length > 0) {
        const indice = Math.floor(Math.random()*listePokemonsChoisisPaire.length);
        listePokemonsUtilises.push(listePokemonsChoisisPaire[indice]);
        listePokemonsChoisisPaire.splice(indice,1);
    }
    return listePokemonsUtilises;
}

function buissonClique(indiceBox, listePokemonsTrouves) {
    if (!listePokemonsTrouves[indiceBox] && listePokemonsRetournes.length < 2) {
        retournerBuisson(indiceBox);
        afficherPokemon(indiceBox);
        listePokemonsTrouves[indiceBox] = true;
        listePokemonsRetournes.push([indiceBox,listePokemonsUtilises[indiceBox].name]);
        if (listePokemonsRetournes.length == 2) {
            statNombreDeCoups.textContent = parseInt(statNombreDeCoups.textContent) + 1;
            if (listePokemonsRetournes[0][1] == listePokemonsRetournes[1][1]) {
                setTimeout(() => {
                    cacherPokemon(listePokemonsRetournes[0][0]);
                    cacherPokemon(listePokemonsRetournes[1][0]);
                    ajouterPokeball(listePokemonsRetournes[0][0]);
                    ajouterPokeball(listePokemonsRetournes[1][0]);
                    capturerPokemon(listePokemonsRetournes[0][1]);
                    listePokemonsRetournes.pop();
                    listePokemonsRetournes.pop();
                    if (pokemonsCaptures.childElementCount == nombrePairePokemon) {
                        lancerFinDuJeu();
                    }
                }, 1000);
            } else {
                setTimeout(() => {
                    cacherPokemon(listePokemonsRetournes[0][0]);
                    cacherPokemon(listePokemonsRetournes[1][0]);
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
    if (boxes[indiceBox].querySelector('.bush').style.display == 'none') {
        boxes[indiceBox].querySelector('.bush').style.display = 'block';
    } else {
        boxes[indiceBox].querySelector('.bush').style.display = 'none';
    }
}

function ajouterPokeball(indiceBox) {
    if (boxes[indiceBox].querySelector('.pokeball').style.display == 'block') {
        boxes[indiceBox].querySelector('.pokeball').style.display = 'none';
    } else {
        boxes[indiceBox].querySelector('.pokeball').style.display = 'block';
    }
}

function afficherPokemon(indiceBox) {
    const pokemon = document.createElement("img");
    pokemon.setAttribute("src",listePokemonsUtilises[indiceBox].sprite);
    boxes[indiceBox].appendChild(pokemon);
}

function cacherPokemon(indiceBox) {
    boxes[indiceBox].removeChild(boxes[indiceBox].lastChild);
}

function capturerPokemon(pokemon) {
    const divPokemon = document.createElement("div");
    divPokemon.textContent = pokemon;
    pokemonsCaptures.appendChild(divPokemon);
}

function lancerFinDuJeu() {
    const score = boiteDeDialogue.querySelector("p");
    score.textContent = "Score: " + statNombreDeCoups.textContent;
    statNombreDeVictoires.textContent = parseInt(statNombreDeVictoires.textContent) + 1;
    boiteDeDialogue.showModal();
}

function reinitialiserJeu() {
    boiteDeDialogue.close();
    for (let i=0; i<nombrePairePokemon*2;i++) {
        ajouterPokeball(i);
        retournerBuisson(i);
        listePokemonsTrouves[i] = false;
    }
    while (pokemonsCaptures.hasChildNodes()) {
        pokemonsCaptures.removeChild(pokemonsCaptures.firstChild);
    }
    statNombreDeCoups.textContent = 0;
}

boxes.forEach((box,i) => {
    box.addEventListener("click", function() {buissonClique(i,listePokemonsTrouves)});
});

boiteDeDialogue.querySelector('button').addEventListener('click', reinitialiserJeu);
rejouer.addEventListener('click', reinitialiserJeu);