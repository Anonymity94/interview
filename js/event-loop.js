// https://jinoantony.com/blog/setimmediate-vs-process-nexttick-in-nodejs
// https://www.ruanyifeng.com/blog/2014/10/event-loop.html

// setImmediate(() => console.log("I am setImmediate"));

// process.nextTick(() => console.log("I am process.nextTick"));

// setTimeout(() => console.log("I am setTimeout1"), 100);
// setTimeout(() => console.log("I am setTimeout2"), 200);

setImmediate(function () {
  setImmediate(function A() {
    console.log(1);
    setImmediate(function B() {
      console.log(2);
    });
  });

  setTimeout(function timeout() {
    console.log('TIMEOUT FIRED');
  }, 0);
});

// 宏任务
// script(整体代码)
// setTimeout
// setInterval
// I/O
// UI交互事件
// postMessage
// MessageChannel
// setImmediate(Node.js 环境)(优先级最小的宏任务)

// 微任务
// Promise.then
// Object.observe
// MutationObserver
// process.nextTick(Node.js 环境)（优先级最高的微任务）

console.log('start here');
new Promise((resolve, reject) => {
  console.log('first promise constructor');
  resolve();
})
  .then(() => {
    console.log('first promise then');
    return new Promise((resolve, reject) => {
      console.log('second promise');
      resolve();
    }).then(() => {
      console.log('second promise then');
    });
  })
  .then(() => {
    console.log('another first promise then');
  });
console.log('end here');
// start here
// first promise constructor
// end here
// first promise then
// second promise
// second promise then
// another first promise then

console.log('start here');
const foo = () => {
  return new Promise((resolve, reject) => {
    console.log('first promise constructor');

    let promise1 = new Promise((resolve, reject) => {
      console.log('second promise constructor');

      setTimeout(() => {
        console.log('setTimeout here');
        resolve();
      }, 0);

      resolve('promise1');
    });

    resolve('promise0');
    promise1.then((arg) => {
      console.log(arg);
    });
  });
};

foo().then((arg) => {
  console.log(arg);
});

console.log('end here');

// start here
// first promise constructor
// second promise constructor
// end here
// promise1
// promise0
// end here


console.log('script start')

async function async1() {
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2 end')
}
async1()

setTimeout(function() {
  console.log('setTimeout')
}, 0)

new Promise(resolve => {
  console.log('Promise')
  resolve()
})
  .then(function() {
    console.log('promise1')
  })
  .then(function() {
    console.log('promise2')
  })

console.log('script end')
