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
    console.log("TIMEOUT FIRED");
  }, 0);
});
