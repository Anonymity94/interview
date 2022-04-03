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
 *
 * @description 双指针写法
 */
var reverseList = function (head) {
  // 时间复杂度 O(n), n 是单链表的长度
  // 空间复杂度 O(1)
  if (head == null || head.next == null) {
    return head;
  }

  let prev = null;
  let curr = head;
  while (curr != null) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
};

// 递归写法
var reverseList2 = function (head) {
  if (head == null || head.next == null) {
    return head;
  }

  const newHead = reverseList(head.next);
  // 1->2->3->4->5->NULL
  // 最深度的一个是
  // head = 4
  // 4.next.next === 5.next = 4
  // 1->2->3->4<->5->NULL
  head.next.next = head;
  // 1->2->3->4<-5->NULL
  head.next = null;

  return newHead;
};
