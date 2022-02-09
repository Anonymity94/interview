// https://leetcode-cn.com/problems/reverse-linked-list/
// 反转链表

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  if (head == null || head.next == null) {
    return head;
  }

  let prev = null;
  while (head != null) {
    const temp = head;
    head = head.next;
    temp.next = prev;
    prev = temp;
  }

  return prev;
};
