'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Robot = function () {
  function Robot(name) {
    _classCallCheck(this, Robot);

    this.name = name;
  }

  // Initializes the health to a random value between a range


  _createClass(Robot, [{
    key: 'initHealth',
    value: function initHealth(min, max) {
      this.health = Math.floor(Math.random() * (min - max)) + min;

      // Used for updating the health bar
      this.startingHp = this.health;
    }
  }, {
    key: 'dealDamage',
    value: function dealDamage(target, damage) {
      target.receiveDamage(damage);
    }
  }, {
    key: 'receiveDamage',
    value: function receiveDamage(amount) {
      if (this.health - amount <= 0) {
        this.health = 0;
      } else {
        this.health -= amount;
      }
    }
  }]);

  return Robot;
}();

// Drones


var Drone = function (_Robot) {
  _inherits(Drone, _Robot);

  function Drone() {
    _classCallCheck(this, Drone);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Drone).apply(this, arguments));
  }

  return Drone;
}(Robot);

// Drone Models
// RoboBird & FlyOMatic


var RoboBird = function (_Drone) {
  _inherits(RoboBird, _Drone);

  function RoboBird(name) {
    _classCallCheck(this, RoboBird);

    // Health range of 50-60
    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(RoboBird).call(this, name));

    _this2.initHealth(50, 60);
    _this2.model = 'RoboBird';
    return _this2;
  }

  _createClass(RoboBird, [{
    key: 'attack',
    value: function attack() {
      // Attack range is between 30 and 40
      return Math.floor(Math.random() * (40 - 30 + 1)) + 30;
    }
  }]);

  return RoboBird;
}(Drone);

var FlyOMatic = function (_Drone2) {
  _inherits(FlyOMatic, _Drone2);

  function FlyOMatic(name) {
    _classCallCheck(this, FlyOMatic);

    // Health range of 70-75
    var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(FlyOMatic).call(this, name));

    _this3.initHealth(70, 75);
    _this3.model = 'Fly-o-Matic';
    return _this3;
  }

  _createClass(FlyOMatic, [{
    key: 'attack',
    value: function attack() {
      // Attack range is between 10 and 50
      return Math.floor(Math.random() * (50 - 10 + 1)) + 10;
    }
  }]);

  return FlyOMatic;
}(Drone);

// Bipedals


var Bipedal = function (_Robot2) {
  _inherits(Bipedal, _Robot2);

  function Bipedal() {
    _classCallCheck(this, Bipedal);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Bipedal).apply(this, arguments));
  }

  return Bipedal;
}(Robot);

// Bipedal Models
// Stinkoman & IronGiant


var Stinkoman = function (_Bipedal) {
  _inherits(Stinkoman, _Bipedal);

  function Stinkoman(name) {
    _classCallCheck(this, Stinkoman);

    // Health range of 80-90
    var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(Stinkoman).call(this, name));

    _this5.initHealth(80, 90);
    _this5.model = 'Stinkoman';
    return _this5;
  }

  _createClass(Stinkoman, [{
    key: 'attack',
    value: function attack() {
      // Attack range is between 20 and 25
      return Math.floor(Math.random() * (25 - 20 + 1)) + 20;
    }
  }]);

  return Stinkoman;
}(Bipedal);

var IronGiant = function (_Bipedal2) {
  _inherits(IronGiant, _Bipedal2);

  function IronGiant(name) {
    _classCallCheck(this, IronGiant);

    // Health range of 100-120
    var _this6 = _possibleConstructorReturn(this, Object.getPrototypeOf(IronGiant).call(this, name));

    _this6.initHealth(100, 120);
    _this6.model = 'Iron Giant';
    return _this6;
  }

  _createClass(IronGiant, [{
    key: 'attack',
    value: function attack() {
      // Attack range is between 10 and 15
      return Math.floor(Math.random() * (15 - 10 + 1)) + 10;
    }
  }]);

  return IronGiant;
}(Bipedal);

// ATVs


var ATV = function (_Robot3) {
  _inherits(ATV, _Robot3);

  function ATV() {
    _classCallCheck(this, ATV);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ATV).apply(this, arguments));
  }

  return ATV;
}(Robot);

// ATV Models
// Curiousity &


var Curiousity = function (_ATV) {
  _inherits(Curiousity, _ATV);

  function Curiousity(name) {
    _classCallCheck(this, Curiousity);

    // Health range of 80-90
    var _this8 = _possibleConstructorReturn(this, Object.getPrototypeOf(Curiousity).call(this, name));

    _this8.initHealth(80, 90);
    _this8.model = 'Curiousity';
    return _this8;
  }

  _createClass(Curiousity, [{
    key: 'attack',
    value: function attack() {
      // Attack range is between 5 and 45
      return Math.floor(Math.random() * (45 - 5 + 1)) + 5;
    }
  }]);

  return Curiousity;
}(ATV);

var Apollo = function (_ATV2) {
  _inherits(Apollo, _ATV2);

  function Apollo(name) {
    _classCallCheck(this, Apollo);

    // Health range of 40-55
    var _this9 = _possibleConstructorReturn(this, Object.getPrototypeOf(Apollo).call(this, name));

    _this9.initHealth(40, 55);
    _this9.model = 'Apollo';
    return _this9;
  }

  _createClass(Apollo, [{
    key: 'attack',
    value: function attack() {
      // Attack range is between 1 and 100
      return Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    }
  }]);

  return Apollo;
}(ATV);