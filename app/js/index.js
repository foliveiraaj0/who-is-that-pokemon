const pokedex = require('pokeapi-js-wrapper');
const p = new pokedex.Pokedex();

let currentPokemon = {};

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

const ScreenElements = {
  QUIZ_POKEMON: '#quiz_pokemon',
  QUIZ_TIPS: '#quiz_tips',
  SKIP_BUTTON: '#skip_button',
  ANSWER_INPUT: '#answer_input',
  ANSWER_BUTTON: '#answer_button'
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
  $( ScreenElements.SKIP_BUTTON ).click( () => skipPokemon());

  $( ScreenElements.ANSWER_BUTTON ).click( () => {
    const answer = $(ScreenElements.ANSWER_INPUT)[0].value;
    validateAnswer(answer);
  });
}

function setQuizPokemon(back_sprite) {
  $(ScreenElements.QUIZ_POKEMON).css('background-image', "url("+back_sprite+")");
}

function skipPokemon() {
  getPokemon(getRandomPokemonId(), (pokemon) => {
    console.log(pokemon);
    setQuizPokemon(pokemon.back_sprite);
  })
}

function validateAnswer(answer) {
  console.log(answer);
}

function getRandomPokemonId() {
  const min = Math.ceil(1);
  const max = Math.floor(649);
  return Math.floor(Math.random() * (max - min)) + min;
}

window.onload = init();

function init() {
  getPokemon(getRandomPokemonId(), (pokemon) => {
    setHandlers();
    setQuizPokemon(pokemon.back_sprite);
  })
  


}


