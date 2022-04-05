/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.cacheMap = {};
  this.cacheList = [];
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  console.log(this.cacheMap);
  console.log('------');
  // 判断 map 中是否存在
  if (this.cacheMap.hasOwnProperty(key)) {
    this.active(key);
    return this.cacheMap[key];
  }
  return -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  // 达到最大上限，并且新的 key 不在历史记录中
  if (
    this.cacheList.length === this.capacity &&
    !this.cacheMap.hasOwnProperty(key)
  ) {
    // 删除最后一个
    const target = this.cacheList.pop();
    // 删除map中的值
    delete this.cacheMap[target];
  }

  // 添加新的key
  this.active(key);
  this.cacheMap[key] = value;

  console.log(this.cacheMap);
  console.log('------');
};

/**
 * 激活某个key
 * @param {number} key
 * @return {void}
 */
LRUCache.prototype.active = function (key) {
  const index = this.cacheList.findIndex((k) => k === key);
  // 先移除
  if (index !== -1) {
    this.cacheList.splice(index, 1);
  }
  // 添加到队列最前面
  this.cacheList.unshift(key);
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

const lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // 缓存是 {1=1}
lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
lRUCache.get(1); // 返回 1
lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
lRUCache.get(2); // 返回 -1 (未找到)
lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
lRUCache.get(1); // 返回 -1 (未找到)
lRUCache.get(3); // 返回 3
lRUCache.get(4); // 返回 4
