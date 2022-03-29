class LazyManGenerator {
  constructor(name) {
    this.taskArray = [];
    // 初始化任务
    const task = () => {
      console.log(`Hi, This is ${name}!`);
      this.next();
    };
    // 初始化任务放入队列中
    this.taskArray.push(task);

    setTimeout(() => {
      this.next();
    }, 0);
  }

  /**
   * 取出下一个任务并执行
   */
  next() {
    const task = this.taskArray.shift();
    if (task) {
      task();
    }
  }
  /**
   * 睡觉
   * @param {Number} time 秒数
   * @returns this
   */
  sleep(time) {
    this.sleepTask(time, false);
    // 保持链式调用
    return this;
  }

  /**
   * 先睡觉
   * @param {Number} time 秒数
   * @returns this
   */
  sleepFirst(time) {
    this.sleepTask(time, true);
    return this;
  }

  /**
   * 睡眠任务
   * @param {Number} time 描述
   * @param {Boolean} first 是否先睡觉
   */
  sleepTask(time, first) {
    const task = () => {
      console.log(`等待 ${time}s...`);
      setTimeout(() => {
        console.log(`Wake up after ${time}`);
        this.next();
      }, time * 1000);
    };

    if (first) {
      this.taskArray.unshift(task);
    } else {
      this.taskArray.push(task);
    }
  }

  /**
   * 吃东西
   * @param {String} name 食物名称
   * @returns this
   */
  eat(name) {
    this.taskArray.push(() => {
      console.log(`Eat ${name}~`);
      this.next();
    });
    return this;
  }
}

function LazyMan(name) {
  return new LazyManGenerator(name);
}

// LazyMan('Hank');
// Hi, This is Hank!

// LazyMan('Hank').sleep(10).eat('dinner');
// Hi, This is Hank!
// 等待10s...
// Wake up after 10
// Eat dinner~

// LazyMan('Hank').sleep(10).eat('dinner').eat('supper');
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


// https://www.jianshu.com/p/f636aa4eb86d
