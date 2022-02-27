const observe = (data) => {
  // 监听数组和对象
  if (!data || Object.prototype.toString.call(data) !== '[object Object]') {
    return;
  }

  Object.keys(data).forEach((key) => {
    let currentValue = data[key];
    if (typeof currentValue === 'object') {
      observe(currentValue);
      data[key] = new Proxy(currentValue, {
        set(target, prototype, value, receiver) {
          // 数组的push会改变length
          if (prototype !== 'length') {
            console.log(
              `setting ${key}, old value is ${currentValue}, new value is ${value}`
            );
          }
          return Reflect.set(target, prototype, value, receiver);
        },
      });
    } else {
      Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        get() {
          console.log(`get ${key}, value is ${currentValue}`);
          return currentValue;
        },
        set(newValue) {
          console.log(
            `set ${key}, old value is ${currentValue}, new value is ${newValue}`
          );
          currentValue = newValue;
        },
      });
    }
  });
};

let obj = {
  name: 'zhangsan',
  age: 18,
  girlfriends: ['xiaoli', 'xiaohong'],
};
observe(obj);

obj.age = 20;
console.log(obj.name);

obj.girlfriends.push('hahaha');
