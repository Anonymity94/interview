LazyMan('Hank');
// Hi, This is Hank!

LazyMan('Hank').sleep(10).eat('dinner');
// Hi, This is Hank!
// 等待10s...
// Wake up after 10
// Eat dinner~

LazyMan('Hank').sleep(10).eat('dinner').eat('supper');
// Hi, This is Hank!
// 等待10s...
// Wake up after 10
// Eat dinner~
// Eat supper~

LazyMan('Hank').sleepFirst(5).eat('supper');
// 等待5s...
// Wake up after 5
// Hi, This is Hank!
// Eat supper~

class LazyManGenerator {
  constructor(name) {
    console.log(`Hi, This is ${name}!`);

    this.taskArray = [];

    const task = () => {};
  }

  next() {}
  sleep() {}
  sleepFirst() {}
  sleepTask() {}
  eat() {}
}
