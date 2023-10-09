const tablaTipos = document.querySelector(".header-div2");

const obtenerPokemons = async () => {
  const pokemons = [];
  for (let i = 1; i <= 151; i++) {
    const pokemonUrls = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    const pokemonsObjetos = await pokemonUrls.json();
    pokemons.push(pokemonsObjetos);
  }
  return pokemons;
};

const pokemonsPreparados = (pokemons) => {
  return pokemons.map((pokemonDato) => ({
    nombre: pokemonDato.name,
    img: pokemonDato.sprites.versions["generation-v"]["black-white"].animated
      .front_default,
    id: pokemonDato.id,
    tipo: pokemonDato.types[0].type.name,
    imgEvento: pokemonDato.sprites.other["official-artwork"].front_default,
    altura: pokemonDato.height,
    peso: pokemonDato.weight,
    HP: pokemonDato.stats[0].base_stat,
    ATQ: pokemonDato.stats[1].base_stat,
    DEF: pokemonDato.stats[2].base_stat,
    VEL: pokemonDato.stats[3].base_stat,
  }));
};

const pintarPokemons = (pokemons) => {
  const espacioPokemons = document.querySelector(
    "[data-function='div-pokemon']"
  );
  espacioPokemons.innerHTML = "";
  for (const pokemon of pokemons) {
    const divPokemon = document.createElement("div");
    divPokemon.setAttribute("class", "main-div2-pokemonDiv");
    divPokemon.setAttribute("id", `pokemon-${pokemon.id}`);
    divPokemon.innerHTML = `
              <div class="main-div2-pokemonDiv-div1">
              <img class="main-div2-pokemonDiv-div1-img" src="${pokemon.img}" alt="${pokemon.nombre}">
              <span class="main-div2-pokemonDiv-div1-span"># ${pokemon.id}</span>
              </div>
              <div class="main-div2-pokemonDiv-div2">
              <span class="main-div2-pokemonDiv-div2-span">${pokemon.nombre}</span>
              <div class="${pokemon.tipo}"></div>
              </div>`;
    espacioPokemons.appendChild(divPokemon);

    divPokemon.addEventListener("click", () => {
      const todasLasImagenes = espacioPokemons.querySelectorAll(
        ".main-div2-pokemonDiv"
      );
      todasLasImagenes.forEach((img) => {
        img.style.display = "none";
      });

      mostrarInformacionPokemon(pokemon);
    });
  }
};

const mostrarInformacionPokemon = (pokemon) => {
  const espacioPokemons = document.querySelector(
    "[data-function='div-pokemon']"
  );

  const pokemonInfoDiv = document.createElement("div");
  espacioPokemons.appendChild(pokemonInfoDiv);
  pokemonInfoDiv.setAttribute("class", "main-div2-pokemonDiv-pokemonInfoDiv");

  const informacionPokemonsImg = document.createElement("div");
  informacionPokemonsImg.setAttribute(
    "class",
    "main-div2-pokemonDiv-pokemonInfoDiv-div-img"
  );

  const imgGrande = document.createElement("img");
  imgGrande.src = pokemon.imgEvento;
  imgGrande.setAttribute(
    "class",
    "main-div2-pokemonDiv-pokemonInfoDiv-div-imgGrande"
  );

  const informacionPokemonsTexto = document.createElement("div");
  informacionPokemonsTexto.setAttribute("class", "main-informacion-div-texto");

  const informacionPokemonsTexto2 = document.createElement("div");
  informacionPokemonsTexto2.setAttribute(
    "class",
    "main-informacion-div-texto2"
  );

  informacionPokemonsTexto.innerHTML = `
  <h2>Nombre: \n${pokemon.nombre}</h2>
  <h2>Tipo: \n${pokemon.tipo}</h2>
  <h3>Altura: ${pokemon.altura * 10} cm.</h3>
  <h3>Peso: ${pokemon.peso / 10} Kg.</h3>
  <h3>HP: ${pokemon.HP}</h3>
  <h3>ATQ: ${pokemon.ATQ}</h3>
  <h3>DEF: ${pokemon.DEF}</h3>
  <h3>VEL: ${pokemon.VEL}</h3>
  `;

  informacionPokemonsImg.appendChild(imgGrande);
  pokemonInfoDiv.appendChild(informacionPokemonsImg);
  pokemonInfoDiv.appendChild(informacionPokemonsTexto);

  pokemonInfoDiv.addEventListener("click", () => {
    espacioPokemons.removeChild(pokemonInfoDiv);

    const todasLasImagenes = espacioPokemons.querySelectorAll(
      ".main-div2-pokemonDiv"
    );

    todasLasImagenes.forEach((img) => {
      img.style.display = "block";
    });
  });
};

const filtro = (pokemons) => {
  const input = document.querySelector("[data-function='filtro$busqueda']");
  const inputValor = input.value.toString();
  input.addEventListener("input", () => buscar(input.value, pokemons));
};

const buscar = (filtro, pokemons) => {
  const pokemonsFiltrados = pokemons.filter((pokemon) =>
    pokemon.nombre.toLowerCase().includes(filtro.toLowerCase())
  );
  pintarPokemons(pokemonsFiltrados);
};

const tipos = [
  "agua",
  "planta",
  "fuego",
  "normal",
  "electrico",
  "hielo",
  "lucha",
  "veneno",
  "tierra",
  "volador",
  "psiquico",
  "bicho",
  "roca",
  "fantasma",
  "siniestro",
  "dragón",
  "hierro",
  "hada",
  "pokedex",
];

const tiposIngles = [
  "water",
  "grass",
  "fire",
  "normal",
  "electric",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dark",
  "dragon",
  "steel",
  "fairy",
  "pokedex",
];

const pintarTipos = (tipos) => {
  for (let i = 0; i < tipos.length; i++) {
    const tipo = tipos[i];

    const divTipos = document.createElement("div");
    divTipos.setAttribute("class", `${tipo}`);

    divTipos.innerHTML = `<img class="header-div2-tipos" src="./assets/${tipo}.png" alt="${tipo}" />`;

    tablaTipos.appendChild(divTipos);
  }
};

const pintarPokemonsTipos = (pokemons) => {
  for (let i = 0; i < tiposIngles.length; i++) {
    const tipo = tiposIngles[i];
    const boton = document.querySelector(`.${tipos[i]}`);
    boton.addEventListener("click", function () {
      if (`${tipo}` != "pokedex") {
        const pokemonsTipo = pokemons.filter(
          (pokemon) => pokemon.tipo == `${tipo}`
        );
        pintarPokemons(pokemonsTipo);
      } else {
        pintarPokemons(pokemons);
      }
    });
  }
};

const init = async () => {
  const pokemonsObtenidos = await obtenerPokemons();
  const pokemonsListos = pokemonsPreparados(pokemonsObtenidos);

  pintarTipos(tipos);

  pintarPokemonsTipos(pokemonsListos);

  pintarPokemons(pokemonsListos);

  filtro(pokemonsListos);
};

init();
