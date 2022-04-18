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
var deleteDuplicates = function (head) {
  if (head === null || head.next === null) {
    return head;
  }

  if (head.val !== head.next.val) {
    head.next = deleteDuplicates(head.next);
  } else {
    // 如果2个节点相同，就先把相同的节点全部移除
    let temp = head.next;
    while (temp !== null && head.val === temp.val) {
      temp = temp.next;
    }
    // 找到不重复的为止
    return deleteDuplicates(temp);
  }

  return head;
};

// https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/solution/fu-xue-ming-zhu-di-gui-die-dai-yi-pian-t-wy0h/