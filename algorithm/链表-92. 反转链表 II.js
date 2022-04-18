/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  // 虚拟头部
  let dummy = new ListNode(-1, head);
  // 先遍历找到 left 之前的节点
  let prev = dummy;
  for (let i = 0; i < left - 1; i++) {
    prev = prev.next;
  }

  let cur = prev.next;
  for (let i = 0; i < right - left; i++) {
    let next = cur.next;

    // 穿针引线
    cur.next = next.next;
    next.next = prev.next;
    prev.next = next;
  }

  return dummy.next;
};

// https://leetcode-cn.com/problems/reverse-linked-list-ii/solution/fan-zhuan-lian-biao-ii-by-leetcode-solut-teyq/