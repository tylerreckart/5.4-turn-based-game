// player
var Brenden = new Trainer('Brenden', 100, 55, 15);

// enemy
var Blastoise = new Pokemon('Blastoise', 100, 50, 10);
var Pikachu = new Pokemon('Pikachu', 100, 40, 30);
var Charizard = new Pokemon('Charizard', 100, 50, 20);
var Alakazam = new Pokemon('Alakazam', 100, 65, 10);
var Poliwhirl = new Pokemon('Poliwhirl', 100, 40, 35);
var Mewtwo = new Pokemon('Mewtwo', 100, 80, 25);

var attack = function(maximumRoll, minimumRoll) {
  return Math.floor(Math.random() * (maximumRoll - minimumRoll + 1))  + minimumRoll;
};

function Trainer(name, hp, maximumRoll, minimumRoll){
  this.name = name;
  this.hp = hp;
  this.maximumRoll = maximumRoll;
  this.minimumRoll = minimumRoll;
//  this.damage = attack(maximumRoll, minimumRoll);
}

function Pokemon(name, hp, maximumRoll, minimumRoll){
  this.name = name;
  this.hp = hp;
  this.maximumRoll = maximumRoll;
  this.minimumRoll = minimumRoll;
//  this.damage = attack(maximumRoll, minimumRoll);
}

Trainer.prototype.attack = function(target) {
  var currentHp = target.hp;
  var damage = attack(this.maximumRoll, this.minimumRoll);
  currentHp = currentHp - damage;
  target.hp = currentHp;
  console.log(this.name + " did " + damage + " to " + target.name);

  target.attack(this);

  if(this.hp <= 0){
    console.log('You have fainted');
    location.reload();
  } else {}
};

function attackDelay() {
  return window.setTimeout(returnAttack, 2000);
}

function returnAttack() {
  attack(this);
}

Pokemon.prototype.attack = function(target) {
  var currentHp = target.hp;
  var damage = attack(this.maximumRoll, this.minimumRoll);
  currentHp = currentHp - damage;
  target.hp = currentHp;
  console.log(this.name + " did " + damage + " to " + target.name);

  if(this.hp <= 0){
    console.log(this.name + ' has fainted');
  } else {}
};
