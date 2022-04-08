/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  return check(root, root);
};

/**
 * @param {TreeNode} node
 * @param {TreeNode} node
 * @return {boolean}
 */
const check = function (node1, node2) {
  // 2个都是空，自然是对称
  if (node1 === null && node2 === null) {
    return true;
  }
  // 1个有值，1个没值，不对称
  if (node1 === null || node2 === null) {
    return false;
  }
  // 2个都有值并且值相等，对称
  if (node1.val !== node2.val) {
    return false;
  }
  // 判断节点1的左边 === 节点2的右边 && 节点1的右边 === 节点2的左边
  return check(node1.left, node2.right) && check(node1.right, node2.left);
};
