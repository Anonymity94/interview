/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 递归实现
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  // 如果到达最后位置，或者是倒数第一个，那直接返回即可
  if (head == null || head.next === null) {
    return head;
  }

  // 现状：head -> next -> swapPairs(head.next.next)
  // 目标：next -> head -> swapPairs(head.next.next)

  // 递归实现
  const next = head.next;
  head.next = swapPairs(next.next);
  next.next = head;

  return next;
};

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 迭代遍历实现
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  // 虚拟头
  const dummy = new ListNode(-1, head);
  let curNode = dummy;

  while (curNode.next !== null && curNode.next.next !== null) {
    // 当前节点的下一个节点
    let node1 = curNode.next;
    // 当前节点的下两个节点
    let node2 = curNode.next.next;
    // d -> 1 -> 3 -> 4
    // d -> 1 -> 2
    node1.next = node2.next;
    // d -> 1 -> 3 -> 4
    // d -> 1 <- 2
    node2.next = node1;
    // d -> 2 -> 1 -> 3 -> 4
    curNode.next = node2;

    // 更新下一个开始
    curNode = node1;
  }

  return dummy.next;
};
