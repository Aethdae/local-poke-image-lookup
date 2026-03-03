const form = document.getElementById("pokeForm");

let pokeApiData;

(async function pokeApi() {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (Boolean(event.target.pokemonInput.value) == true) {
      getPokemon(event.target.pokemonInput.value);
    }
    if (Boolean(event.target.nameInput.value) == true) {
      getPokemon(getPokemonNumberFromString(event.target.nameInput.value));
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
  const link = document.getElementById("link");
  const pokeLink = `https://archives.bulbagarden.net/wiki/File:Menu_SV_${convertNum(pokeNum)}.png`;
  console.log(pokeLink);
  link.href = pokeLink;
  link.textContent = pokeLink;
  return pokeLink;
}
