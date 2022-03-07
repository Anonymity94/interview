// 红绿灯任务控制
// 红灯 3s 亮一次
// 绿灯 1s 亮一次
// 黄灯 2s 亮一次
// 不断交替的亮

/**
 *
 * @param {Number} timer
 * @param {(红|黄|绿)} light
 */
const task = (timer, light) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (light === '红') {
        red();
      }
      if (light === '绿') {
        green();
      }
      if (light === '黄') {
        yellow();
      }
      resolve();
    }, timer);
  });
};

function red() {
  console.log('red');
}
function green() {
  console.log('green');
}
function yellow() {
  console.log('yellow');
}

const run1 = async () => {
  await task(3000, '红');
  await task(1000, '绿');
  await task(2000, '黄');
  run1();
};
// run1();

const run2 = async () => {
  task(3000, '红')
    .then(() => task(1000, '绿'))
    .then(() => task(2000, '黄'))
    .then(() => run2());
};
run2();
