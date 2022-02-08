// https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
 var removeNthFromEnd = function (head, n) {
  const dummyHead = new ListNode(0, head);

  let fast = dummyHead;
  let slow = dummyHead;
  // 先走 n 步
  while (n-- > 0) {
    fast = fast.next
  }

  while (fast.next != null) {
    slow = slow.next;
    fast = fast.next;
  }

  slow.next = slow.next.next

  return dummyHead.next
};