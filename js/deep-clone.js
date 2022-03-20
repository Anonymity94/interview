function isArray(target) {
  return Array.isArray(target);
}

function isObject(target) {
  return target !== null && typeof target === 'object';
}

/**
 * 深拷贝
 * @param {Object} origin 源对象
 * @param {Object} target 目标对象
 */
function deepClone(origin, target) {
  var target = target || {};
  for (let k in origin) {
    if (origin.hasOwnProperty(key)) {
      if (isObject(origin[k])) {
        target[k] = isArray(origin[k]) ? [] : {};
        deepClone(origin[k], target[k]);
      } else {
        target[k] = origin[k];
      }
    }
  }

  return target;
}

/**
 * 浅拷贝
 * @param {Object} origin 源对象
 * @param {Object} target 目标对象
 */
function clone(origin, target) {
  var target = target || {};
  for (let k in origin) {
    if (origin.hasOwnProperty(key)) {
      target[k] = origin[k];
    }
  }

  return target;
}
