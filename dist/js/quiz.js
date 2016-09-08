'use strict';

var robotModule = function () {

  // Initializing the object that will be returned by this module
  var api = {};
  // Initializing the player and enemy
  var player = void 0,
      enemy = null;

  function init(e) {
    // Caching values from the DOM
    var playerName = $('#robot-1-name').val();
    var playerRobotSelect = $('#player-robot-select').val();
    var enemyName = $('#robot-2-name').val();
    var enemyRobotSelect = $('#enemy-robot-select').val();
    var startButton = $('#start');
    var gameArea = $('#game-area');

    // Check for names entered in text fields
    if (!playerName || !enemyName) {
      alert('Please enter names for both player and computer.');
    }

    // Check values in the select boxes
    else if (!playerRobotSelect || !enemyRobotSelect) {
        alert('Please select robots for both player and computer.');
      } else {
        // Remove the button
        startButton.remove();

        // Store values in variables player, enemy
        player = api.robotSelector(playerRobotSelect, playerName);
        enemy = api.robotSelector(enemyRobotSelect, enemyName);

        // Clear #game-area div
        gameArea.html('');

        displayBattleScreen();
      }
  }

  api.robotSelector = function (selectValue, robotName) {
    switch (selectValue) {
      case 'RoboBird':
        return new RoboBird(robotName);
      case 'Fly-o-Matic':
        return new FlyOMatic(robotName);
      case 'Stinkoman':
        return new Stinkoman(robotName);
      case 'Iron Giant':
        return new IronGiant(robotName);
      case 'Curiousity':
        return new Curiousity(robotName);
      case 'Apollo':
        return new Apollo(robotName);
      default:
        throw new Error('Invalid robot selection: ' + selectValue + '.');
    }
  };

  function displayBattleScreen() {
    $('#game-area').html('\n      <div class="col-sm-6" id="player-robot">\n        <h2>' + player.name + '</h2>\n        <div class="progress">\n          <div class="progress-bar" role="progressbar" style="width: 100%;" id="player-healthbar">\n            ' + player.health + '\n          </div>\n        </div>\n        <h3>Model: ' + player.model + '</h3>\n      </div>\n      <div class="col-sm-6" id="enemy-robot">\n        <h2>' + enemy.name + '</h2>\n        <div class="progress">\n          <div class="progress-bar progress-bar-danger" role="progressbar" style="width: 100%;" id="enemy-healthbar">\n            ' + enemy.health + '\n          </div>\n        </div>\n        <h3>Model: ' + enemy.model + '</h3>\n      </div>\n      <button type="button" id="attack-button" class="btn btn-danger">Attack</button>\n    ');

    // Robots battle when clicked
    $('#attack-button').click(battle);
  }

  function battle() {
    var playerAttack = player.attack();
    var enemyAttack = enemy.attack();

    console.log(player.name + ' attacked for ' + playerAttack);
    player.dealDamage(enemy, playerAttack);
    updateHealthBars();
    $('#attack-button').attr('disabled', 'true');

    setTimeout(function () {
      if (enemy.health > 0) {
        console.log(enemy.name + ' attacked for ' + enemyAttack);
        enemy.dealDamage(player, enemyAttack);
        updateHealthBars();
        if (player.health <= 0) {
          gameOver();
        }
      } else {
        gameOver();
      }
      $('#attack-button').removeAttr('disabled');
    }, 1000);
  }

  function updateHealthBars() {
    $('#player-healthbar').html('' + player.health);
    $('#player-healthbar').css('width', function () {
      return parseInt(player.health / player.startingHp * 100) + '%';
    });

    $('#enemy-healthbar').html('' + enemy.health);
    $('#enemy-healthbar').css('width', function () {
      return parseInt(enemy.health / enemy.startingHp * 100) + '%';
    });
  }

  function gameOver() {
    var winner = void 0,
        loser = void 0;
    if (player.health === 0) {
      winner = enemy;
      loser = player;
    } else {
      winner = player;
      loser = enemy;
    }

    $('#attack-button').remove();
    $('#game-area').append('\n      <h1>' + winner.name + ' defeated ' + loser.name + '!</h1>\n    ');
  }

  $('#start').click(init);

  return api;
}();