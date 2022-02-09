class MyPromise {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";

  constructor(func) {
    this.PromiseState = MyPromise.PENDING;
    this.PromiseResult = null;

    try {
      func(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }
  resolve(result) {
    if (this.PromiseState === MyPromise.PENDING) {
      this.PromiseState = MyPromise.FULFILLED;
      this.PromiseResult = result;
    }
  }
  reject(reason) {
    if (this.PromiseState === MyPromise.PENDING) {
      this.PromiseState = MyPromise.REJECTED;
      this.PromiseResult = reason;
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    if (this.PromiseState === MyPromise.FULFILLED) {
      setTimeout(() => {
        onFulfilled(this.PromiseResult);
      });
    }
    if (this.PromiseState === MyPromise.REJECTED) {
      setTimeout(() => {
        onRejected(this.PromiseResult);
      });
    }
  }
}

let promise1 = new MyPromise((resolve, reject) => {
  resolve("这次一定");
});

promise1.then(undefined, (err) => {
  console.log(err);
});

console.log(promise1);

let promise2 = new MyPromise((resolve, reject) => {
  reject("下次一定");
});

// let promise3 = new MyPromise((resolve, reject) => {
//   throw new Error("白嫖不成功");
// });
// promise3.then(
//   (result) => {
//     console.log(result);
//   },
//   (reason) => {
//     console.log(reason);
//   }
// );

console.log(1);
let promise4 = new MyPromise((resolve, reject) => {
  console.log(2);
  setTimeout(() => {
    resolve("这次一定");
    console.log(4);
  });
});
promise4.then((result) => console.log(result));
console.log(3);
