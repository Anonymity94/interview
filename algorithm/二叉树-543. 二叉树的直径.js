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
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
  let res = 0;
  /**
   * @param {TreeNode} root
   * @return {number}
   */
  var maxDepth = function (node) {
    if (node == null) {
      return 0;
    }
    let leftMax = maxDepth(node.left);
    let rightMax = maxDepth(node.right);
    // 计算最大直径
    res = Math.max(res, leftMax + rightMax);
    return 1 + Math.max(leftMax, rightMax);
  };
  maxDepth(root);
  return res;
};

// https://labuladong.github.io/algo/2/19/33/