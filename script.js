function requestPokemons(quantidade) {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=" + quantidade)
        .then(result => result.json())
        .then(pokemons => {
            let allPokemons = pokemons.results
            
            let pokemonDiv = document.getElementById('pokemonDiv');

            Array.from(allPokemons).forEach(pokemon => {
                let url = pokemon.url;
                pokemonDiv.innerHTML = ""

                fetch(url).then(result => result.json()).then(urlsContent => {

                    let altura = urlsContent.height; 
                    let peso = urlsContent.weight; 
                    let nome = urlsContent.name;
                    let nomeLetraMaiuscula = nome.charAt(0).toUpperCase() + nome.slice(1)
                    let frontSprite = urlsContent.sprites.front_default;
                    let abilities = urlsContent.abilities;
                    let abilitiesLength = abilities.length
                    let abilitiesOneName = abilities[0].ability.name;
                    let abilitiesTwoName = abilities[1].ability.name;

                    let abilitesOneUpper = abilitiesOneName.charAt(0).toUpperCase() + abilitiesOneName.slice(1)
                    let abilitesTwoUpper = abilitiesTwoName.charAt(0).toUpperCase() + abilitiesTwoName.slice(1)

                    let newPokemon = document.createElement('div');
                    newPokemon.classList.add('pokemonBox');

                    newPokemon.innerHTML = 
                    `
                        <img src="${frontSprite}" alt="Imagem ${nomeLetraMaiuscula}">
                        <p class="nomePokemon">${nomeLetraMaiuscula}</p>
                        <p class="statsPokemon">${altura}dm, ${peso}hg, <a class="verHabilidades">${abilitiesLength} habilidades</a></p>
                    `

                    let newOl = document.createElement('ol');
                    newOl.classList.add('habilidadesCampo');

                    if (abilitiesLength == 2) {
                        newOl.innerHTML = 
                        `
                            <li>${abilitesOneUpper}</li>
                            <li>${abilitesTwoUpper}</li>
                        `
                    } else {
                        let abilitiesThreeName = abilities[2].ability.name;
                        let abilitesThreeUpper = abilitiesOneName.charAt(2).toUpperCase() + abilitiesOneName.slice(2)

                        newOl.innerHTML = 
                        `
                            <li>${abilitesOneUpper}</li>
                            <li>${abilitesTwoUpper}</li>
                            <li>${abilitesThreeUpper}</li>
                        `
                    }

                    newPokemon.appendChild(newOl)

                    let habilidadesCampo = newPokemon.querySelector('.habilidadesCampo');
                    let verHabilidades = newPokemon.querySelector('.verHabilidades')
                    verHabilidades.addEventListener('click', () => {
                        habilidadesCampo.classList.toggle("aberto")
                    })

                    pokemonDiv.appendChild(newPokemon);
                });

            })
        })
}

function eventoInput() {
    let input = document.getElementById('quantidadePokemons');

    input.addEventListener('keyup', () => {
        requestPokemons(input.value)
    })
}

document.addEventListener('DOMContentLoaded', () => {
    requestPokemons(30);
    eventoInput();
});