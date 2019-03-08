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
  POKEDEX_BUTTON: '#pokedex',
  CAROUSEL_CONTROLER_LEFT: '#controler_left',
  CAROUSEL_CONTROLER_RIGHT: '#controler_right'
}

const ScreenElements = {
  POKEDEX_DEVICE: '#pokedex_device',
  POKEDEX_CAROUSEL: '#pokedex_carousel',
  POKEDEX_NO_POKEMONS: '#pokedex_no_pokemons',
  POKEDEX_CONTROLER: '#pokedex_controler'
}

const pokemonListString = "[{\"name\":\"weepinbell\",\"abilities\":[{\"ability\":{\"name\":\"gluttony\",\"url\":\"https://pokeapi.co/api/v2/ability/82/\"},\"is_hidden\":true,\"slot\":3},{\"ability\":{\"name\":\"chlorophyll\",\"url\":\"https://pokeapi.co/api/v2/ability/34/\"},\"is_hidden\":false,\"slot\":1}],\"hp\":65,\"speed\":55,\"defense\":50,\"attack\":90,\"front_sprite\":\"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/70.png\",\"back_sprite\":\"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/70.png\",\"type\":\"grass\"},{\"name\":\"luvdisc\",\"abilities\":[{\"ability\":{\"name\":\"hydration\",\"url\":\"https://pokeapi.co/api/v2/ability/93/\"},\"is_hidden\":true,\"slot\":3},{\"ability\":{\"name\":\"swift-swim\",\"url\":\"https://pokeapi.co/api/v2/ability/33/\"},\"is_hidden\":false,\"slot\":1}],\"hp\":43,\"speed\":97,\"defense\":55,\"attack\":30,\"front_sprite\":\"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/370.png\",\"back_sprite\":\"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/370.png\",\"type\":\"grass\"},{\"name\":\"stoutland\",\"abilities\":[{\"ability\":{\"name\":\"scrappy\",\"url\":\"https://pokeapi.co/api/v2/ability/113/\"},\"is_hidden\":true,\"slot\":3},{\"ability\":{\"name\":\"sand-rush\",\"url\":\"https://pokeapi.co/api/v2/ability/146/\"},\"is_hidden\":false,\"slot\":2},{\"ability\":{\"name\":\"intimidate\",\"url\":\"https://pokeapi.co/api/v2/ability/22/\"},\"is_hidden\":false,\"slot\":1}],\"hp\":85,\"speed\":80,\"defense\":90,\"attack\":110,\"front_sprite\":\"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/508.png\",\"back_sprite\":\"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/508.png\",\"type\":\"grass\"},{\"name\":\"ambipom\",\"abilities\":[{\"ability\":{\"name\":\"skill-link\",\"url\":\"https://pokeapi.co/api/v2/ability/92/\"},\"is_hidden\":true,\"slot\":3},{\"ability\":{\"name\":\"pickup\",\"url\":\"https://pokeapi.co/api/v2/ability/53/\"},\"is_hidden\":false,\"slot\":2},{\"ability\":{\"name\":\"technician\",\"url\":\"https://pokeapi.co/api/v2/ability/101/\"},\"is_hidden\":false,\"slot\":1}],\"hp\":75,\"speed\":115,\"defense\":66,\"attack\":100,\"front_sprite\":\"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/424.png\",\"back_sprite\":\"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/424.png\",\"type\":\"grass\"},{\"name\":\"ferroseed\",\"abilities\":[{\"ability\":{\"name\":\"iron-barbs\",\"url\":\"https://pokeapi.co/api/v2/ability/160/\"},\"is_hidden\":false,\"slot\":1}],\"hp\":44,\"speed\":10,\"defense\":91,\"attack\":50,\"front_sprite\":\"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/597.png\",\"back_sprite\":\"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/597.png\",\"type\":\"grass\"},{\"name\":\"manectric\",\"abilities\":[{\"ability\":{\"name\":\"minus\",\"url\":\"https://pokeapi.co/api/v2/ability/58/\"},\"is_hidden\":true,\"slot\":3},{\"ability\":{\"name\":\"lightning-rod\",\"url\":\"https://pokeapi.co/api/v2/ability/31/\"},\"is_hidden\":false,\"slot\":2},{\"ability\":{\"name\":\"static\",\"url\":\"https://pokeapi.co/api/v2/ability/9/\"},\"is_hidden\":false,\"slot\":1}],\"hp\":70,\"speed\":105,\"defense\":60,\"attack\":75,\"front_sprite\":\"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/310.png\",\"back_sprite\":\"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/310.png\",\"type\":\"grass\"},{\"name\":\"murkrow\",\"abilities\":[{\"ability\":{\"name\":\"prankster\",\"url\":\"https://pokeapi.co/api/v2/ability/158/\"},\"is_hidden\":true,\"slot\":3},{\"ability\":{\"name\":\"super-luck\",\"url\":\"https://pokeapi.co/api/v2/ability/105/\"},\"is_hidden\":false,\"slot\":2},{\"ability\":{\"name\":\"insomnia\",\"url\":\"https://pokeapi.co/api/v2/ability/15/\"},\"is_hidden\":false,\"slot\":1}],\"hp\":60,\"speed\":91,\"defense\":42,\"attack\":85,\"front_sprite\":\"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/198.png\",\"back_sprite\":\"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/198.png\",\"type\":\"grass\"},{\"name\":\"minccino\",\"abilities\":[{\"ability\":{\"name\":\"skill-link\",\"url\":\"https://pokeapi.co/api/v2/ability/92/\"},\"is_hidden\":true,\"slot\":3},{\"ability\":{\"name\":\"technician\",\"url\":\"https://pokeapi.co/api/v2/ability/101/\"},\"is_hidden\":false,\"slot\":2},{\"ability\":{\"name\":\"cute-charm\",\"url\":\"https://pokeapi.co/api/v2/ability/56/\"},\"is_hidden\":false,\"slot\":1}],\"hp\":55,\"speed\":75,\"defense\":40,\"attack\":50,\"front_sprite\":\"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/572.png\",\"back_sprite\":\"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/572.png\",\"type\":\"grass\"},{\"name\":\"kricketune\",\"abilities\":[{\"ability\":{\"name\":\"technician\",\"url\":\"https://pokeapi.co/api/v2/ability/101/\"},\"is_hidden\":true,\"slot\":3},{\"ability\":{\"name\":\"swarm\",\"url\":\"https://pokeapi.co/api/v2/ability/68/\"},\"is_hidden\":false,\"slot\":1}],\"hp\":77,\"speed\":65,\"defense\":51,\"attack\":85,\"front_sprite\":\"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/402.png\",\"back_sprite\":\"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/402.png\",\"type\":\"grass\"},{\"name\":\"cubone\",\"abilities\":[{\"ability\":{\"name\":\"battle-armor\",\"url\":\"https://pokeapi.co/api/v2/ability/4/\"},\"is_hidden\":true,\"slot\":3},{\"ability\":{\"name\":\"lightning-rod\",\"url\":\"https://pokeapi.co/api/v2/ability/31/\"},\"is_hidden\":false,\"slot\":2},{\"ability\":{\"name\":\"rock-head\",\"url\":\"https://pokeapi.co/api/v2/ability/69/\"},\"is_hidden\":false,\"slot\":1}],\"hp\":50,\"speed\":35,\"defense\":95,\"attack\":50,\"front_sprite\":\"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/104.png\",\"back_sprite\":\"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/104.png\",\"type\":\"grass\"}]";
let pokemonList = [];//JSON.parse(pokemonListString);
const MIN_CAROUSEL_CURSOR = 0;

let currentPokemon = {};
let currentPokedexState = PokedexState.CLOSED;
let carouselCursor = 0;
    
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
  $( EventEmiter.SKIP_BUTTON ).click( () => skipPokemon());

  $( EventEmiter.ANSWER_BUTTON ).click( () => {
    const answer = $(EventEmiter.ANSWER_INPUT).val();
    const answerIsValid = validateAnswer(answer);
    if(answerIsValid) {
      pokemonList.push(currentPokemon);
      invalidateCarsousel();
      if(pokemonList.length === 1) {
        hideCarousel();
        showCarousel();
      }
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

  $(EventEmiter.CAROUSEL_CONTROLER_LEFT).click( () => {
    if(currentPokedexState === PokedexState.OPENNED) {
      carouselGoLeft();
    }
  })

  $(EventEmiter.CAROUSEL_CONTROLER_RIGHT).click( () => {
    if(currentPokedexState === PokedexState.OPENNED) {
      carouselGoRight();
    }
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
  const pokedex_device = $(ScreenElements.POKEDEX_DEVICE);
  pokedex_device.removeClass('pokedex__device--closed');
  pokedex_device.addClass('pokedex__device--openned');
}

function closePokedex() {
  const pokedex_device = $(ScreenElements.POKEDEX_DEVICE);
  pokedex_device.removeClass('pokedex__device--openned');
  pokedex_device.addClass('pokedex__device--closed');
}

function carouselGoLeft() {
  const carousel = $( '.carousel-box' );
  if(carouselCursor < maxCarouselCursor()) {
    for (let i=0; i<carousel.length; i++) {
      const currentBoxDiv = carousel.get(i);
      const currentBoxObj = $(currentBoxDiv);
      currentBoxObj.on("animationend", () => {
        const nextImgIndex = carouselCursor + i - 1;
        if(nextImgIndex > 0 && nextImgIndex < pokemonList.length) {
          const pokemonImg = $(currentBoxDiv.children[0]);
          pokemonImg.attr("src", pokemonList[nextImgIndex].front_sprite);
        }
        currentBoxObj.removeClass('swap-left');
      });
      currentBoxObj.addClass('swap-left');
    }
    carouselCursor++;
  }
}

function carouselGoRight() {
  const carousel = $( '.carousel-box' );
  if(carouselCursor > MIN_CAROUSEL_CURSOR) {
    for (let i=0; i<carousel.length; i++) {
      const currentBoxDiv = carousel.get(i);
      const currentBoxObj = $(currentBoxDiv);
      currentBoxObj.on("animationend", () => {
        const previousImgIndex = carouselCursor + i - 1;
        if(previousImgIndex >= 0 && previousImgIndex < pokemonList.length) {
          const pokemonImg = $(currentBoxDiv.children[0]);
          pokemonImg.attr("src", pokemonList[previousImgIndex].front_sprite);
        }
        currentBoxObj.removeClass('swap-right');
      });
      currentBoxObj.addClass('swap-right');
    }
    carouselCursor--;
  }
}

function maxCarouselCursor() {
  
  let max = 0;
  const CAROUSEL_OUT_BOX = 2; //left and right
  
  if (pokemonList) {
    const carousel = $( '.carousel-box' );
    const validBoxes = carousel.length - CAROUSEL_OUT_BOX; 
    max = pokemonList.length - validBoxes;
  }

  return max >= 0 ? max : 0;
}

function showCarousel() {
  if(hasPokemons()) {
    showCarouselSlider();
    showCarouselControler();
  }
  else {
    showNoPokemons();
  }
}

function showCarouselSlider() {
  const pokedex_carousel = $(ScreenElements.POKEDEX_CAROUSEL);
  pokedex_carousel.removeClass('u_hide');
  pokedex_carousel.removeClass('end-carousel');
  pokedex_carousel.addClass('start-carousel');
}

function showCarouselControler() {
  const pokedex_controler = $(ScreenElements.POKEDEX_CONTROLER);
  pokedex_controler.removeClass('u_hide');
  pokedex_controler.removeClass('end-carousel');
  pokedex_controler.addClass('start-carousel');
}

function showNoPokemons() {
  const pokedex_no_pokemons = $(ScreenElements.POKEDEX_NO_POKEMONS);
  pokedex_no_pokemons.removeClass('u_hide');
  pokedex_no_pokemons.addClass('u_show');
}

function hideCarousel() {
  hideCarouselSlider();
  hideCarouselControler();
  hideNoPokemons();  
}

function hideCarouselSlider() {
  const pokedex_carousel = $(ScreenElements.POKEDEX_CAROUSEL);
  pokedex_carousel.removeClass('start-carousel');
  pokedex_carousel.addClass('end-carousel');
}

function hideCarouselControler() {
  const pokedex_controler = $(ScreenElements.POKEDEX_CONTROLER);
  pokedex_controler.removeClass('start-carousel');
  pokedex_controler.addClass('end-carousel');
}

function hideNoPokemons() {
  const pokedex_no_pokemons = $(ScreenElements.POKEDEX_NO_POKEMONS);
  pokedex_no_pokemons.removeClass('u_show');
  pokedex_no_pokemons.addClass('u_hide');
}

function hasPokemons() {
  return pokemonList && pokemonList.length > 0;
}

function cleanInput() {
  const answerInput = $(EventEmiter.ANSWER_INPUT);
  answerInput.val("");
}

function invalidateCarsousel() {
  if(hasPokemons) {
    const carousel = $( '.carousel-box' );
    for (let i=0; i<carousel.length; i++) {
      const currentBoxDiv = carousel.get(i);
      const pokemonImg = $(currentBoxDiv.children[0]);
      const imgIndex = carouselCursor + i - 1;
      if(imgIndex >= 0 && imgIndex < pokemonList.length) {
        const sprite = pokemonList[imgIndex].front_sprite;
        pokemonImg.attr("src", sprite);
      }
    }
  }
}

function init() {
  getPokemon(getRandomPokemonId(), (pokemon) => {
    currentPokemon = pokemon;
    console.log(currentPokemon);
    setHandlers();
    setQuizPokemon(pokemon.back_sprite);
    invalidateCarsousel();
  })
}

window.onload = init();