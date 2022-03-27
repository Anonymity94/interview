/**
 *
 * @param {function} func 回调函数
 * @param {number} wait 时间窗口间隔
 * @param {object} options 如果想忽略开始函数的调用，传入{leading: false};如果想忽略结尾函数的调用，传入{trailing: false}
 * @returns {function}
 */
function throttle(func, wait, options) {
  var timeout, context, args, result;
  // 之前的时间戳
  var previous = 0;
  if (!options) {
    options = {};
  }

  // 定时器回调函数
  var later = function () {
    // 如果设置了leading，将previous设置为0
    previous = options.leading === false ? 0 : +new Date();
    // 置空
    timeout = null;
    func.apply(context, args);
    if (!timeout) {
      context = args = null;
    }
  };

  return function () {
    // 获取当前的时间戳
    var now = +new Date();
    // 第一次不需要执行函数
    // 就将上次时间戳设置为当前
    // 这样能保证剩余时间大于0
    if (!previous && options.leading === false) {
      previous = now;
    }
    // 计算剩余时间
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;

    // 如果当前调用已经大于上次时间+wait
    // 或者是修改的系统时间
    // 如果设置了 trailing，只会进入这个条件
    // 如果没有设置 leading，只有第一次会进入这个条件
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) {
        context = args = null;
      }
    } else if (!timeout && options.trailing !== false) {
      // 判断是否设置了定时器和 trailing
      // 没有的话就开启一个定时器
      timeout = setTimeout(later, remaining);
    }

    return result;
  };
}
