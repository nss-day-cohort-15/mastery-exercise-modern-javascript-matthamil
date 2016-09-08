let api = robotModule;

describe('All robot types should inherit from Robot class', function() {
  it('Drone should inherit from class Robot', function() {
    expect(Robot.isPrototypeOf(Drone)).toBeTruthy();
  });

  it('Bipedal should inherit from class Robot', function() {
    expect(Robot.isPrototypeOf(Bipedal)).toBeTruthy();
  });

  it('ATV should inherit from class Robot', function() {
    expect(Robot.isPrototypeOf(ATV)).toBeTruthy();
  });
});

describe('All sub-types of robots should inherit from class Robot', function() {
  it('RoboBird should inherit from class Robot', function() {
    expect(Robot.isPrototypeOf(RoboBird)).toBeTruthy();
  });

  it('Fly-o-Matic should inherit from class Robot', function() {
    expect(Robot.isPrototypeOf(FlyOMatic)).toBeTruthy();
  });

  it('Stinkoman should inherit from class Robot', function() {
    expect(Robot.isPrototypeOf(Stinkoman)).toBeTruthy();
  });

  it('Iron Giant should inherit from class Robot', function() {
    expect(Robot.isPrototypeOf(IronGiant)).toBeTruthy();
  });

  it('Curiousity should inherit from class Robot', function() {
    expect(Robot.isPrototypeOf(Curiousity)).toBeTruthy();
  });

  it('Apollo should inherit from class Robot', function() {
    expect(Robot.isPrototypeOf(Apollo)).toBeTruthy();
  });
});

describe('Selecting a robot with a valid type should return a robot', function() {
  it('Selecting a RoboBird should create a RoboBird', function() {
    expect(api.robotSelector('RoboBird', 'TestName') instanceof RoboBird).toBeTruthy();
  });

  it('Selecting a Fly-o-Matic should create a FlyOMatic', function() {
    expect(api.robotSelector('Fly-o-Matic', 'TestName') instanceof FlyOMatic).toBeTruthy();
  });

  it('Selecting a Stinkoman should create a Stinkoman', function() {
    expect(api.robotSelector('Stinkoman', 'TestName') instanceof Stinkoman).toBeTruthy();
  });

  it('Selecting an Iron Giant should create an IronGiant', function() {
    expect(api.robotSelector('Iron Giant', 'TestName') instanceof IronGiant).toBeTruthy();
  });

  it('Selecting a Curiosity should create a Curiousity', function() {
    expect(api.robotSelector('Curiousity', 'TestName') instanceof Curiousity).toBeTruthy();
  });

  it('Selecting an Apollo should create an Apollo', function() {
    expect(api.robotSelector('Apollo', 'TestName') instanceof Apollo).toBeTruthy();
  });
});

describe('All robots should have a positive attack value', function() {
  it('RoboBird attack function should return a positive value', function() {
    expect(api.robotSelector('RoboBird', 'Test').attack()).toBeGreaterThan(0);
  });

  it('Fly-o-Matic attack function should return a positive value', function() {
    expect(api.robotSelector('Fly-o-Matic', 'Test').attack()).toBeGreaterThan(0);
  });

  it('Stinkoman attack function should return a positive value', function() {
    expect(api.robotSelector('Stinkoman', 'Test').attack()).toBeGreaterThan(0);
  });

  it('Iron Giant attack function should return a positive value', function() {
    expect(api.robotSelector('Iron Giant', 'Test').attack()).toBeGreaterThan(0);
  });

  it('Curiousity attack function should return a positive value', function() {
    expect(api.robotSelector('Curiousity', 'Test').attack()).toBeGreaterThan(0);
  });

  it('Apollo attack function should return a positive value', function() {
    expect(api.robotSelector('Apollo', 'Test').attack()).toBeGreaterThan(0);
  });
});

describe('A robot should be able to attack another robot', function() {
  it('Robots should be able to deal damage', function() {
    let robot1 = new RoboBird('Test');
    let robot2 = new IronGiant('Test');
    let robot1AttackDamage = robot1.attack();
    robot1.dealDamage(robot2, robot1AttackDamage);
    expect(robot2.startingHp).toBeGreaterThan(robot2.health);
  });
});

describe('A robot should be able to receive damage', function() {
  it('Robots should be able to receive damage', function() {
    let robot1 = new RoboBird('Test');
    robot1.receiveDamage(10);
    expect(robot1.health).toBeLessThan(robot1.startingHp);
  });

  it('Robots should be able to receive enough damage to reach 0 health', function() {
    let robot1 = new RoboBird('Test');
    robot1.receiveDamage(1000000);
    expect(robot1.health).toBe(0);
  });
});
