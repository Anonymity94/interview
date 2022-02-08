// https://leetcode-cn.com/problems/design-linked-list/

const Node = function (value) {
  this.val = value;
  this.next = null;
};

const MyLinkedList = function () {
  this.size = 0;
  this.head = new Node(-1);
};

/**
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
  if (index < 0 || index >= this.size) {
    return -1;
  }

  let curNode = this.head;
  for (let i = 0; i <= index; i++) {
    curNode = curNode.next;
  }

  return curNode.val;
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
  this.addAtIndex(0, val);
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
  this.addAtIndex(this.size, val);
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
  if (index > this.size) {
    return;
  }

  if (index < 0) {
    index = 0;
  }

  this.size += 1;
  let prevNode = this.head;
  // 找到第 index 个节点
  for (let i = 0; i < index; i++) {
    prevNode = prevNode.next;
  }

  // 新增节点Node
  const newNode = new Node(val);
  // 新增节点的 next 执行当前 index 位置出的节点
  newNode.next = prevNode.next;
  // 当前 index 位置出的节点的 next 指向新增节点
  prevNode.next = newNode;
};

/**
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
  if (index < 0 || index >= this.size) {
    return;
  }
  this.size -= 1;

  let prevNode = this.head;
  // 找到第 index 个节点
  for (let i = 0; i < index; i++) {
    prevNode = prevNode.next;
  }

  // 删除 prevNode.next
  prevNode.next = prevNode.next.next;
};

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */

const linkedList = new MyLinkedList();
linkedList.addAtHead(1);
console.log(JSON.stringify(linkedList));
linkedList.addAtTail(3);
console.log(JSON.stringify(linkedList));
linkedList.addAtIndex(1, 2); //链表变为1-> 2-> 3
console.log(JSON.stringify(linkedList));
console.log(linkedList.get(1));
linkedList.deleteAtIndex(1); //现在链表是1-> 3
console.log(JSON.stringify(linkedList));
console.log(linkedList.get(1));
console.log(linkedList);
