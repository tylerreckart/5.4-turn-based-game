// player
var brenden = new Trainer('Brenden', 100, 55, 15);

// enemy
var blastoise = new Pokemon('Blastoise', 100, 50, 10);
var pikachu = new Pokemon('Pikachu', 100, 40, 30);
var charizard = new Pokemon('Charizard', 100, 50, 20);
var alakazam = new Pokemon('Alakazam', 100, 65, 10);
var poliwhirl = new Pokemon('Poliwhirl', 100, 40, 35);
var mewtwo = new Pokemon('Mewtwo', 100, 80, 25);

// random damage calculation based on maxRoll and minRoll values
var attack = function(maximumRoll, minimumRoll) {
  return Math.floor(Math.random() * (maximumRoll - minimumRoll + 1))  + minimumRoll;
};

function Trainer(name, hp, maximumRoll, minimumRoll){
  this.name = name;
  this.maxHp = hp;
  this.currentHp = hp;
  this.maximumRoll = maximumRoll;
  this.minimumRoll = minimumRoll;
}

function Pokemon(name, hp, maximumRoll, minimumRoll){
  this.name = name;
  this.maxHp = hp;
  this.currentHp = hp;
  this.maximumRoll = maximumRoll;
  this.minimumRoll = minimumRoll;
}

Trainer.prototype.attack = function(target) {
  var trainer = this;
  var currentHp = target.currentHp;
  var damage = attack(this.maximumRoll, this.minimumRoll);
  currentHp = currentHp - damage;
  target.currentHp = currentHp;
  $('.js-enemy-current-hp').text(currentHp);
  $('.js-enemy-bar').css('width', target.currentHp/target.maxHp*100 + "%");

  console.log(this.name + " did " + damage + " damage to " + target.name);
  //Added this in the attack method, else fainted statement happens after counter.
  if(target.currentHp <= 0){
    console.log(target.name + " has fainted.");
    setTimeout(function(){
      location.reload();
    },5000);
  } else {

    // counter attack delay
    setTimeout(function(){
      target.attack(trainer);

      if(trainer.currentHp <= 0){
        console.log('You have fainted');
        // timeout page reload so that the player knows they have lost
        setTimeout(function(){
          location.reload();
        }, 5000);
      } else {}

    }, 1000);
  }
};

$('.js-attack-button').on('click', function(){
  brenden.attack(blastoise);
});

Pokemon.prototype.attack = function(target) {
  var currentHp = target.currentHp;
  var damage = attack(this.maximumRoll, this.minimumRoll);
  currentHp = currentHp - damage;
  target.currentHp = currentHp;
  $('.js-trainer-current-hp').text(currentHp);
  $('.js-trainer-bar').css('width', target.currentHp/target.maxHp*100 + "%");
  console.log(this.name + " did " + damage + " damage to " + target.name);

  // if(this.hp <= 0){
  //   console.log(this.name + ' has fainted');
  // } else {}
};

var setTrainer = function(trainer){
  $('.js-trainer-name').text(trainer.name);
  $('.js-trainer-current-hp').text(trainer.currentHp);
  $('.js-trainer-hp').text(trainer.maxHp);
};

var setEnemy = function(enemy){
  $('.js-enemy-name').text(enemy.name);
  $('.js-enemy-current-hp').text(enemy.currentHp);
  $('.js-enemy-hp').text(enemy.maxHp);
};
