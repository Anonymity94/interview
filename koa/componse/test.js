const app = require('./app');

// 异步函数
function asyncFn() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('async function');
      resolve();
    }, 3000);
  });
}

app.use(async (next) => {
  console.log(1);
  await next();
  console.log(2);
});

app.use(async (next) => {
  console.log(3);
  await asyncFn();
  await next();
  console.log(4);
});

app.use((next) => {
  console.log(5);
  next();
  console.log(6);
});

app.use(() => {
  console.log(7);
  console.log('hello world');
  console.log(8);
});

app.compose();
