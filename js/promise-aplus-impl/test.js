const MyPromise = require("./index");
(function () {
  const promise1 = MyPromise.resolve(3);
  const promise2 = 42;
  const promise3 = new MyPromise((resolve, reject) => {
    setTimeout(resolve, 100, "foo");
  });
  const promise4 = MyPromise.reject(new Error("Err"));
  MyPromise.all([promise1, promise2, promise3, promise4])
    .then((values) => {
      console.log("test Promise.all()");
      console.log(values);
    })
    .catch((err) => {
      console.error(err);
    });
})();

(function () {
  MyPromise.reject(new Error("fail")).then(
    (value) => {
      console.log(value);
    },
    (reason) => {
      console.error(reason);
    }
  );
})();

(function () {
  const promise1 = MyPromise.resolve(3);
  const promise2 = new MyPromise((resolve, reject) =>
    setTimeout(reject, 100, "foo")
  );
  const promises = [promise1, promise2];

  MyPromise.allSettled(promises).then((results) =>
    results.forEach((result) => console.log(result))
  );
})();
