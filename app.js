const form = document.getElementById("pokeForm");
const link = document.getElementById("link");
const output = document.getElementById("output");

let pokeApiData;

(async function pokeApi() {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (Boolean(event.target.pokemonInput.value) == true) {
      getPokemon(event.target.pokemonInput.value);
    }
    if (Boolean(event.target.nameInput.value) == true) {
      getPokemonFromString(event.target.nameInput.value);
    }
  });
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=10000");
    const data = await res.json();
    pokeApiData = data;
    return data;
  } catch (err) {
    console.log(err);
  }
})();

async function getPokemonLinkFromAPI(name) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!res.ok) {
      link.textContent = "Error: not found! Please try again.";
      link.href = null;
      return;
    }
    const pokemon = await res.json();
    console.log(pokemon);
    const { front_default } =
      pokemon.sprites.versions["generation-ix"]["scarlet-violet"];
    return front_default;
  } catch (error) {
    console.error(error);
  }
}
async function getPokemonFromString(name) {
  const pokeFront = await getPokemonLinkFromAPI(name);
  setPokemonLink(pokeFront);
  addImage(pokeFront);
}
function addImage(url) {
  const img = document.createElement("img");
  img.src = url;
  output.appendChild(img);
}
function setPokemonLink(url) {
  link.href = url;
  link.textContent = url;
}

function getPokemonNumberFromString(name) {
  for (let x = 0; x < pokeApiData.count; x++) {
    console.log(pokeApiData["results"][x]);
    if (name.toLowerCase() == pokeApiData.results[x].name) {
      let stringSlash = pokeApiData.results[x].url.slice(34);
      return stringSlash.slice(0, stringSlash.length - 1);
    }
  }
  return "Error";
}

function convertNum(num) {
  let string = String(num);
  while (string.length < 4) {
    string = "0" + string;
  }
  return string;
}

function getPokemon(pokeNum) {
  const pokeLink = `https://archives.bulbagarden.net/wiki/File:Menu_SV_${convertNum(pokeNum)}.png`;
  console.log(pokeLink);
  link.href = pokeLink;
  link.textContent = pokeLink;
  return pokeLink;
}
