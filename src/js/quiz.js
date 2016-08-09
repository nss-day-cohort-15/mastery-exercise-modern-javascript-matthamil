'use strict';

let robotModule = (() => {

  // Initializing the object that will be returned by this module
  let api = {};
  // Initializing the player and enemy
  let player, enemy = null;

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
      player = api.robotSelector(playerRobotSelect, playerName);
      enemy = api.robotSelector(enemyRobotSelect, enemyName);

      // Clear #game-area div
      gameArea.html('');

      displayBattleScreen();
    }
  };

  api.robotSelector = (selectValue, robotName) => {
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

  function displayBattleScreen() {
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

    // Robots battle when clicked
    $('#attack-button').click(api.battle);
  }

  api.battle = () => {
    if (player.health <= 0) {
      gameOver();
    }

    else {
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
          gameOver();
        }
        $('#attack-button').removeAttr('disabled');
      }, 1000);
    }
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

  return api;
})();
