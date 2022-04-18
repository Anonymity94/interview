/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  if (head === null) {
    return null;
  }

  // 区间 [a, b) 包含 k 个待反转元素
  let a = head;
  let b = head;
  for (let i = 0; i < k; i++) {
    // 如果在还没遍历到第 k 个，end 空了，即 head 链表个数不满足 k 个，直接返回原链表
    // 不足 k 个不需要反转
    if (b === null) {
      return head;
    }
    // 如果不足 k 个也需要反转呢
    // if (b === null) {
    //   return reverse(a, b)
    // }
    b = b.next;
  }

  // 反转前 k 个
  const newHead = reverse(a, b);
  a.next = reverseKGroup(b, k);
  return newHead;
};

/**
 * @param {ListNode} a
 * @param {ListNode} b
 * @return {ListNode}
 */
var reverse = function (a, b) {
  let prev, cur, next;
  prev = null;
  cur = a;
  next = a;

  while (cur !== b) {
    next = cur.next;
    cur.next = prev;
    // 更新指针位置
    prev = cur;
    cur = next;
  }

  return prev;
};


// https://leetcode-cn.com/problems/reverse-nodes-in-k-group/solution/by-smooth-b-cbx7/
// https://mp.weixin.qq.com/s/A-dQ9spsP_Iu1Y4iCRP9nA