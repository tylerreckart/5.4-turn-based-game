// player
var trainedBlastoise = new Trained('Blastoise', 100, 50, 10);
var trainedCharizard = new Trained('Charizard', 100, 50, 20);
var trainedPikachu = new Trained('Pikachu', 100, 40, 30);
var trainedVenusaur = new Trained('Venusaur', 120, 40, 10);

// enemy
var blastoise = new Pokemon('Blastoise', 100, 50, 10);
var pikachu = new Pokemon('Pikachu', 100, 40, 30);
var charizard = new Pokemon('Charizard', 100, 50, 20);
var alakazam = new Pokemon('Alakazam', 100, 65, 10);
var poliwhirl = new Pokemon('Poliwhirl', 100, 40, 35);
var mewtwo = new Pokemon('Mewtwo', 100, 80, 25);

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
};

var setEnemy = function(enemy) {
  currentEnemy = enemy;
  $('.js-enemy-name').text(enemy.name);
  $('.js-enemy-current-hp').text(enemy.currentHp);
  $('.js-enemy-hp').text(enemy.maxHp);
};

$(document).ready(function() {
  $('.modal-pokemon').on('click', function(){
    $('.start-modal').addClass('not-active');
    var selection = _.where(trainedArray, {'name': $(this).text()});
    currentPlayer = selection[0];
    setTrainer(currentPlayer);
    setEnemy(choosePokemon());
    currentEnemy.attack(currentPlayer);
  });
});



function Trained(name, hp, maximumRoll, minimumRoll) {
  this.name = name;
  this.maxHp = hp;
  this.currentHp = hp;
  this.maximumRoll = maximumRoll;
  this.minimumRoll = minimumRoll;
}

function Pokemon(name, hp, maximumRoll, minimumRoll) {
  this.name = name;
  this.maxHp = hp;
  this.currentHp = hp;
  this.maximumRoll = maximumRoll;
  this.minimumRoll = minimumRoll;
}

Trained.prototype.attack = function(target) {
  var trainer = this; //Setting variables for attack method
  var currentHp = target.currentHp;
  var damage = attack(this.maximumRoll, this.minimumRoll);
  $('.combat-text').text(this.name + " attacks " + target.name); //Text for who's attacking who

  setTimeout(function() { // 2 sec delay until attack occurs
    currentHp = currentHp - damage;
    target.currentHp = currentHp;
    $('.js-enemy-current-hp').text(currentHp);
    $('.js-enemy-bar').css('width', target.currentHp / target.maxHp * 100 + "%");
    $('.combat-text').text(trainer.name + " did " + damage + " damage to " + target.name);
    console.log(this.name + " did " + damage + " damage to " + target.name);

    if (target.currentHp <= 0) { //Added this in the attack method, else fainted statement happens after counter.
      setTimeout(function() {
        $('.combat-text').text(target.name + " has fainted.");
        console.log(target.name + " has fainted.");
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
  $('.combat-text').text(pokemon.name + " attacks " + target.name);

  setTimeout(function() { //2sec delay until attack happens
    currentHp = currentHp - damage;
    target.currentHp = currentHp;
    $('.js-trainer-current-hp').text(currentHp);
    $('.js-trainer-bar').css('width', target.currentHp / target.maxHp * 100 + "%");
    $('.combat-text').text(pokemon.name + " did " + damage + " damage to " + target.name);

    if (target.currentHp <= 0) {
      setTimeout(function() { //2sec delay for result
        $('.combat-text').text('You have fainted');
        console.log('You have fainted');
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
