const pokedex = require('pokeapi-js-wrapper');
const p = new pokedex.Pokedex();

const PokedexState = {
  OPENNED: 'openned',
  CLOSED: 'closed'
}

const PokemonType = {
  GRASS: 'grass',
  FIRE: 'fire',
  WATER: 'water',
  LIGHTING: 'lightning',
  PSYCHIC: 'psychic',
  FAIRY: 'fairy',
  FITHER: 'fighter',
  METAL: 'metal',
  DRAGON: 'dragon'
}

const EventEmiter = {
  QUIZ_POKEMON: '#quiz_pokemon',
  QUIZ_TIPS: '#quiz_tips',
  SKIP_BUTTON: '#skip_button',
  ANSWER_INPUT: '#answer_input',
  ANSWER_BUTTON: '#answer_button',
  POKEDEX_BUTTON: '#pokedex'
}

const ScreenElements = {
  POKEDEX_DEVICE: '#pokedex_device',
  POKEDEX_CAROUSEL: '#pokedex_carousel',
  POKEDEX_NO_POKEMOnS: '#pokedex_no_pokemons'
}
    
class PokemonFactory {
  static createPokemon(pokemonServerObject) {
    const abilities = getAbilities(pokemonServerObject.abilities);
    const hp = getStat(pokemonServerObject.stats, 'hp');
    const speed = getStat(pokemonServerObject.stats, 'speed');
    const defense = getStat(pokemonServerObject.stats, 'defense');
    const attack = getStat(pokemonServerObject.stats, 'attack');
    const front_sprite = getSprite(pokemonServerObject.sprites, 'front_default');
    const back_sprite = getSprite(pokemonServerObject.sprites, 'back_default');
    const type = getType(pokemonServerObject.types);

    function getAbilities(abilities) {
      return abilities;
    }
  
    function getStat(stats, target) {
      let statFound = '';
      if(target && stats && stats.length > 0) {
        stats.forEach(stat => {
          const currentStat = stat.stat;
          if(target && target.localeCompare(currentStat.name) === 0) {
            statFound = stat.base_stat;
          }
        });
      }
      return statFound;
    }
  
    function getSprite(sprites, target) {
      //verify a way of stopping the loop once the target has being found.
      let currentSprite = '';
      Object.entries(sprites).forEach(([key, value]) => {
        if(key === target) {
          currentSprite = value;
        }
      });
      return currentSprite;
    }
  
    function getType(types) {
      return PokemonType.GRASS;
    }

    return new Pokemon(pokemonServerObject.name, 
      abilities,
      hp,
      speed,
      defense,
      attack,
      front_sprite,
      back_sprite,
      type);
  }
}

class Pokemon {  

  constructor(name, abilities, hp, speed, defense, attack, front_sprite, back_sprite, type) {
    this.name = name;
    this.abilities = abilities;
    this.hp = hp;
    this.speed = speed;
    this.defense = defense;
    this.attack = attack;
    this.front_sprite = front_sprite;
    this.back_sprite = back_sprite;
    this.type = type;
  }
  
}

let currentPokemon = {};
let currentPokedexState = PokedexState.CLOSED;
let pokemonList = [{name:'bulbasaur'}];

function getPokemon(name, callback) {
  p.getPokemonByName(name) 
    .then(function(response) {
      const pokemon = PokemonFactory.createPokemon(response);
      if(pokemon && callback) {
        callback(pokemon);
      }
    });
}

function setHandlers() {
  $( EventEmiter.SKIP_BUTTON ).click( () => skipPokemon());

  $( EventEmiter.ANSWER_BUTTON ).click( () => {
    const answer = $(EventEmiter.ANSWER_INPUT).val();
    const answerIsValid = validateAnswer(answer);
    if(answerIsValid) {
      pokemonList.push(currentPokemon);
      updateCarousel();
      currentPokemon = undefined;
      skipPokemon();
    }
  });

  $(EventEmiter.POKEDEX_BUTTON).click( () => {
    currentPokedexState = currentPokedexState === PokedexState.OPENNED 
    ? PokedexState.CLOSED
    : PokedexState.OPENNED;
    setPokedexState(currentPokedexState);
  })
}

function setQuizPokemon(back_sprite) {
  $(EventEmiter.QUIZ_POKEMON).css('background-image', "url("+back_sprite+")");
}

function skipPokemon() {
  getPokemon(getRandomPokemonId(), (pokemon) => {
    currentPokemon = pokemon;
    console.log(currentPokemon);
    setQuizPokemon(pokemon.back_sprite);
    cleanInput();
  })
}

function validateAnswer(answer) {
  console.log(answer);
  console.log(currentPokemon);
  return currentPokemon && answer === currentPokemon.name;
}

function getRandomPokemonId() {
  const min = Math.ceil(1);
  const max = Math.floor(649);
  return Math.floor(Math.random() * (max - min)) + min;
}

function setPokedexState(state) {
  
  if(state === PokedexState.OPENNED) {
    openPokedex();
    showCarousel();
  }
  else {
    hideCarousel();
    closePokedex();
  }
}

function openPokedex() {
  updateCarousel();
  const pokedex_device = $(ScreenElements.POKEDEX_DEVICE);
  pokedex_device.removeClass('pokedex__device--closed');
  pokedex_device.addClass('pokedex__device--openned');
}

function closePokedex() {
  const pokedex_device = $(ScreenElements.POKEDEX_DEVICE);
  pokedex_device.removeClass('pokedex__device--openned');
  pokedex_device.addClass('pokedex__device--closed');
}

function updateCarousel() {
  const pokedex_carousel = $(ScreenElements.POKEDEX_CAROUSEL);
  pokedex_carousel.text("");
  pokemonList.forEach(pokemon => {
    console.log(pokemon.name);
    pokedex_carousel.text(pokedex_carousel.text() + pokemon.name + ", ");
  })
  const lastCommaIndex = pokedex_carousel.text().trim().length - 1;
  pokedex_carousel.text(pokedex_carousel.text().substring(0,lastCommaIndex));
}

function showCarousel() {
  const pokedex_carousel = $(ScreenElements.POKEDEX_CAROUSEL);
  const pokedex_no_pokemons = $(ScreenElements.POKEDEX_NO_POKEMOnS);
  if(hasPokemons()) {
    pokedex_carousel.removeClass('u_hide');
    pokedex_carousel.addClass('u_show');
    pokedex_carousel.removeClass('end-carousel');
    pokedex_carousel.addClass('start-carousel');

    pokedex_no_pokemons.removeClass('u_show');
    pokedex_no_pokemons.addClass('u_hide');
  }
  else {
    pokedex_carousel.removeClass('u_show');
    pokedex_carousel.addClass('u_hide');
    
    pokedex_no_pokemons.removeClass('u_hide');
    pokedex_no_pokemons.addClass('u_show');
  }
}

function hideCarousel() {
  const pokedex_carousel = $(ScreenElements.POKEDEX_CAROUSEL);
  const pokedex_no_pokemons = $(ScreenElements.POKEDEX_NO_POKEMOnS);
  if(hasPokemons()) {
    pokedex_carousel.removeClass('u_hide');
    pokedex_carousel.addClass('u_show');
    pokedex_carousel.removeClass('start-carousel');
    pokedex_carousel.addClass('end-carousel');

    pokedex_no_pokemons.removeClass('u_show');
    pokedex_no_pokemons.addClass('u_hide');
  }
  else {
    pokedex_carousel.removeClass('u_show');
    pokedex_carousel.addClass('u_hide');

    pokedex_no_pokemons.removeClass('u_show');
    pokedex_no_pokemons.addClass('u_hide');
  }
}

function hasPokemons() {
  return pokemonList && pokemonList.length > 0;
}

function cleanInput() {
  const answerInput = $(EventEmiter.ANSWER_INPUT);
  answerInput.val("");
}

function init() {
  getPokemon(getRandomPokemonId(), (pokemon) => {
    currentPokemon = pokemon;
    console.log(currentPokemon);
    setHandlers();
    setQuizPokemon(pokemon.back_sprite);
  })
}

window.onload = init();