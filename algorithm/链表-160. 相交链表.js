/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  // 指向 A 链表头部
  let p1 = headA;
  // 指向 B 链表头部
  let p2 = headB;

  while (p1 !== p2) {
    // A 走完了走 B
    if (p1 === null) {
      p1 = headB;
    } else {
      p1 = p1.next;
    }

    // B 走完了走 A
    if (p2 === null) {
      p2 = headA;
    } else {
      p2 = p2.next;
    }
  }

  // 每个指针最多走 A+B 的长度
  // 存在相交节点时，p1 = p2 = 相交节点
  // 不存在相交节点时，p1 = p2 = null

  return p1;
};
