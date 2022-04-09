/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
  const dummy = new ListNode(0, head);
  // 慢指针
  let slow = dummy;
  // 快指针，指向当前判断的节点
  let fast = head;

  while (fast !== null) {
    if (fast.val === val) {
      // 删除节点
      slow.next = fast.next;
    } else {
      // 如果不同，慢指针前进一步
      slow = slow.next;
    }
    fast = fast.next;
  }

  return dummy.next;
};
