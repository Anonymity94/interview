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
var middleNode = function (head) {
  let slow = (fast = head);

  while (fast !== null && fast.next !== null) {
    // 慢指针每次前进1步
    slow = slow.next;
    // 快指针每次前进2步
    fast = fast.next.next;
  }

  return slow;
};
