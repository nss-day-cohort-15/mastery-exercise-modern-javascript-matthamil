'use strict';

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
