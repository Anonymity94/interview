// https://leetcode-cn.com/problems/design-circular-queue

/**
 * @param {number} k
 */
var MyCircularQueue = function (k) {
  this.capacity = k;
  this.arr = new Array(k);
  this.headIndex = 0;
  this.count = 0;
};

/**
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function (value) {
  // 判断是否满栈
  if (this.isFull()) {
    return false;
  }
  this.arr[(this.headIndex + this.count) % this.capacity] = value;
  this.count++;
  return true;
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function () {
  if (this.isEmpty()) {
    return false;
  }
  // 是否只有1个元素
  const tailIndex = this.getTailIndex();
  this.arr[this.headIndex] = undefined;
  if (tailIndex === this.headIndex && this.count === 1) {
    this.headIndex = 0;
  } else {
    // 如果有多个元素
    if (this.headIndex + 1 > this.capacity) {
      this.headIndex = 0;
    } else {
      this.headIndex++;
    }
  }
  this.count--;
  return true;
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Front = function () {
  if (this.isEmpty()) {
    return -1;
  }
  return this.arr[this.headIndex];
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function () {
  if (this.isEmpty()) {
    return -1;
  }
  const tailIndex = this.getTailIndex();
  return this.arr[tailIndex];
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function () {
  return this.count === 0;
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function () {
  return this.count === this.capacity;
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.getTailIndex = function () {
  return (this.headIndex + this.count - 1) % this.capacity;
};

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */

var obj = new MyCircularQueue(5);

obj.enQueue(5);
obj.enQueue(13);
obj.enQueue(8);
obj.enQueue(2);
console.log(obj);
obj.enQueue(10);
obj.deQueue();
obj.deQueue();
console.log(obj);
obj.enQueue(23);
obj.enQueue(6);
console.log(obj);
obj.deQueue();
obj.deQueue();
obj.deQueue();
obj.deQueue();
console.log(obj);
