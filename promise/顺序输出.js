let promiseFunc = function () {
  return new Promise((resolve, reject) => {
    console.log(this.name);
    setTimeout(function () {
      console.log(this.name);
      console.log('abc');
      resolve('cba');
    }, 2000);

    console.log('aaa');
  });
};

let Object1 = {
  name: 'james',
  func: promiseFunc,
};

Object1.func().then((result) => {
  console.log('result', result);
});
