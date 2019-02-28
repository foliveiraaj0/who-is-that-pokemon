const pokedex = require('pokeapi-js-wrapper');
const p = new pokedex.Pokedex();

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

    
class PokemonFactory {
  static createPokemon(pokemonServerObject) {
    const abilities = getAbilities(pokemonServerObject.abilities);
    const hp = getStat(pokemonServerObject.stats, 'hp');
    const speed = getStat(pokemonServerObject.stats, 'speed');
    const defense = getStat(pokemonServerObject.stats, 'defense');
    const attack = getStat(pokemonServerObject.stats, 'attack');
    const front_sprite = getSprite(pokemonServerObject.sprites, 'front');
    const back_sprite = getSprite(pokemonServerObject.sprites, 'back');
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
      return 'fake-sprite';
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
      console.log(response);
      if(pokemon && callback) {
        callback(pokemon);
      }
    });
}

getPokemon('bulbasaur', (pokemon) => {
  console.log(pokemon.attack);
})