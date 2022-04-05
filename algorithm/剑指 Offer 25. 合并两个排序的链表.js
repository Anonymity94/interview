/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  // 新链表，虚拟表头
  const dummy = new ListNode(0);
  let p = dummy;

  while (l1 !== null || l2 !== null) {
    // 当 l1 存在，l2 不存在时，直接返回 l1
    if (l1 !== null && l2 === null) {
      p.next = l1;
      break;
    } else if (l1 === null && l2 !== null) {
      // 当 l2 存在，l1 不存在时，直接返回 l2
      p.next = l2;
      break;
    } else {
      // l1 和 l2 都存在时，比较值的大小
      if (l1.val <= l2.val) {
        p.next = new ListNode(l1.val);
        l1 = l1.next;
      } else {
        p.next = new ListNode(l2.val);
        l2 = l2.next;
      }
    }
    p = p.next;
  }

  return dummy.next;
};
