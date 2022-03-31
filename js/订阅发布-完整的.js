function isValidListener(listener) {
  if (typeof listener === 'function') {
    return true;
  } else if (listener && typeof listener === 'object') {
    return isValidListener(listener.listener);
  } else {
    return false;
  }
}

function indexOf(array, item) {
  var result = -1;
  item = typeof item === 'object' ? item.listener : item;

  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i].listener === item) {
      result = i;
      break;
    }
  }

  return result;
}

function EventEmitter() {
  this.__events = {};
}

EventEmitter.VERSION = '1.0.0';

var proto = EventEmitter.prototype;

/**
 * 添加事件
 * @param  {String} eventName 事件名称
 * @param  {Function} listener 监听器函数
 * @return {Object} 可链式调用
 */
proto.on = function (eventName, listener) {
  if (!eventName || !listener) return;

  if (!isValidListener(listener)) {
    throw new TypeError('listener must be a function');
  }

  var events = this.__events;
  var listeners = (events[eventName] = events[eventName] || []);
  var listenerIsWrapped = typeof listener === 'object';

  // 不重复添加事件
  if (indexOf(listeners, listener) === -1) {
    listeners.push(
      listenerIsWrapped
        ? listener
        : {
            listener: listener,
            once: false,
          }
    );
  }

  return this;
};

/**
 * 添加事件，该事件只能被执行一次
 * @param  {String} eventName 事件名称
 * @param  {Function} listener 监听器函数
 * @return {Object} 可链式调用
 */
proto.once = function (eventName, listener) {
  return this.on(eventName, {
    listener: listener,
    once: true,
  });
};

/**
 * 删除事件
 * @param  {String} eventName 事件名称
 * @param  {Function} listener 监听器函数
 * @return {Object} 可链式调用
 */
proto.off = function (eventName, listener) {
  var listeners = this.__events[eventName];
  if (!listeners) return;

  var index;
  for (var i = 0, len = listeners.length; i < len; i++) {
    if (listeners[i] && listeners[i].listener === listener) {
      index = i;
      break;
    }
  }

  if (typeof index !== 'undefined') {
    listeners.splice(index, 1, null);
  }

  return this;
};

/**
 * 触发事件
 * @param  {String} eventName 事件名称
 * @param  {Array} args 传入监听器函数的参数，使用数组形式传入
 * @return {Object} 可链式调用
 */
proto.emit = function (eventName, args) {
  var listeners = this.__events[eventName];
  if (!listeners) return;

  for (var i = 0; i < listeners.length; i++) {
    var listener = listeners[i];
    if (listener) {
      listener.listener.apply(this, args || []);
      if (listener.once) {
        this.off(eventName, listener.listener);
      }
    }
  }

  return this;
};

/**
 * 删除某一个类型的所有事件或者所有事件
 * @param  {String[]} eventName 事件名称
 */
proto.allOff = function (eventName) {
  if (eventName && this.__events[eventName]) {
    this.__events[eventName] = [];
  } else {
    this.__events = {};
  }
};

var emitter = new EventEmitter();

function handleOne(a, b, c) {
  console.log('第一个监听函数', a, b, c);
}

function handleSecond(a, b, c) {
  console.log('第二个监听函数', a, b, c);
}

function handleThird(a, b, c) {
  console.log('第三个监听函数', a, b, c);
}

emitter
  .on('demo', handleOne)
  .once('demo', handleSecond)
  .on('demo', handleThird);

emitter.emit('demo', [1, 2, 3]);
// => 第一个监听函数 1 2 3
// => 第二个监听函数 1 2 3
// => 第三个监听函数 1 2 3

emitter.off('demo', handleThird);
emitter.emit('demo', [1, 2, 3]);
// => 第一个监听函数 1 2 3

emitter.allOff();
emitter.emit('demo', [1, 2, 3]);
// nothing
