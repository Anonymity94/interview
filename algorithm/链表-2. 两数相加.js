/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  // 虚拟表头
  let dummy = new ListNode(0);
  let p = dummy;
  // 进位的标志
  let flag = 0;
  while (l1 !== null || l2 !== null) {
    let sum = flag;
    // 加上第一个链表当前位置的值
    if (l1) {
      sum += l1.val;
      l1 = l1.next;
    }
    // 加上第二个链表当前位置的值
    if (l2) {
      sum += l2.val;
      l2 = l2.next;
    }
    // 判断进位
    if (sum >= 10) {
      sum = sum - 10;
      flag = 1;
    } else {
      flag = 0;
    }

    // 添加到新的链表的最后
    p.next = new ListNode(sum);
    p = p.next;
  }

  // 相加完成后，判断是否还有进位
  // 有进位的话，放在最后
  if (flag === 1) {
    p.next = new ListNode(1);
  }

  return dummy.next;
};
