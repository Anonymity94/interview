/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
  // 查找中点
  const mid = middleNode(head);
  const next = mid.next;
  mid.next = null;
  // 反转中点以后的链表
  let head2 = reverseList(next);

  let next1, next2;
  // 合并2个链表
  while (head !== null && head2 !== null) {
    next1 = head.next;
    next2 = head2.next;

    head.next = head2;
    head = next1;

    head2.next = next1;
    head2 = next2;
  }
};

/**
 * 查找链表的中点
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function (head) {
  let slow = (fast = head);

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
};

/**
 * 反转链表
 * @param {ListNode} head
 * @return {ListNode} newHead
 */
var reverseList = function (head) {
  if (head == null || head.next == null) {
    return head;
  }

  let cur = null;
  let prev = head;
  while (prev !== null) {
    let temp = prev.next;
    prev.next = cur;

    cur = prev;
    prev = temp;
  }

  return cur;
};

// https://leetcode-cn.com/problems/reorder-list/solution/dong-hua-yan-shi-kuai-man-zhi-zhen-143-z-4kmk/
