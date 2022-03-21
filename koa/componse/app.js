const app = {
  middleware: [],
};

app.use = function (fn) {
  app.middleware.push(fn);
};

app.compose = function () {
  // 递归函数
  function dispatch(index) {
    if (index === app.middleware.length) {
      return Promise.resolve();
    }
    const fn = app.middleware[index];
    return Promise.resolve(
      fn(function next() {
        return dispatch(index + 1);
      })
    );
  }

  dispatch(0);
};

module.exports = app;
