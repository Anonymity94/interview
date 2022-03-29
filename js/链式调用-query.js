// 题目
// 目标
// 实现哦呵query方法，实现对数据的链式查询和处理
// function query(data) {}

// 要求
// 1. query传入参数为原始数据(数组格式，每个元素都是对象)
// 2. 通过进行链式调用对数据执行操作，支持的方法有
// 2.1 where(predicate) 根据参数的条件进行筛选，参数与 [].filter 的参数类似
// 2.2 orderBy(key, desc) :根据key的值进行排列，默认升序排列，当第二个参数为true时降序排列
// 2.3 groupBy(key):根据key 的值对数据元素进行分组，合并为二维数组
// 2.4 execute():执行所有处理并返回最终结果
// 3. 执行execute方法时才真正执行操作并返回结果

class QueryBuilder {
  constructor(data) {
    // 数据
    this.data = data;
    // 任务执行栈
    this.taskArray = [];
  }

  // 按顺序执行任务
  next() {
    const task = this.taskArray.shift();
    if (task) {
      task();
    }
  }

  where(fn) {
    const task = () => {
      const newData = [];
      // 模拟filter
      for (let index = 0; index < this.data.length; index++) {
        const item = this.data[index];
        if (fn(item)) {
          newData.push(item);
        }
      }
      this.data = newData;
      this.next();
    };

    this.taskArray.push(task);

    return this;
  }
  orderBy(key, desc) {
    const task = () => {
      this.data.sort((a, b) => {
        if (desc) {
          return b[key] - a[key];
        }
        return a[key] - b[key];
      });

      this.next();
    };

    this.taskArray.push(task);
    return this;
  }
  groupBy(key) {
    const task = () => {
      // 建立map存储
      // {[key: string]: any[]}
      let obj = {};
      this.data.forEach((item) => {
        if (obj.hasOwnProperty(item[key])) {
          obj[item[key]].push(item);
        } else {
          obj[item[key]] = [item];
        }
      });

      this.data = Object.values(obj);
      this.next();
    };

    this.taskArray.push(task);
    return this;
  }

  execute() {
    // 执行不完就不返回
    while (this.taskArray.length > 0) {
      this.next();
    }
    return this.data;
  }
}

const data = [
  { name: 'foo', age: 16, city: 'shanghai' },
  { name: 'bar', age: 24, city: 'hangzhou' },
  { name: 'fiz', age: 22, city: 'shanghai' },
  { name: 'baz', age: 19, city: 'hangzhou' },
];

const query = (data) => {
  return new QueryBuilder(data);
};

var res = query(data)
  .where((item) => item.age > 18)
  .orderBy('age')
  .groupBy('city')
  .execute();

console.log(res);
