function EventElement2() {
  this.subs = {};
}

EventElement2.prototype.$on = function (event, fn) {
  // 如果有值就直接赋值，如果为空赋值 []
  this.subs[event] = this.subs[event] || [];
  // 存储事件
  this.subs[event].push(fn);
};
EventElement2.prototype.$emit = function (event, params) {
  // 判断事件是否存在，存在去执行相应的事件
  if (this.subs[event]) {
    this.subs[event].forEach((fn) => {
      fn(params);
    });
  }
};

let em2 = new EventElement2();
em2.$on('click', (val) => {
  console.log('click2 ---->', val);
});

em2.$emit('click', 'hello');
