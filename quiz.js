'use strict';

$(document).ready(() => {

  class Robot {
    constructor(name) {
      this.name = name;
    }

    // Initializes the health to a random value between a range
    initHealth(min, max) {
      this.health = Math.floor(Math.random() * (min - max)) + min;

      // Used for updating the health bar
      this.startingHp = this.health;
    }

    dealDamage(target, damage) {
      target.receiveDamage(damage);
    }

    receiveDamage(amount) {
      if (this.health - amount <= 0) {
        this.health = 0;
        gameOver();
      } else {
        this.health -= amount;
      }
    }
  }

  // Drones
  class Drone extends Robot {}

  // Drone Models
  // RoboBird & FlyOMatic
  class RoboBird extends Drone {
    constructor(name) {
      super(name);
      // Health range of 50-60
      this.initHealth(50, 60);
      this.model = 'RoboBird';
    }

    attack() {
      // Attack range is between 30 and 40
      return Math.floor(Math.random() * (40 - 30 + 1)) + 30;
    }
  }

  class FlyOMatic extends Drone {
    constructor(name) {
      super(name);
      // Health range of 70-75
      this.initHealth(70, 75);
      this.model = 'Fly-o-Matic';
    }

    attack() {
      // Attack range is between 10 and 50
      return Math.floor(Math.random() * (50 - 10 + 1)) + 10;
    }
  }

  // Bipedals
  class Bipedal extends Robot {}

  // Bipedal Models
  // Stinkoman & IronGiant
  class Stinkoman extends Bipedal {
    constructor(name) {
      super(name);
      // Health range of 80-90
      this.initHealth(80, 90);
      this.model = 'Stinkoman';
    }

    attack() {
      // Attack range is between 20 and 25
      return Math.floor(Math.random() * (25 - 20 + 1)) + 20;
    }
  }

  class IronGiant extends Bipedal {
    constructor(name) {
      super(name);
      // Health range of 100-120
      this.initHealth(100, 120);
      this.model = 'Iron Giant';
    }

    attack() {
      // Attack range is between 10 and 15
      return Math.floor(Math.random() * (15 - 10 + 1)) + 10;
    }
  }

  // ATVs
  class ATV extends Robot {}

  // ATV Models
  // Curiousity &
  class Curiousity extends ATV {
    constructor(name) {
      super(name);
      // Health range of 80-90
      this.initHealth(80, 90);
      this.model = 'Curiousity';
    }

    attack() {
      // Attack range is between 5 and 45
      return Math.floor(Math.random() * (45 - 5 + 1)) + 5;
    }
  }

  class Apollo extends ATV {
    constructor(name) {
      super(name);
      // Health range of 40-55
      this.initHealth(40, 55);
      this.model = 'Apollo';
    }

    attack() {
      // Attack range is between 1 and 100
      return Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    }
  }

  let player, enemy;

  function init(e) {
    // Caching values from the DOM
    let playerName = $('#robot-1-name').val();
    let playerRobotSelect = $('#player-robot-select').val();
    let enemyName = $('#robot-2-name').val();
    let enemyRobotSelect = $('#enemy-robot-select').val();
    let startButton = $('#start');
    let gameArea = $('#game-area');

    // Check for names entered in text fields
    if (!playerName || !enemyName) {
      alert('Please enter names for both player and computer.');
    }

    // Check values in the select boxes
    else if (!playerRobotSelect || !enemyRobotSelect) {
      alert('Please select robots for both player and computer.');
    }

    else {
      // Remove the button
      startButton.remove();

      // Store values in variables player, enemy
      player = robotSelector(playerRobotSelect, playerName);
      enemy = robotSelector(enemyRobotSelect, enemyName);

      // Clear #game-area div
      gameArea.html('');

      battleMode();
    }
  };

  function robotSelector(selectValue, robotName) {
    switch (selectValue) {
        case 'RoboBird':    return new RoboBird(robotName);   break;
        case 'Fly-o-Matic': return new FlyOMatic(robotName);  break;
        case 'Stinkoman':   return new Stinkoman(robotName);  break;
        case 'Iron Giant':  return new IronGiant(robotName);  break;
        case 'Curiousity':  return new Curiousity(robotName); break;
        case 'Apollo':      return new Apollo(robotName);     break;
        default: throw new Error(`Invalid robot selection: ${selectValue}.`);
      }
  }

  function battleMode() {
    $('#game-area').html(`
      <div class="col-sm-6" id="player-robot">
        <h2>${player.name}</h2>
        <div class="progress">
          <div class="progress-bar" role="progressbar" style="width: 100%;" id="player-healthbar">
            ${player.health}
          </div>
        </div>
        <h3>Model: ${player.model}</h3>
      </div>
      <div class="col-sm-6" id="enemy-robot">
        <h2>${enemy.name}</h2>
        <div class="progress">
          <div class="progress-bar progress-bar-danger" role="progressbar" style="width: 100%;" id="enemy-healthbar">
            ${enemy.health}
          </div>
        </div>
        <h3>Model: ${enemy.model}</h3>
      </div>
      <button type="button" id="attack-button" class="btn btn-danger">Attack</button>
    `);

    $('#attack-button').click(battle);

    function battle() {
      let playerAttack = player.attack();
      let enemyAttack = enemy.attack();

      console.log(`${player.name} attacked for ${playerAttack}`);
      player.dealDamage(enemy, playerAttack);
      updateHealthBars();
      $('#attack-button').attr('disabled', 'true');

      setTimeout(() => {
        if (enemy.health > 0) {
          console.log(`${enemy.name} attacked for ${enemyAttack}`);
          enemy.dealDamage(player, enemyAttack);
          updateHealthBars();
        } else {
          //gameOver();
        }
        $('#attack-button').removeAttr('disabled');
      }, 1000);


    }

    function updateHealthBars() {
      $('#player-healthbar').html(`${player.health}`);
      $('#player-healthbar').css('width', () => {
        return `${parseInt(player.health/player.startingHp * 100)}%`;
      });

      $('#enemy-healthbar').html(`${enemy.health}`);
      $('#enemy-healthbar').css('width', () => {
        return `${parseInt(enemy.health/enemy.startingHp * 100)}%`;
      });
    }
  }

  function gameOver() {
    let winner, loser;
    if (player.health === 0) {
      winner = enemy;
      loser = player;
    } else {
      winner = player;
      loser = enemy;
    }

    $('#attack-button').remove();
    $('#game-area').append(`
      <h1>${winner.name} defeated ${loser.name}!</h1>
    `)
  }

  $('#start').click(init);

});
