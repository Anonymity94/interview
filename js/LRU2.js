/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity;

  this.cacheMap = new Map();
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  // 判断 map 中是否存在
  if (this.cacheMap.has(key)) {
    // 更新位置
    const value = this.cacheMap.get(key);
    this.cacheMap.delete(key);
    this.cacheMap.set(key, value);

    return value;
  }
  return -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  // 新的 key 在历史记录中
  if (this.cacheMap.has(key)) {
    this.cacheMap.delete(key);
  } else if (this.cacheMap.size >= this.capacity) {
    // 删除第一个
    const firstKey = this.cacheMap.keys().next().value;
    this.cacheMap.delete(firstKey);
  }

  // 添加新的key
  this.cacheMap.set(key, value);
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
