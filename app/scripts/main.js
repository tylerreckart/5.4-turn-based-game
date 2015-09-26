// player
var trainedBlastoise = new Trained('Blastoise', 100, 50, 10, 'images/characters-back/blastoise.png');
var trainedCharizard = new Trained('Charizard', 100, 50, 20, 'images/characters-back/charizard.png');
var trainedPikachu = new Trained('Pikachu', 100, 40, 30, 'images/characters-back/pikachu.png');
var trainedVenusaur = new Trained('Venusaur', 120, 40, 10, 'images/characters-back/venusaur.png');

// enemy
var blastoise = new Pokemon('Blastoise', 100, 50, 10, 'images/characters-front/blastoise.png');
var pikachu = new Pokemon('Pikachu', 100, 40, 30, 'images/characters-front/pikachu.png');
var charizard = new Pokemon('Charizard', 100, 50, 20, 'images/characters-front/charizard.png');
var alakazam = new Pokemon('Alakazam', 100, 65, 10, 'images/characters-front/alakazam.png');
var poliwhirl = new Pokemon('Poliwhirl', 100, 40, 35, 'images/characters-front/poliwhirl.png');
var mewtwo = new Pokemon('Mewtwo', 100, 80, 25,'images/characters-front/mewtwo.png');

var trainedArray = [trainedBlastoise, trainedPikachu, trainedCharizard, trainedVenusaur];

var pokemonArray = [blastoise, pikachu, charizard, alakazam, poliwhirl];

// random damage calculation based on maxRoll and minRoll values
var attack = function(maximumRoll, minimumRoll) {
  return Math.floor(Math.random() * (maximumRoll - minimumRoll + 1)) + minimumRoll;
};

var choosePokemon = function() {
  var ind =  Math.floor(Math.random() * (pokemonArray.length));
  return pokemonArray[ind];
};

// Sets current Player and Enemy for attack calculations
var currentPlayer = {};
var currentEnemy = {};

var setTrainer = function(trainer) {
  currentPlayer = trainer;
  $('.js-trainer-name').text(trainer.name);
  $('.js-trainer-current-hp').text(trainer.currentHp);
  $('.js-trainer-hp').text(trainer.maxHp);
  $('.js-trainer-image').attr('src', trainer.picture);
};

var setEnemy = function(enemy) {
  currentEnemy = enemy;
  $('.js-enemy-name').text(enemy.name);
  $('.js-enemy-current-hp').text(enemy.currentHp);
  $('.js-enemy-hp').text(enemy.maxHp);
  $('.js-enemy-image').attr('src', enemy.picture);
  $('.combat-text').text('A wild ' + enemy.name + ' appears.');
};

$(document).ready(function() {
  $('.modal-pokemon').on('click', function(){
    $('.start-modal').addClass('not-active');
    var selection = _.where(trainedArray, {'name': $(this).text()});
    currentPlayer = selection[0];
    setTrainer(currentPlayer);
    setEnemy(choosePokemon());
    setTimeout(function() {currentEnemy.attack(currentPlayer);}, 2000);
  });
});



function Trained(name, hp, maximumRoll, minimumRoll, picture) {
  this.name = name;
  this.maxHp = hp;
  this.currentHp = hp;
  this.maximumRoll = maximumRoll;
  this.minimumRoll = minimumRoll;
  this.picture = picture;
}

function Pokemon(name, hp, maximumRoll, minimumRoll, picture) {
  this.name = name;
  this.maxHp = hp;
  this.currentHp = hp;
  this.maximumRoll = maximumRoll;
  this.minimumRoll = minimumRoll;
  this.picture = picture;
}

Trained.prototype.attack = function(target) {
  var trainer = this; //Setting variables for attack method
  var currentHp = target.currentHp;
  var damage = attack(this.maximumRoll, this.minimumRoll);
  $('.combat-text').text(this.name + " attacks the wild " + target.name); //Text for who's attacking who

  setTimeout(function() { // 2 sec delay until attack occurs
    currentHp = currentHp - damage;
    if (currentHp < 0) {
      currentHp = 0;
    }
    target.currentHp = currentHp;
    $('.js-enemy-current-hp').text(currentHp);
    $('.js-enemy-bar').css('width', target.currentHp / target.maxHp * 100 + "%");
    $('.combat-text').text(trainer.name + " did " + damage + " damage to " + target.name);
    console.log(this.name + " did " + damage + " damage to the wild " + target.name);

    if (target.currentHp <= 0) { //Added this in the attack method, else fainted statement happens after counter.
      setTimeout(function() {
        $('.combat-text').text("The wild " + target.name + " has fainted.");
        setTimeout(function() {
          location.reload();
        }, 5000);
      }, 2000);
    } else {

      // counter attack delay
      setTimeout(function() { //2 sec delay until counter attack happens
        target.attack(trainer);
      }, 2000);
    }
  }, 2000);
};

$('.js-attack').on('click', function() {
  $('.js-player-options, .js-combat-text-container').toggleClass('not-active');
  currentPlayer.attack(currentEnemy);
});





Pokemon.prototype.attack = function(target) {
  var pokemon = this;
  var currentHp = target.currentHp;
  var damage = attack(this.maximumRoll, this.minimumRoll);
  $('.combat-text').text("The wild " + pokemon.name + " attacks " + target.name);

  setTimeout(function() { //2sec delay until attack happens
    currentHp = currentHp - damage;
    if (currentHp < 0) {
      currentHp = 0;
    }
    target.currentHp = currentHp;
    $('.js-trainer-current-hp').text(currentHp);
    $('.js-trainer-bar').css('width', target.currentHp / target.maxHp * 100 + "%");
    $('.combat-text').text("The wild " + pokemon.name + " did " + damage + " damage to " + target.name);

    if (target.currentHp <= 0) {
      setTimeout(function() { //2sec delay for result
        $('.combat-text').text(target.name + 'has fainted');
        // timeout page reload so that the player knows they have lost
        setTimeout(function() {
          location.reload();
        }, 5000);
      }, 2000);
    } else {
      setTimeout(function() { //2sec delay until menu reset
        $('.js-player-options, .js-combat-text-container').toggleClass('not-active');
      }, 2000);
    }
  }, 2000);
};
